const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { DateTime } = require("luxon");

const AnnouncementSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    content: {
      type: String,
      required: true,
    },
    priority: {
      type: String, 
      required: true, 
      enum: ["Low", "Medium", "High"]
      default: "Low",
    }
  },
  {
    timestamps: true,
  }
);

AnnouncementSchema.virtual("datePosted").get(function () {
  return DateTime.fromJSDate(this.createdAt).toLocaleString(
    DateTime.DATETIME_MED
  );
});

module.exports = mongoose.model("Comment", CommentSchema);
