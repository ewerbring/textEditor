const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const transformerTextSchema = new Schema({
  paragraphWidth: String,
  fontSize: String,
  content: String,
  projectName: String,
  userId: String
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const TransformerText = mongoose.model('TransformerText', transformerTextSchema);
module.exports = TransformerText;
