const pickKeysFromObject = (obj, keys) => {
  return keys.reduce((acc, key) => {
    if (key in obj) {
      acc[key] = obj[key]
    }
    return acc
  }, {})
}

const pickKeysFromUser = (user) => {
  return pickKeysFromObject(user, ['name', 'email', 'dob', 'imageUrl', 'genres', 'popularity', 'gender', 'type'])
}

module.exports = { pickKeysFromUser }