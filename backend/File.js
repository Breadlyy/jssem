const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Определение схемы файла
const fileSchema = new Schema({
  filename: { type: String, required: true },
  size: { type: Number, required: true },
  mimeType: { type: String, required: true },
  path: { type: String, required: true }
});

// Создание модели файла на основе схемы
const File = mongoose.model('File', fileSchema);

module.exports = File;