const express = require("express");

const router = express.Router();

const { getAllCraft, createCraft, deleteCraft,getAllCategories,getCraftsByCategory} = require("../controller/craft");
const {requireAuth} = require('../middlewares/isAdmin');

router.get("/", requireAuth,getAllCraft);
router.post("/", requireAuth,createCraft);
router.delete("/:id", requireAuth,deleteCraft);
router.get('/categories',requireAuth, getAllCategories);
router.get('/category/:category',requireAuth, getCraftsByCategory);

module.exports = router;