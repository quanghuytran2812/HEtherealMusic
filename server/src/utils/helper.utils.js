const pickKeysFromObject = (obj, keys) => {
  return keys.reduce((acc, key) => {
    if (key in obj) {
      acc[key] = obj[key]
    }
    return acc
  }, {})
}

const pickKeysFromUser = (user) => {
  return pickKeysFromObject(user, ['_id', 'name', 'type', 'imageUrl'])
}

module.exports = { pickKeysFromUser }