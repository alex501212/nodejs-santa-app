const express = require("express");
const userCtrl = require("../controllers/user-ctrl");
const router = express.Router();

router.post("/submit/", userCtrl.submitForm);

module.exports = router;
