import mongoose from 'mongoose';

const uniqueValidator = require('mongoose-unique-validator');

// Roles
const roles = {
  values: ['ADMIN', 'USER'],
  message: '{VALUE} no es un rol válido'
}

const Schema = mongoose.Schema;

const userSchema = new Schema({
  nombre:   { type: String, required: [true, 'El nombre es obligatorio'] },
  email: { type: String, unique: true, required: [true, 'El email es obligatorio']},
  password: { type: String, required: [true, 'La contraseña es obligatorio'] },
  date: { type: Date, default: Date.now },
  role: { type: String, default: 'USER', enum: roles },
  activo: { type: Boolean, default: true }
});

// Validator
userSchema.plugin(uniqueValidator, { message: 'Error, esperaba {PATH} único.' });
// Delete password 
userSchema.methods.toJSON = function() {
  const obj = this.toObject();
  delete obj.password;
  return obj;
 }

// Convertir a modelo
const User = mongoose.model('User', userSchema);

export default User;
