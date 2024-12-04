import { v4 as uuidv4 } from 'uuid';
import WeatherData from "../model/WeatherData.js";

export async function prompt(req, res) {
    const { consulta } = req.body;
    try {
        // Llamamos a la función obtener para obtener los datos del clima
        const obtenerDatos = await obtener();
        console.log('Datos obtenidos para la consulta:', obtenerDatos); // Log adicional para verificar los datos obtenidos

        // Hacemos la petición a la API de generación (ejemplo: GPT-3 o similar)
        const peticion = await fetch('http://127.0.0.1:11434/api/generate', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                model: "cm-model",
                prompt: "Estos son los datos del clima de hoy: " + obtenerDatos + " esta es la consulta del usuario: " + consulta,
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
        console.error('Error al realizar la petición:', error);
        return res.status(500).json({
            status: 500,
            message: "Error interno del servidor!"
        });
    }
}

// Función para obtener y guardar los datos de clima en la base de datos
export async function obtenerYGuardarDatosClima(req, res) {
    const today = new Date().toISOString().split('T')[0];

    // Verificamos si ya existen los datos de hoy
    const existingData = await WeatherData.find({ date: today });

    if (existingData.length > 0) {
        console.log('Los datos de clima de hoy ya están en la base de datos');
        return res.json(existingData);
    }

    try {
        // Llamadas paralelas a ambas APIs
        console.log('Realizando las llamadas a las APIs...');
        const [api1Response, api2Response] = await Promise.all([
            fetch('https://ramf.formosa.gob.ar/api/station'),
            fetch('https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/formosa%20argentina?unitGroup=metric&key=UMQ9KWF37S9T6WL8J4WLN5Q23&contentType=json')
        ]);

        const [api1Data, api2Data] = await Promise.all([
            api1Response.json(),
            api2Response.json()
        ]);

        // Verificar que los datos de ambas APIs llegaron correctamente
        console.log('Datos de la API 1 (ramf):', api1Data);
        console.log('Datos de la API 2 (Visual Crossing):', api2Data);

        // Procesamos los datos de la API 1
        const datosApi1 = api1Data.map((dato) => ({
            station_id: uuidv4(),
            date: today,
            data: {
                timestamp: dato.dates?.max_date || null,
                temperature: dato.meta?.airTemp || null,
                humidity: dato.meta?.rh || null,
                rain1h: dato.meta?.rain1h || null,
                rain24h: typeof dato.meta?.rain24h === 'object' ? dato.meta.rain24h.sum : dato.meta?.rain24h || null,
                windSpeed: dato.meta?.windSpeed || null,
                location: {
                    latitude: dato.position?.geo?.coordinates[1] || null,
                    longitude: dato.position?.geo?.coordinates[0] || null,
                },
                warnings: dato.warnings || [],
            },
        }));

        // Procesamos los datos de la API 2 (Visual Crossing)
        const currentConditions = api2Data.currentConditions;
        const datosApi2 = {
            station_id: uuidv4(),
            date: today,
            data: {
                timestamp: currentConditions.datetime || null,
                temperature: currentConditions.temp || null,
                feelslike: currentConditions.feelslike || null,
                humidity: currentConditions.humidity || null,
                dewPoint: currentConditions.dew || null,
                precipitation: currentConditions.precip || null,
                windSpeed: currentConditions.windspeed || null,
                windDirection: currentConditions.winddir || null,
                pressure: currentConditions.pressure || null,
                visibility: currentConditions.visibility || null,
                cloudCover: currentConditions.cloudcover || null,
                solarRadiation: currentConditions.solarradiation || null,
                uvIndex: currentConditions.uvindex || null,
                sunrise: api2Data.days[0]?.sunrise || null,
                sunset: api2Data.days[0]?.sunset || null,
                conditions: currentConditions.conditions || null,
                icon: currentConditions.icon || null,
            },
        };

        // Calculamos el promedio de los datos de ambas APIs
        const averagedData = {
            date: today,
            data: {
                temperature: (datosApi1[0].data.temperature + datosApi2.data.temperature) / 2,
                humidity: (datosApi1[0].data.humidity + datosApi2.data.humidity) / 2,
                rain1h: (datosApi1[0].data.rain1h + datosApi2.data.precipitation) / 2,
                rain24h: (datosApi1[0].data.rain24h + datosApi2.data.precipitation) / 2,
                windSpeed: (datosApi1[0].data.windSpeed + datosApi2.data.windSpeed) / 2,
                windDirection: (datosApi1[0].data.windDirection + datosApi2.data.windDirection) / 2,
            },
        };

        // Guardamos los datos promediados en la base de datos
        const savedData = await WeatherData.insertMany([averagedData]);
        console.log('Datos de clima promediados guardados en la base de datos');
        return res.json(savedData);

    } catch (error) {
        console.error('Error al obtener o guardar los datos de clima:', error);
        return res.status(500).send('Hubo un error al obtener o guardar los datos de clima');
    }
}

export async function obtener() {
    const today = new Date().toISOString().split('T')[0];

    // Verificamos si ya existen los datos de hoy
    const existingData = await WeatherData.find({ date: today });

    if (existingData.length > 0) {
        console.log('Los datos de clima de hoy ya están en la base de datos');

        // Retornamos los datos en formato texto resumido
        const summary = existingData.map((dato) => ({
            date: dato.date,
            temperature: dato.data.temperature,
            humidity: dato.data.humidity,
            rain1h: dato.data.rain1h,
            rain24h: dato.data.rain24h,
            windSpeed: dato.data.windSpeed,
        }));
        console.log('Resumen de datos de clima de hoy:', summary);
        return JSON.stringify(summary);
    } else {
        console.log('No se encontraron datos de clima de hoy. Realizando el fetch...');

        try {
            // Llamadas paralelas a ambas APIs
            const [api1Response, api2Response] = await Promise.all([
                fetch('https://ramf.formosa.gob.ar/api/station'),
                fetch('https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/formosa%20argentina?unitGroup=metric&key=UMQ9KWF37S9T6WL8J4WLN5Q23&contentType=json')
            ]);

            const [api1Data, api2Data] = await Promise.all([
                api1Response.json(),
                api2Response.json()
            ]);

            console.log('Datos de la API 1 (ramf):', api1Data);
            console.log('Datos de la API 2 (Visual Crossing):', api2Data);

            const datosApi1 = api1Data.map((dato) => ({
                station_id: uuidv4(),
                date: today,
                data: {
                    timestamp: dato.dates?.max_date || null,
                    temperature: dato.meta?.airTemp || null,
                    humidity: dato.meta?.rh || null,
                    rain1h: dato.meta?.rain1h || null,
                    rain24h: typeof dato.meta?.rain24h === 'object' ? dato.meta.rain24h.sum : dato.meta?.rain24h || null,
                    windSpeed: dato.meta?.windSpeed || null,
                    location: {
                        latitude: dato.position?.geo?.coordinates[1] || null,
                        longitude: dato.position?.geo?.coordinates[0] || null,
                    },
                    warnings: dato.warnings || [],
                },
            }));

            const currentConditions = api2Data.currentConditions;
            const datosApi2 = {
                station_id: uuidv4(),
                date: today,
                data: {
                    timestamp: currentConditions.datetime || null,
                    temperature: currentConditions.temp || null,
                    feelslike: currentConditions.feelslike || null,
                    humidity: currentConditions.humidity || null,
                    dewPoint: currentConditions.dew || null,
                    precipitation: currentConditions.precip || null,
                    windSpeed: currentConditions.windspeed || null,
                    windDirection: currentConditions.winddir || null,
                    pressure: currentConditions.pressure || null,
                    visibility: currentConditions.visibility || null,
                    cloudCover: currentConditions.cloudcover || null,
                    solarRadiation: currentConditions.solarradiation || null,
                    uvIndex: currentConditions.uvindex || null,
                    sunrise: api2Data.days[0]?.sunrise || null,
                    sunset: api2Data.days[0]?.sunset || null,
                    conditions: currentConditions.conditions || null,
                    icon: currentConditions.icon || null,
                },
            };

            return JSON.stringify(datosApi2);

        } catch (error) {
            console.error('Error al realizar el fetch de los datos del clima:', error);
            return 'No se pudieron obtener datos del clima';
        }
    }
}
