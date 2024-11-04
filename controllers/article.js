const Article = require("../models/Article");
const User = require("../models/User");
const Category = require("../models/Category");

const getAllArticles = async (req, res, next) => {
  try {
    const articles = await Article.find();
    res.status(200).json(articles);
  } catch (e) {
    console.log("Error in getAllArticle controller", e.message);
    res.status(404).json({ error: e });
  }
};
const getFullArticleById = async (req, res, next) => {
  try {
  } catch (e) {}
};
const getByCategory = async (req, res, next) => {
  try {
    const categoryId = req.params.categoryId;
    const category = await Category.findOne({ category: categoryId }).populate(
      "articles"
    );
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    const articleIds = category.articles.map((article) => article._id);
    const articles = await Article.find({ _id: { $in: articleIds } });
    res.status(200).json(articles);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Internal server error" });
  }
};
const getRecommended = async (req, res, next) => {
  try {
  } catch (e) {}
};
const addArticle = async (req, res, next) => {
  const addToCategories = async (id, categories) => {
    try {
      categories.map(async (cat) => {
        const category = await Category.findOne({ category: cat });
        if (!category) {
          const newCategory = new Category({
            category: cat,
            articles: id,
          });
          await newCategory.save();
        } else {
          const updatedCategory = await Category.findOneAndUpdate(
            {
              category: cat,
            },
            { $addToSet: { articles: id } }
          );
          if (!updatedCategory) {
            console.log("Category not found");
          } else {
            console.log("Updated category");
          }
        }
      });
    } catch (e) {
      console.error(e);
    }
  };
  const getCollaborators = async (ids) => {
    let collabs = [];
    ids.map((id) => {
      collabs.push({
        user: id,
        approved: true,
      });
    });
    return collabs;
  };
  try {
    const {
      title,
      body,
      highlight,
      SEOTags,
      font,
      CollaboratorIds,
      customUrl,
      categories,
      featuredImage,
      extraImages,
    } = req.body;
    const Collaborator = getCollaborators(CollaboratorIds);

    const newArticle = new Article({
      title,
      body,
      highlight,
      font,
      Collaborator,
      SEOTags,
      customUrl,
      categories,
      featuredImage,
      extraImages,
      views: 0,
      likes: 0,
    });
    if (newArticle) {
      await newArticle.save();
      await addToCategories(newArticle._id, categories);
      res.status(200).json({
        _id: newArticle._id,
        title: newArticle.title,
        body: newArticle.body,
        highlight: newArticle.highlight,
        Collaborator: newArticle.Collaborator,
        SEOTags: newArticle.SEOTags,
        customUrl: newArticle.customUrl,
        extraImages: newArticle.extraImages,
        views: newArticle.views,
        likes: newArticle.likes,
        comments: newArticle.comments,
        relatedItems: newArticle.relatedItems,
      });
    } else {
      res.status(400).json({ error: "Invalid data" });
    }
  } catch (e) {
    console.log("Error in Article controller", e.message);
    res.status(404).json({ error: e });
  }
};
const updateArticle = async (req, res, next) => {
  try {
  } catch (e) {}
};

module.exports = {
  getAllArticles,
  getFullArticleById,
  getByCategory,
  getRecommended,
  addArticle,
  updateArticle,
};
