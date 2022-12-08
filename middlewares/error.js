const { CustomAPIError } = require("../class/error");
const error = (err, req, res, next) => {
  if (err instanceof CustomAPIError) {
    return res.status(err.statusCode).json({ msg: err.message });
  }
  return res
    .status(500)
    .json({ msg: "Something went wrong.. please try again" });
};
module.exports = error;
