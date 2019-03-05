const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name:String,
  description: String,
  created_at:{ type: Date, default: Date.now },
});

module.exports = mongoose.model('Category', schema);
