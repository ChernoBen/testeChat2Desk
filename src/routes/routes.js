const express = require("express");
const app = express();
const router = express.Router();
const UserController = require("../controllers/UserController");

router.post("/signin",UserController.Create);
router.post("/login",UserController.login);

module.exports = router;
