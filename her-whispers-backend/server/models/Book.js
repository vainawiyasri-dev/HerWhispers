import mongoose from "mongoose"

const BookSchema = new mongoose.Schema({

  title: {
    type: String,
    required: true
  },

  fileUrl: {
    type: String,
    required: true
  },

  cloudId: {
    type: String,
    required: true
  },

  createdAt: {
    type: Date,
    default: Date.now
  }

})

export default mongoose.model("Book", BookSchema)