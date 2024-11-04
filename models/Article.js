const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    highlight: {
      type: String,
      required: true,
      maxlength: 100,
    },
    font: {
      type: Number,
      required: true,
    },
    Collaborator: [
      {
        user: {
          type: [mongoose.Schema.Types.ObjectId],
          ref: "User",
          required: true,
        },
        approved: {
          type: Boolean,
        },
      },
    ],
    SEOTags: {
      type: [String],
      required: true,
    },
    customUrl: {
      type: [String],
      required: true,
    },
    categories: {
      type: [String],
      required: true,
    },
    featuredImage: {
      imageURL: {
        type: String,
        required: true,
      },
      imageCaption: {
        type: String,
        required: true,
      },
    },
    extraImages: [
      {
        imageURL: {
          type: String,
          required: true,
        },
        imageCaption: {
          type: String,
          required: true,
        },
      },
    ],
    views: {
      type: Number,
      default: 0,
    },
    likes: {
      type: Number,
      default: 0,
    },
    comments: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        text: {
          type: String,
          required: true,
        },
        date: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    relatedItems: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Article",
      },
    ],
  },
  { timestamps: true }
);

const Article = mongoose.model("Article", articleSchema);

module.exports = Article;
