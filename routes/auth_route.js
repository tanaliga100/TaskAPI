const express = require("express");
const { login } = require("../controllers/auth-controller");
const router = express.Router();

router.route("/login").post(login);

module.exports = router;
