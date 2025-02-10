const mongoose = require('mongoose')

const genreSchema = new mongoose.Schema({
  parent_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Genre' },
  parent_name: { type: String },
  genre_name: { type: String, required: true }
}, { timestamps: true })

module.exports = mongoose.model('Genre', genreSchema)