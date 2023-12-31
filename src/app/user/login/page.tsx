'use client'

import type { NextPage } from "next"
import Head from "next/head"
import React, { useState } from "react"


const Login: NextPage = () => {
  const [newUser, setNewUser] = useState({
    email: "",
    password: "",
  })
  // const [email, setEmail] = useState("")
  // const [password, setPassword] = useState("")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
     const response = await fetch("https://next-market-lime.vercel.app/api/user/login", {
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewUser({
      ...newUser,
      [e.target.name]: e.target.value, // 型アサーション
    })
  }

  return (
    <div>
      <Head>
        <title>ログイン</title>
      </Head>
      <h1 className="page-title">ログイン</h1>

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
