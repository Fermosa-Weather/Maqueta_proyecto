// models/Cuenta.js
import mongoose from 'mongoose';

const CuentaSchema = new mongoose.Schema({
  nombre_cuenta: {
    type: String,
    required: false,
    trim: true,
  },
  // Asociación no requerida con usuarios
  usuarios: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
});

const Cuenta = mongoose.model('Cuenta', CuentaSchema);
export default Cuenta;