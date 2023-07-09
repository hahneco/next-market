// ログインしているユーザのみが、アイテムの作成を行える。
// アイテムの作成、編集、削除のリクエストはutils/auth.jsを必ず通過し、有効なトークンを持っているかチェックを受ける。

import { useState } from "react"
import useAuth from "../../../utils/useAuth"


const CreateItem = () => {
  console.log("create")
  const [title, setTitle] = useState("")
  const [price, setPrice] = useState("")
  const [image, setImage] = useState("")
  const [description, setDescription] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await fetch("http://localhost:3000/api/item/create", {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "authorization": `Bearer ${localStorage.getItem("token")}` // Bearerは必須ではないが、慣習的に使用される
        },
        body: JSON.stringify({
          title: title,
          price: price,
          image: image,
          description: description
        })
      })
      const jsonData = await response.json()
      // console.log(jsonData)
      alert(jsonData.message)
    } catch (err) {
      alert("アイテム作成失敗")
    }
  }

  const loginUser = useAuth()
  // console.log(loginUser)

  if (loginUser) {
    return (
      <div>
      <h1>アイテム作成</h1>

      <form action="" onSubmit={handleSubmit}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          name="title"
          placeholder="アイテム名"
          required
        />
        <input
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          type="text"
          name="price"
          placeholder="価格"
          required
        />
        <input
          value={image}
          onChange={(e) => setImage(e.target.value)}
          type="text"
          name="image"
          placeholder="画像"
          required
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          name="description"
          rows={15}
          placeholder="商品説明"
          required></textarea>
        <button>作成</button>
      </form>
    </div>
    )
  }
}

export default CreateItem
