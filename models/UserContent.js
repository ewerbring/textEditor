const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const userContentSchema = new Schema({
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

const UserContent = mongoose.model('UserContent', userContentSchema);
module.exports = UserContent;
