module.exports = {
  synthesizeMatch
}

function synthesizeMatch (fileType, options) {
  const match = {}

  if (fileType) {
    match.test = fileType
  }
  if (options && options.exclude) {
    match.exclude = options.exclude
  }
  if (options && options.include) {
    match.include = options.include
  }

  return match
}
