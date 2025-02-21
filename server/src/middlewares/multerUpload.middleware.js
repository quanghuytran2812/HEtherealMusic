import { ApiError } from '@/utils/apiError.utils'
import { ACCEPTED_AUDIO_TYPES, ACCEPTED_IMAGE_TYPES, MAX_UPLOAD_SIZE } from '@/validations/custom.validation'
import { StatusCodes } from 'http-status-codes'
import multer from 'multer'

const imageFileFilter = (req, file, cb) => {
  // check file type
  if (!ACCEPTED_IMAGE_TYPES.includes(file.mimetype)) {
    cb(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, 'Only .jpg, .jpeg, and .png images are accepted.'))
  }
  // accept a file
  return cb(null, true)
}

const audioFileFilter = (req, file, cb) => {
  // Check if the file is an accepted audio type
  if (!ACCEPTED_AUDIO_TYPES.includes(file.mimetype)) {
    cb(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, 'Only .mp3, .wav, and .ogg audio files are accepted.'))
  }
  return cb(null, true)
}

// configure multer
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: MAX_UPLOAD_SIZE }, // 10 MB
  fileFilter: (req, file, cb) => {
    if (file.fieldname === 'imageUrl') {
      imageFileFilter(req, file, cb)
    } else if (file.fieldname === 'audioUrl') {
      audioFileFilter(req, file, cb)
    }
  }
})

module.exports.multerUploadMiddleware = {
  upload
}