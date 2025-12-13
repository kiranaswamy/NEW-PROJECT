// const express = require("express");
// const router = express.Router();
// const passwordController = require("../controller/passwordController");

// router.post("/forgotpassword", passwordController.forgotPassword);

// module.exports = router;

const express = require("express");
const router = express.Router();
const passwordController = require("../controller/passwordController");

router.post("/forgot", passwordController.forgotPassword);
router.post("/reset/:token", passwordController.resetPassword);

module.exports = router;
