import Book from "../models/Book.js"
import cloudinary from "../config/cloudinary.js"

export const getBooks = async (req,res) => {

  const books = await Book.find().sort({createdAt:-1})

  res.json(books)

}

export const uploadBook = async (req,res)=>{

  try{

    if(!req.file){
      return res.status(400).json({message:"No file uploaded"})
    }

    console.log("Uploading file:", req.file.path)

    const result = await cloudinary.uploader.upload(
      req.file.path,
      {resource_type:"raw"}
    )

    console.log("Cloudinary upload success")

    const book = new Book({
      title:req.body.title,
      fileUrl:result.secure_url,
      cloudId:result.public_id
    })

    await book.save()

    console.log("Book saved:", book.title)

    res.json(book)

  }catch(err){

    console.error("UPLOAD ERROR:", err)

    res.status(500).json({error:err.message})

  }

}
export const deleteBook = async (req,res) => {

  const book = await Book.findById(req.params.id)

  await cloudinary.uploader.destroy(
    book.cloudId,
    { resource_type:"raw" }
  )

  await book.deleteOne()

  res.json("Book deleted")

}

export const renameBook = async (req,res) => {

  const book = await Book.findById(req.params.id)

  book.title = req.body.title

  await book.save()

  res.json(book)

}