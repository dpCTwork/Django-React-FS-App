/* eslint-disable react/prop-types */
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants"
import api from "../api"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "../styles/Form.css"
import "../styles/LoadingIndicator.css"
import LoadingIndicator from "./LoadingIndicator"

const Form = ({ route, method }) => {
	const [username, setUsername] = useState("")
	const [password, setPassword] = useState("")
	// eslint-disable-next-line no-unused-vars
	const [loading, setLoading] = useState(false)

	const navigate = useNavigate()

	const handleSubmit = async (e) => {
		setLoading(true)
		e.preventDefault()

		try {
			const response = await api.post(route, { username, password })
			if (method === "login") {
				localStorage.setItem(ACCESS_TOKEN, response.data.access)
				localStorage.setItem(REFRESH_TOKEN, response.data.refresh)
				navigate("/")
			} else {
				navigate("/login")
			}
		} catch (error) {
			alert(error)
		} finally {
			setLoading(false)
		}
	}

	const authMethod = method === "login" ? "Login" : "Register"

	return (
		<form onSubmit={handleSubmit} className="form-container">
			<h1>{authMethod}</h1>
			<input
				type="text"
				className="form-input"
				value={username}
				onChange={(e) => setUsername(e.target.value)}
				placeholder="User Name"
			/>
			<input
				type="password"
				className="form-input"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
				placeholder="Password"
			/>
			<button className="form-button" type="submit">
				{loading ? (
					<LoadingIndicator />
				) : (
					<div style={{ margin: "10px" }}>{authMethod}</div>
				)}
			</button>
		</form>
	)
}

export default Form
