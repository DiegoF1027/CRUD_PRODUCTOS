// database/db.js
require('dotenv').config();
const mongoose = require('mongoose');

// Función encargada de conectar a MongoDB Atlas
const connect = async () => {
  try {
    const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_CLUSTER}.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority&appName=Cluster1`;
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Conexión a MongoDB Atlas exitosa');
  } catch (error) {
    console.error('Error de conexión a MongoDB:', error);
  }
};

module.exports = { connect };
