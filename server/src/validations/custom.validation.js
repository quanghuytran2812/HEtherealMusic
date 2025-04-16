const { enumData } = require('@/utils/constants.utils')
const moment = require('moment')

const MAX_MB = 10
const MAX_UPLOAD_SIZE = 1024 * 1024 * MAX_MB
const ACCEPTED_IMAGE_TYPES = ['image/jpg', 'image/png', 'image/jpeg']
const ACCEPTED_AUDIO_TYPES = ['audio/mpeg', 'audio/wav', 'audio/ogg']
const passwordModelRegex =
  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{10,}$/
const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9#?!&])(?!.*\s).{10,}$/

const messages = {
  email: {
    required: 'Email is required.',
    invalid: 'Email must be a valid email address.'
  },
  password: {
    required: 'Password is required.',
    base: 'Password must contain at least one lowercase letter or uppercase letter, one number or one special character.',
    min: 'Password must be at least 10 characters long.'
  },
  name: {
    required: 'Name is required.',
    min: 'Name must be at least 3 characters long.',
    max: 'Name must not exceed 30 characters.'
  },
  dob: {
    required: 'Date of Birth is required.',
    type: 'Date of Birth must be in the format YYYY-MM-DD.',
    invalid: 'User must be between 18 and 100 years old.'
  },
  gender: {
    required: 'Gender is required.',
    invalid:
      'Gender must be one of the following: ' + enumData.gender.join(', ')
  },
  imageUrl: {
    required: 'At least one image URL is required.'
  },
  verified_email: {
    invalid: 'Verified email must be a boolean value.',
    notBoolean: 'Verified email must be either true or false.'
  },
  verifyToken: {
    invalid: 'Verify token must be a string.',
    empty: 'Verify token cannot be empty.'
  },
  typeLogin: {
    required: 'Type login is required.',
    invalid: 'Type login must be one of the following: ' + enumData.loginType.join(', ')
  },
  token: {
    required: 'Token is required.',
    invalid: 'Token must be a valid string.'
  }
}

const messageGenre = {
  parent_id: {
    required: 'Parent ID is required.'
  },
  genre_name: {
    required: 'Genre name is required.',
    min: 'Genre name must be at least 3 characters long.'
  },
  image_url: {
    required: 'Image URL is required.'
  }
}

const messageAlbum = {
  title: {
    required: 'Title is required.',
    min: 'Title must be at least 3 characters long.'
  },
  image_url: {
    required: 'Image URL is required.'
  },
  type: {
    required: 'Type Album is required.',
    valid: 'Type Album must be one of the following: ' + enumData.albumType.join(', ')
  },
  genres: {
    required: 'At least one genre is required.'
  },
  artists: {
    required: 'At least one artist is required.'
  },
  songs: {
    required: 'At least one song is required.'
  }
}

const messagePlaylist = {
  title: {
    required: 'Title is required.',
    min: 'Title must be at least 3 characters long.'
  },
  description: {
    required: 'Description is required.',
    min: 'Description must be at least 3 characters long.'
  },
  image_url: {
    required: 'Image URL is required.'
  },
  saves: {
    base: 'Saves must be a number.',
    integer: 'Saves must be an integer.',
    min: 'Saves cannot be negative.'
  },
  genres: {
    required: 'At least one genre is required.'
  },
  users: {
    required: 'Users is required.'
  },
  songs: {
    required: 'At least one song is required.'
  },
  type: {
    required: 'Type Playlist is required.',
    valid: 'Type Playlist must be one of the following: ' + enumData.playlistType.join(', ')
  },
  isPublic: {
    base: 'isPublic must be a boolean'
  }
}

const messageSong = {
  title: {
    required: 'Title is required.',
    min: 'Title must be at least 3 characters long.'
  },
  image_url: {
    required: 'Image URL is required.'
  },
  audio_url: {
    required: 'Audio URL is required.'
  },
  duration: {
    required: 'Duration is required.',
    base: 'Duration must be a number.',
    integer: 'Duration must be an integer.',
    min: 'Duration must be at least 0.'
  },
  type: {
    required: 'Type Song is required.',
    valid: 'Type Song must be one of the following: ' + enumData.songType.join(', ')
  },
  artists: {
    required: 'At least one artist is required.'
  },
  albums: {
    required: 'Album is required.'
  }
}

const messagePlayer = {
  items: {
    base: 'Items must be an array.',
    required: 'Items is required.'
  },
  track: {
    required: 'Track is required.',
    pattern: 'Track must be a valid ObjectId'
  },
  type: {
    required: 'Player Type is required.',
    invalid:
      'Player Type must be one of the following: ' + enumData.playerType.join(', ')
  },
  user: {
    required: 'User is required.',
    pattern: 'User must be a valid ObjectId'
  }
}

const messageLibrary = {
  items: {
    base: 'Items must be an array.',
    required: 'Items is required.'
  },
  track: {
    required: 'Track is required.',
    pattern: 'Track must be a valid ObjectId'
  },
  type: {
    required: 'Library Type is required.',
    invalid:
      'Library Type must be one of the following: ' + enumData.libraryType.join(', ')
  },
  user: {
    required: 'User is required.',
    pattern: 'User must be a valid ObjectId'
  }
}

const messageFollow = {
  following_user_id: {
    required: 'Following UserId is required.',
    pattern: 'Following UserId must be a valid ObjectId'
  },
  followed_user_id: {
    required: 'Followed UserId is required.',
    pattern: 'Followed UserId must be a valid ObjectId'
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
  validateDob,
  MAX_UPLOAD_SIZE,
  ACCEPTED_IMAGE_TYPES,
  ACCEPTED_AUDIO_TYPES,
  messageAlbum,
  messageGenre,
  messageSong,
  messagePlayer,
  messagePlaylist,
  messageLibrary,
  messageFollow
}
