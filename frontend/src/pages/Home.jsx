/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react"
import api from "../api"
import Note from "../components/Note"

import "../styles/Home.css"

const Home = () => {
	const [notes, setNotes] = useState([])
	const [content, setContent] = useState("")
	const [title, setTitle] = useState("")

	useEffect(() => {
		getNotes()
	}, [])

	const getNotes = () => {
		api.get("/api/notes/")
			.then((res) => res.data)
			.then((data) => {
				setNotes(data)
				console.log(data)
			})
			.catch((error) => alert(error))
	}

	const deleteNote = (id) => {
		api.delete(`/api/notes/delete/${id}/`)
			.then((res) => {
				if (res.status === 204) alert("Note deleted!")
				else alert("Failed to delete note.")
				getNotes()
			})
			.catch((error) => alert(error))
	}

	const createNote = (e) => {
		e.preventDefault()
		api.post("/api/notes/", { content, title })
			.then((response) => {
				if (response.status === 201) alert("Note created!")
				else alert("Failed to create note.")
				getNotes()
			})
			.catch((error) => alert(error))
	}

	return (
		<div>
			<div>
				<h2>Notes</h2>
				{notes.map((note) => (
					<Note note={note} onDelete={deleteNote} key={note.id} />
				))}
			</div>
			<h2>Create a Note</h2>
			<form onSubmit={createNote}>
				<label htmlFor="title">Title:</label>
				<br />
				<input
					type="text"
					id="title"
					name="title"
					required
					onChange={(e) => setTitle(e.target.value)}
					value={title}
				/>
				<label htmlFor="content">Content:</label>
				<br />
				<textarea
					id="content"
					name="content"
					required
					onChange={(e) => setContent(e.target.value)}
					value={content}
				/>
				<br />
				<input type="submit" value="Submit" />
			</form>
		</div>
	)
}

export default Home