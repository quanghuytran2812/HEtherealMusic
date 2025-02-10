const { enumData } = require('@/utils/constants')
const moment = require('moment')

const passwordModelRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{10,}$/
const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9#?!&])(?!.*\s).{10,}$/

const messages = {
  password: {
    required: 'Password is required.',
    base: 'Password must contain at least one lowercase letter or uppercase letter, one number or one special character.',
    min: 'Password must be at least 10 characters long.'
  },
  email: {
    required: 'Email is required.',
    invalid: 'Email must be a valid email address.'
  },
  name: {
    required: 'Name is required.'
  },
  dob: {
    required: 'Date of Birth is required.',
    type: 'Date of Birth must be in the format YYYY-MM-DD.',
    invalid: 'User must be between 18 and 100 years old.'
  },
  gender: {
    required: 'Gender is required.',
    invalid: 'Gender must be one of the following: ' + enumData.gender.join(', ')
  },
  country: {
    required: 'Country is required.'
  }
}

// Custom validation for date of birth
const validateDob = (value, helpers) => {
  // Check if the date is in the correct format (YYYY-MM-DD)
  if (!moment(value, 'YYYY-MM-DD', true).isValid()) {
    return helpers.error('any.custom') // Return an error for wrong format
  }

  const birthDate = moment(value, 'YYYY-MM-DD')
  const age = moment().diff(birthDate, 'years')

  // Check if the age is between 18 and 100
  if (age < 18 || age > 100) {
    return helpers.error('any.invalid')
  }

  return value // Valid date of birth
}

module.exports = {
  passwordRegex,
  passwordModelRegex,
  messages,
  validateDob
}