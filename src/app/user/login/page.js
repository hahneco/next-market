'use client'

import { useState } from "react"


const Login = () => {
  const [newUser, setNewUser] = useState({
    email: "",
    password: "",
  })
  // const [email, setEmail] = useState("")
  // const [password, setPassword] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
     const response = await fetch("http://localhost:3000/api/user/login", {
        method: "POST",
        headers: {
           "Accept": "application/json", // JSON形式でデータ送信
           "Content-Type": "application/json" // JSON形式でデータ送信
        },
        body: JSON.stringify(newUser) // 送信したいデータ
     })
      const jsonData = await response.json()
      // console.log(jsonData)
      localStorage.setItem("token", jsonData.token)
      alert(jsonData.message)
    } catch (err) {
      alert("ログイン失敗")
    }
  }

  const handleChange = (e) => {
    setNewUser({
      ...newUser,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div>
      <h1>ログイン</h1>

      <form onSubmit={handleSubmit}>
        <input
          value={newUser.email}
          onChange={handleChange}
          type="text"
          name="email"
          placeholder="メールアドレス"
          required
         />
        <input
          value={newUser.password}
          onChange={handleChange}
          type="text"
          name="password"
          placeholder="パスワード"
          required
         />
        <button>ログイン</button>
      </form>
    </div>
  )
}

export default Login
