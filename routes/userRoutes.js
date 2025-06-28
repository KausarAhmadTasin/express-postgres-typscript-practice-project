const express = require("express");
const {
  createUser,
  getAllUsers,
  updateUser,
} = require("../controllers/userController");
const router = express.Router();

router.post("/", createUser);
router.get("/", getAllUsers);
router.put("/:id", updateUser);

module.exports = router;
