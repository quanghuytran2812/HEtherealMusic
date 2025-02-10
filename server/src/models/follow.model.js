const mongoose = require('mongoose')

const followSchema = new mongoose.Schema({
  following_user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  followed_user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true } // createdAt, updatedAt
)

module.exports = mongoose.model('Follow', followSchema)