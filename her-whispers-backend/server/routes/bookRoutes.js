import express from "express"
import multer from "multer"

import {
  getBooks,
  uploadBook,
  deleteBook,
  renameBook
} from "../controllers/bookController.js"

const router = express.Router()

const upload = multer({ dest:"uploads/" })

router.get("/", getBooks)

router.post("/", upload.single("file"), uploadBook)

router.delete("/:id", deleteBook)

router.put("/:id", renameBook)

export default router