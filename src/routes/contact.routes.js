import express from "express";
import {
  createContact,
  getAllContacts,
  deleteContact,
} from "../controllers/contact.controller.js";

import authMiddleware from "../middlewares/auth.middleware.js";
import roleMiddleware from "../middlewares/role.middleware.js";

const router = express.Router();

/*
CREATE CONTACT (Public - website contact form)
*/
router.post("/", createContact);

/*
GET ALL CONTACTS (Admin Only)
*/
router.get("/", authMiddleware, roleMiddleware("admin"), getAllContacts);

/*
DELETE CONTACT (Admin Only)
*/
router.delete("/:id", authMiddleware, roleMiddleware("admin"), deleteContact);

export default router;
