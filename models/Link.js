const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const linkSchema = new Schema({
  link: String,
  layer: String,
  width: String,
  height: String,
  opacity: String,
  projectName: String,
  userId: String
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Link = mongoose.model('Link', linkSchema);
module.exports = Link;
