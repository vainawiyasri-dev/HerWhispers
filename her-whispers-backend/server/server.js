import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"
import bookRoutes from "./routes/bookRoutes.js"

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
  console.log("MongoDB Connected")
})
.catch(err=>{
  console.log(err)
})

app.get("/",(req,res)=>{
  res.send("Her Whispers Backend Running")
})

const PORT = process.env.PORT || 5000
app.use("/books", bookRoutes)

app.listen(PORT,()=>{
  console.log(`Server running on port ${PORT}`)
})