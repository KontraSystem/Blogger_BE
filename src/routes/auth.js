const express = require("express")
const router = express.Router();
const controller = require("../controllers/auth");

router.get("/user", controller.getUserData)

router.post("/register", controller.register);

router.post("/login", controller.login);

router.put("/reset-password", controller.resetPassword)

router.put("/update-user", controller.updateUser)

module.exports = router;