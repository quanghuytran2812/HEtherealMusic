const { enumData } = require('@/utils/constants.utils')
const Joi = require('joi')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const { messages, validateDob, passwordModelRegex } = require('@/validations/custom.validation')

const userSchema = mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true },
    verified_email: { type: Boolean, default: false },
    verifyToken: String,
    password: String,
    dob: Date,
    imageUrl: [String],
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
  email: Joi.string().trim().required().email().messages({
    'string.empty': messages.email.required,
    'string.email': messages.email.invalid
  }),
  password: Joi.string().trim().required().min(10).regex(passwordModelRegex).optional().messages({
    'string.empty': messages.password.required,
    'string.pattern.base': messages.password.base,
    'string.min': messages.password.min
  }),
  name: Joi.string().trim().required().min(3).max(30).messages({
    'string.empty': messages.name.required,
    'string.min': messages.name.min,
    'string.max': messages.name.max
  }),
  dob: Joi.string().trim().required().custom(validateDob).messages({
    'string.empty': messages.dob.required,
    'any.custom': messages.dob.type,
    'any.invalid': messages.dob.invalid
  }),
  gender: Joi.string().trim().required().valid(...Object.values(enumData.gender)).messages({
    'string.empty': messages.gender.required,
    'any.only': messages.gender.invalid
  }),
  imageUrl: Joi.array().items(Joi.string())
    .min(1)
    .optional()
    .messages({
      'array.min': messages.imageUrl.required
    }),
  verified_email: Joi.boolean().optional().messages({
    'boolean.base': messages.verified_email.invalid,
    'any.only': messages.verified_email.notBoolean
  }),
  verifyToken: Joi.string().optional().allow('').messages({
    'string.base': messages.verifyToken.invalid,
    'string.empty': messages.verifyToken.empty
  })
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

const checkUsersExist = async (data) => {
  try {
    const users = await User.find({ _id: { $in: data } })
    return users
  } catch (error) {
    throw new Error(error)
  }
}

const updateUser = async (id, data) => {
  try {
    // Remove fields that are not permitted to be modified.
    Object.keys(data).forEach((fieldName) => {
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
  updateUser,
  checkUsersExist
}