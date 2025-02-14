import { ACCEPTED_IMAGE_TYPES, MAX_UPLOAD_SIZE } from '@/validations/custom.validation'
import multer from 'multer'

const customFileFilter = (req, file, cb) => {
  // check file type
  if (!ACCEPTED_IMAGE_TYPES.includes(file.mimetype)) {
    cb('Only .jpg, .jpeg, and .png images are accepted.', null)
  }
  // accept a file
  return cb(null, true)
}

// configure multer
const upload = multer({
  limits: { fileSize: MAX_UPLOAD_SIZE }, // 10 MB
  fileFilter: customFileFilter
})

module.exports.multerUploadMiddleware = {
  upload
}