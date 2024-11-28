import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Ruta al archivo local datos_estaciones.json
const filePath = path.join(path.dirname(fileURLToPath(import.meta.url)), 'datos_estaciones.json');

// Variable para almacenar los datos cargados una sola vez
let cachedWeatherData = null;

// Función para cargar los datos de manera eficiente
async function fetchWeatherData() {
    if (cachedWeatherData) {
        console.log("Usando datos almacenados en caché...");
        return cachedWeatherData;
    }

    return new Promise((resolve, reject) => {
        console.log(`Leyendo archivo desde: ${filePath}`);

        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                reject('Error al leer el archivo: ' + err);
            } else {
                console.log('Archivo leído con éxito');
                cachedWeatherData = JSON.parse(data); // Guardamos los datos en memoria
                resolve(cachedWeatherData);
            }
        });
    });
}

// Función para generar actividad utilizando los datos
async function generarActividad(req, res) {
    const { consulta } = req.body;

    try {
        // Obtener los datos de la estación meteorológica desde el archivo JSON (solo una vez)
        const data = await fetchWeatherData();

        const filteredData = data.map((dato) => ({
            timestamp: dato.dates?.max_date || null, // Fecha de la última actualización
            temperature: dato.meta?.airTemp || null, // Temperatura
            humidity: dato.meta?.rh || null, // Humedad
            solarRadiation: dato.meta?.solarRadiation || null, // Radiación solar
            rain1h: dato.meta?.rain1h || null, // Lluvia en la última hora
            rain24h: dato.meta?.rain24h || null, // Lluvia en las últimas 24 horas
            windSpeed: dato.meta?.windSpeed || null, // Velocidad del viento
            location: {
                latitude: dato.position?.geo?.coordinates[1] || null,
                longitude: dato.position?.geo?.coordinates[0] || null
            }
        }));

        const weatherSummary = filteredData.map((station, index) => {
            return `Estación ${index + 1}:
      - Fecha y hora: ${station.timestamp}
      - Temperatura: ${station.temperature} °C
      - Humedad: ${station.humidity} %
      - Lluvia en las últimas 24 horas: ${station.rain24h ? station.rain24h.sum : 'N/A'} mm
      - Velocidad del viento: ${station.windSpeed} m/s
      - Ubicación (lat, lon): (${station.location.latitude}, ${station.location.longitude})`;
        }).join("\n\n");

        console.log(weatherSummary);

        let consultaCompleta = consulta + " " + "estos son los datos de los cuales deben hacer la predicción: " + weatherSummary;

        const peticion = await fetch('http://127.0.0.1:11434/api/generate', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                model: "cm-model",
                prompt: consultaCompleta,
                num_keep: 1,
            }),
        });

        // Establecer encabezados para indicar que se enviará una respuesta progresiva
        res.setHeader("Content-Type", "text/plain; charset=utf-8");
        res.setHeader("Transfer-Encoding", "chunked");

        let accumulatedJSON = "";
        let activity = "";
        const reader = peticion.body.getReader();
        let decoder = new TextDecoder();
        let chunk = await reader.read();

        while (!chunk.done) {
            const texto = decoder.decode(chunk.value, { stream: true });
            accumulatedJSON += texto;

            let startIndex = 0;
            while (startIndex < accumulatedJSON.length) {
                const startBracketIndex = accumulatedJSON.indexOf("{", startIndex);
                if (startBracketIndex === -1) break;
                const endBracketIndex = accumulatedJSON.indexOf("}", startBracketIndex);
                if (endBracketIndex === -1) break;

                const jsonString = accumulatedJSON.slice(startBracketIndex, endBracketIndex + 1);
                try {
                    const responseObject = JSON.parse(jsonString);
                    const responseValue = responseObject.response;
                    activity += responseValue;

                    res.write(responseValue);
                } catch (error) {
                    // Ignorar errores de análisis JSON parcial
                }
                startIndex = endBracketIndex + 1;
            }

            accumulatedJSON = accumulatedJSON.slice(startIndex);
            chunk = await reader.read();
        }

        res.end();

    } catch (error) {
        console.error("Error en la generación de actividad:", error);
        return res.status(500).json({
            status: 500,
            message: "Error interno del servidor!"
        });
    }
}

// Exportar la función
export default generarActividad;