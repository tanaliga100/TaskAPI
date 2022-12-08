const notFound = (req, res) => {
  res.status(404).send("<p>Route does not exist... </p> ");
};
module.exports = notFound;
