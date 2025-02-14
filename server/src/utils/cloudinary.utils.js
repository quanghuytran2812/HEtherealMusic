import { v2 as cloudinary } from 'cloudinary'
import streamifier from 'streamifier'

// configure cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

const streamUpload = (fileBuffer, folderName) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream({ folder: folderName }, (error, result) => {
      if (error) return reject(error)
      resolve(result)
    })
    return streamifier.createReadStream(fileBuffer).pipe(stream)
  })
}

module.exports.CloudinaryProvider = { streamUpload }