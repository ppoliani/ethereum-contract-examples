const HttpError = (status, message) => ({status, message: { error: message }});

module.exports = {HttpError};
