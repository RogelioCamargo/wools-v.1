const express = require("express");
const router = express.Router();

const announcementController = require("../controllers/announcementController");

router.post("/create", announcementController.announcement_create_post); 

router.delete("/:id", announcementController.announcement_delete_post); 

module.exports = router; 