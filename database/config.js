const mongoose = require('mongoose');

const dbConnection = async () => {
  try {
    mongoose.connect(process.env.DB_CNN);
    console.log('DB Online');
  } catch (e) {
    console.log(e);
    throw new Error('Error a la hora de inicializar base de datos.');
  }
};

module.exports = {
  dbConnection,
};
