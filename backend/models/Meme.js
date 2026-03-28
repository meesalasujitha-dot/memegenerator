const mongoose = require('mongoose');

const memeSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  imageUrl: { type: String, required: true },
  topText: { type: String, default: '' },
  bottomText: { type: String, default: '' }
}, {
  timestamps: true
});

module.exports = mongoose.model('Meme', memeSchema);
