module.exports = function(res, errNumber, msg) {
  return res.status(errNumber).json(msg);
};
