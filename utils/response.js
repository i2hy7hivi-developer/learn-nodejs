exports.successResponse = (res, status = 200, message = '', data = {}) => {
  return res.status(status).json({
    success: true,
    status,
    message,
    data
  });
};

exports.errorResponse = (res, status = 400, message = '', data = {}, details = {}) => {
  return res.status(status).json({
    success: false,
    status,
    message,
    data,
    details
  });
};