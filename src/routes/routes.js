const express = require("express");
const app = express();
const router = express.Router();
const UserController = require("../controllers/UserController");
const AdminAuth = require("../middleware/AdminAtuh");


router.post("/signin",UserController.Create);
router.post("/login",UserController.login);
router.get("/users",AdminAuth,UserController.list);
router.put("/users",AdminAuth,UserController.updateUser);
router.delete("/users",AdminAuth,UserController.deleteUser);
router.post("/recover",UserController.recoverPassword);
router.post("/changePass",UserController.alterPassword);

module.exports = router;
