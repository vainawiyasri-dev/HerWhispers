import api from "../api"

function BookCard({ book, refresh }) {

  const deleteBook = async () => {
    await api.delete(`/books/${book._id}`)
    refresh()
  }

  const renameBook = async () => {
    const newTitle = prompt("Rename book")
    if (!newTitle) return
    await api.put(`/books/${book._id}`, { title: newTitle })
    refresh()
  }

  const downloadBook = async () => {
    const response = await fetch(book.fileUrl)
    const blob = await response.blob()
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = book.title + ".pdf"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    window.URL.revokeObjectURL(url)
  }

  return (
    <div style={{
      background: "#fff7f3",
      padding: "15px",
      borderRadius: "10px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "10px",
      textAlign: "center",
      transition: "transform 0.2s",
    }}
      onMouseEnter={e => e.currentTarget.style.transform = "translateY(-5px)"}
      onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
    >
      <h3 style={{ color: "#4a3b3b", fontSize: "1.1rem" }}>{book.title}</h3>
      <div style={{ display: "flex", gap: "10px" }}>
        <button onClick={downloadBook} style={{ padding: "5px 10px", borderRadius: "6px", background: "#c29fa6", color: "#fff", border: "none", cursor: "pointer" }}>Download</button>
        <button onClick={renameBook} style={{ padding: "5px 10px", borderRadius: "6px", background: "#f5d0d6", color: "#4a3b3b", border: "none", cursor: "pointer" }}>Rename</button>
        <button onClick={deleteBook} style={{ padding: "5px 10px", borderRadius: "6px", background: "#e49b9f", color: "#fff", border: "none", cursor: "pointer" }}>Delete</button>
      </div>
    </div>
  )
}

export default BookCard