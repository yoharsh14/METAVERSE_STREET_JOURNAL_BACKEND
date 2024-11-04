const express = require("express");
const router = express.Router();
const protectRoute = require("../middleware/protectRoute");
const {
  getAllArticles,
  getFullArticleById,
  getByCategory,
  getRecommended,
  addArticle,
  updateArticle,
} = require("../controllers/article");
router.get("/", (req, res) => {
  res.send("Article api");
});
router.get("/all", getAllArticles);
router.get("/:id", getFullArticleById);
router.get("/category/:categoryId", getByCategory);
router.get("/recommended", getRecommended);
router.post("/addArticle", protectRoute, addArticle);
router.put("/update/:id", updateArticle);

module.exports = router;
