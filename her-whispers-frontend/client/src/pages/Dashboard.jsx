import { useState, useEffect, useRef } from "react"
import api from "../api"
import BookCard from "../components/BookCard"

function Dashboard() {
  const [books, setBooks] = useState([])
  const [search, setSearch] = useState("")
  const fileRef = useRef()

  useEffect(() => {
    fetchBooks()
  }, [])

  const fetchBooks = async () => {
    const res = await api.get("/books")
    setBooks(res.data)
  }

  const uploadBook = async (e) => {
    const file = e.target.files[0]
    if (!file) return
    const formData = new FormData()
    formData.append("title", file.name)
    formData.append("file", file)
    await api.post("/books", formData)
    fetchBooks()
  }

  const filtered = books.filter(b =>
    b.title.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div style={{ padding: "20px", fontFamily: "'Merriweather', serif", background: "#fdf6f0", minHeight: "100vh" }}>
      <h1 style={{ textAlign: "center", justifyContent:"center", fontSize: "2.5rem", color: "#4a3b3b", marginBottom: "30px", fontStyle: "bold" }}>
        Her Whispers
      </h1>

      <div style={{ display: "flex", justifyContent: "center", gap: "15px", marginBottom: "30px" }}>
        <input
          placeholder="Search books"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: "10px 15px",
            borderRadius: "8px",
            border: "1px solid #ddd",
            width: "250px"
          }}
        />

        <button
          onClick={() => fileRef.current.click()}
          style={{
            padding: "10px 20px",
            background: "#c29fa6",
            border: "none",
            borderRadius: "8px",
            color: "#fff",
            cursor: "pointer",
            fontWeight: "bold"
          }}
        >
          Upload
        </button>

        <input type="file" ref={fileRef} style={{ display: "none" }} onChange={uploadBook} />
      </div>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        gap: "20px"
      }}>
        {filtered.map(book => (
          <BookCard key={book._id} book={book} refresh={fetchBooks} />
        ))}
      </div>
    </div>
  )
}

export default Dashboard