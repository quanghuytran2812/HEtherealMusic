const { enumData } = require('@/utils/constants')
const Joi = require('joi')
const mongoose = require('mongoose')
const { customValidation } = require('@/validations')
const bcrypt = require('bcryptjs')

const userSchema = mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true },
    verified_email: { type: Boolean, default: false },
    verifyToken: String,
    password: String,
    dob: Date,
    imageUrl: String,
    genres: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Genre' }],
    popularity: { type: Number, default: 0 },
    gender: { type: String, enum: enumData.gender },
    type: {
      type: String,
      enum: enumData.userType,
      default: enumData.userType[0]
    },
    isDeleted: { type: Boolean, default: false }
  },
  { timestamps: true, versionKey: false } // createdAt, updatedAt
)

const schema = Joi.object({
  email: Joi.string().required().trim().email().messages({
    'string.empty': customValidation.messages.email.required,
    'string.email': customValidation.messages.email.invalid
  }),
  password: Joi.string()
    .required()
    .trim()
    .min(10)
    .regex(customValidation.passwordModelRegex)
    .optional()
    .messages({
      'string.empty': customValidation.messages.password.required,
      'string.pattern.base': customValidation.messages.password.base,
      'string.min': customValidation.messages.password.min
    }),
  name: Joi.string().required().trim().messages({
    'string.empty': customValidation.messages.name.required
  }),
  dob: Joi.string()
    .required()
    .trim()
    .custom(customValidation.validateDob)
    .messages({
      'string.empty': customValidation.messages.dob.required,
      'any.custom': customValidation.messages.dob.type,
      'any.invalid': customValidation.messages.dob.invalid
    }),
  gender: Joi.string()
    .required()
    .valid(...Object.values(enumData.gender))
    .trim()
    .messages({
      'string.empty': customValidation.messages.gender.required,
      'any.only': customValidation.messages.gender.invalid
    }),
  imageUrl: Joi.string().optional().trim(),
  verified_email: Joi.boolean().optional(),
  verifyToken: Joi.string().optional()
})
// Indicates which Fields we do not allow to be updated in the updateUser()
const INVALID_UPDATE_FIELD = ['_id', 'email', 'createdAt']

const User = mongoose.model('User', userSchema)

const validateBeforeSave = async (data) => {
  return await schema.validateAsync(data, { abortEarly: false })
}

const createNewUser = async (data) => {
  try {
    const validData = await validateBeforeSave(data)
    const createdUser = await User.create(validData)
    return createdUser
  } catch (error) {
    throw new Error(error)
  }
}

const checkUserFromEmail = async (email) => {
  try {
    const user = await User.findOne({ email })
    return user
  } catch (error) {
    throw new Error(error)
  }
}

const comparePassword = async (inputPassword, storedPassword) => {
  try {
    return await bcrypt.compare(inputPassword, storedPassword)
  } catch (error) {
    throw new Error('Wrong passwords', error)
  }
}

const findUserById = async (id) => {
  try {
    const user = await User.findById(id)
    return user
  } catch (error) {
    throw new Error(error)
  }
}

const updateUser = async (id, data) => {
  try {
    // Remove fields that are not permitted to be modified.
    Object.keys(data).forEach(fieldName => {
      if (INVALID_UPDATE_FIELD.includes(fieldName)) {
        delete data[fieldName]
      }
    })

    const result = await User.findByIdAndUpdate(
      { _id: id },
      { $set: data },
      { returnDocument: 'after' } // Return result after update
    )

    return result
  } catch (error) {
    throw new Error(error)
  }
}

module.exports = {
  createNewUser,
  checkUserFromEmail,
  comparePassword,
  findUserById,
  updateUser
}
