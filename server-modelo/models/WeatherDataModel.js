import mongoose from 'mongoose';

const weatherDataSchema = new mongoose.Schema({
  station_id: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  data: {
    timestamp: {
      type: Date,
      default: Date.now,
    },
    temperature: {
      type: Number,
      default: null,
    },
    humidity: {
      type: Number,
      default: null,
    },
    rain1h: {
      type: Number,
      default: null,
    },
    rain24h: {
      type: Number,
      default: null,
    },
    rainCurrentDay: {
      type: Number,
      default: null,
    },
    windSpeed: {
      type: Number,
      default: null,
    },
    battery: {
      type: Number,
      default: null,
    },
    solarPanel: {
      type: Number,
      default: null,
    },
    location: {
      latitude: {
        type: Number,
        default: null,
      },
      longitude: {
        type: Number,
        default: null,
      },
    },
    warnings: {
      type: [String],
      default: [],
    },
    sensors: {
      type: [String],
      default: [],
    },
    sms_numbers: {
      type: [String],
      default: [],
    },
    licenses: {
      type: Boolean,
      default: true,
    },
  },
});

const WeatherData = mongoose.model('WeatherData', weatherDataSchema);

export default WeatherData;
