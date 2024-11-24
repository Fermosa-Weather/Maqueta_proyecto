let cache = null;
let lastFetchTime = 0;
const CACHE_DURATION = 300000; // 5 minutos en milisegundos

async function fetchWeatherData() {
    const now = Date.now();
    if (cache && now - lastFetchTime < CACHE_DURATION) {
        return cache; // Retorna los datos en caché si no han expirado
    }

    // Realiza la solicitud a la API externa solo si los datos en caché han expirado
    const response = await fetch('https://ramf.formosa.gob.ar/api/station');
    const data = await response.json();

    // Guarda los datos en caché y actualiza el tiempo de la última consulta
    cache = data;
    lastFetchTime = now;
    return data;
}

async function generarActividad(req, res) {
    const { consulta } = req.body;

    try {
        // Obtiene los datos de la API o desde el caché si no han expirado
        const data = await fetchWeatherData();

        const filteredData = data.map((dato) => ({
            timestamp: dato.dates?.max_date || null, // Tiempo de la última actualización
            temperature: dato.meta?.airTemp || null, // Temperatura
            humidity: dato.meta?.rh || null, // Humedad relativa
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

        // Configura los encabezados para una respuesta progresiva
        res.setHeader("Content-Type", "text/plain; charset=utf-8");
        res.setHeader("Transfer-Encoding", "chunked");

        let accumulatedJSON = "";
        const reader = peticion.body.getReader();
        const decoder = new TextDecoder();

        while (true) {
            const { value, done } = await reader.read();
            if (done) break;

            const texto = decoder.decode(value, { stream: true });
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

                    // Envía la respuesta progresiva
                    res.write(responseValue);
                } catch (error) {
                    console.error("Error al procesar JSON parcial:", error);
                    break; // Si el JSON está incompleto, rompe el bucle interno
                }

                startIndex = endBracketIndex + 1;
            }

            // Retén los datos no procesados
            accumulatedJSON = accumulatedJSON.slice(startIndex);
        }

        res.end();

    } catch (error) {
        console.error("Error en generarActividad:", error);
        res.status(500).json({
            status: 500,
            message: "Error interno del servidor",
        });
    }
}

// Exportar la función por defecto
export default generarActividad;
