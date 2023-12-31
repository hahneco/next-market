import { useState } from "react"
import useAuth from "../../../../utils/useAuth"
import Head from "next/head"
import Layout from "../../layout"
import { GetServerSideProps, NextPage } from "next"
import { ReadSingleDataType } from "../../../../utils/types"


const UpdateItem: NextPage<ReadSingleDataType> = (props) => {
  const [title, setTitle] = useState(props.singleItem.title)
  const [price, setPrice] = useState(props.singleItem.price)
  const [image, setImage] = useState(props.singleItem.image)
  const [description, setDescription] = useState(props.singleItem.description)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const response = await fetch(`https://next-market-lime.vercel.app/api/item/update/${props.singleItem._id}`, {
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
      alert("アイテム編集失敗")
    }
  }

  const loginUser = useAuth()

  if (loginUser === props.singleItem.email) {
    return (
      <Layout>
        <div>
          <Head>
            <title>アイテム編集</title>
          </Head>
          <h1 className="page-title">アイテム編集</h1>

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
            <button>編集</button>
          </form>
        </div>
      </Layout>
    )
  } else {
    return <h1>権限がありません</h1>
  }
}

export default UpdateItem

export const getServerSideProps: GetServerSideProps<ReadSingleDataType> = async (context) => {
  const itemId = context.query.id; // queryパラメータから`id`を取得

  const response = await fetch(`https://next-market-lime.vercel.app/api/item/${itemId}`);
  const singleItem = await response.json();

  return {
    props: singleItem
  };
};
