const express = require("express");
const router = express.Router();

const { signup, login, logout,getCurrentUser} = require('../controller/auth.js');
const { requireAuth } = require("../middlewares/isAdmin.js");

router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);
router.get('/current', requireAuth, getCurrentUser);
module.exports = router;