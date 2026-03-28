const Meme = require('../models/Meme');

const getMemes = async (req, res) => {
  try {
    const memes = await Meme.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(memes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const saveMeme = async (req, res) => {
  try {
    const { imageUrl, topText, bottomText } = req.body;
    
    if (!imageUrl) {
      return res.status(400).json({ message: 'Image URL is required' });
    }

    const meme = new Meme({
      user: req.user._id,
      imageUrl,
      topText,
      bottomText
    });

    const createdMeme = await meme.save();
    res.status(201).json(createdMeme);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteMeme = async (req, res) => {
  try {
    const meme = await Meme.findById(req.params.id);

    if (!meme) {
      return res.status(404).json({ message: 'Meme not found' });
    }

    if (meme.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'User not authorized' });
    }

    await meme.deleteOne();
    res.json({ message: 'Meme removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getMemes, saveMeme, deleteMeme };
