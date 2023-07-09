'use client'
// 新しいユーザ登録用

// import { headers } from "next/dist/client/components/headers";
import type { NextPage } from "next"
import React, { useState } from "react"
import Head from "next/head"


const Register: NextPage = () => {
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: ""
  })
  // const [name, setName] = useState(""); // データを扱うときはほぼ使う
  // const [email, setEmail] = useState(""); // データを扱うときはほぼ使う
  // const [password, setPassword] = useState(""); // データを扱うときはほぼ使う

  {/* Reactでのデータ送信用! */}
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault() // <form>で<button>を押して送信処理すると、デフォルでリロードされてしまう設計になっているので解除する　※(e)の中に入っている
    try { // データの送信処理は成功/失敗があるので下記のように記述
      const response = await fetch("http://localhost:3000/api/user/register", {
        method: "POST",
        headers: {
          "Accept": "application/json", // JSON形式でデータ送信
          "Content-Type": "application/json" // JSON形式でデータ送信
        },
        body: JSON.stringify(newUser) // 送信したいデータ
      }) // fetch☞ 「取ってくる」「読み取る」の意味
      const jsonData = await response.json() // 送り返されるレスポンスデータは、ストリーム形式なので、JSON形式に変更する
      console.log(jsonData)
      alert(jsonData.message)
    } catch (err) {
      alert("ユーザ登録失敗!")
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewUser({
      ...newUser,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div>
      <Head>
        <title>ユーザー登録</title>
      </Head>
      <h1 className="page-title">ユーザー登録</h1>

      {/* HTMLでのデータ送信は⇩これだった。。 */}
      {/* <form action="http://localhost:3000/api/user/register" method="POST"> */}

      {/* Reactでは下記のようにデータを送信を実現する! */}
      <form onSubmit={handleSubmit}>

        {/* 「required」でひとつでも空欄があるとフォームが送信できないようにする */}
        <input
          value={newUser.name}
          onChange={handleChange}
          type="text"
          name="name"
          placeholder="名前"
          required
        />
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
        <button>登録</button>

      </form>
    </div>
  )
}

export default Register
