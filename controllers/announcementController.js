const Announcement = require("../models/announcement"); 
const { body, validationResult } = require("express-validator");

exports.announcement_create_post = [
  body("content").not().isEmpty().withMessage("Content field required").trim(),
  async (req, res, next) => {
    const { content, user, priority, warehouse } = req.body; 
    const errors = validationResult(req); 

    if (!errors.isEmpty()) {
      req.flash("error", "Please fill all required fields"); 
      res.redirect(`/warehouses/${warehouse}`); 
      return; 
    }

    try {
      const announcement = await Announcement.create({
        content, user, priority
      }); 
      return res.redirect(`/warehouses/${warehouse}`)
    } catch (err) {
      return next(err); 
    }
  }
]; 

exports.announcement_delete_post = async (req, res, next) => {
  try {
    const announcement = await Announcement.findByIdAndDelete(req.params.id);
    return res.send("Succuss!"); 
  } catch (err) {
    return next(err); 
  }
}