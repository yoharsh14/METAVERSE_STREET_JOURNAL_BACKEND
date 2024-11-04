const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
  },
  articles: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Article",
  },
});

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
