import Image from "next/image"
import useAuth from "../../../../utils/useAuth"
import '../../../../src/app/globals.css'
import Head from "next/head"
import Layout from "../../layout"
import { GetServerSideProps, NextPage } from "next"
import { ReadSingleDataType } from "../../../../utils/types"
import React from "react"


const DeleteItem: NextPage<ReadSingleDataType> = (props) => {
  console.log(props.singleItem)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const response = await fetch(`https://next-market-lime.vercel.app/api/item/delete/${props.singleItem._id}`, {
        method: "DELETE",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "authorization": `Bearer ${localStorage.getItem("token")}` // Bearerは必須ではないが、慣習的に使用される
        },
      })
      const jsonData = await response.json()
      // console.log(jsonData)
      alert(jsonData.message)
    } catch (err) {
      alert("アイテム削除失敗")
    }
  }

  const loginUser = useAuth()

  if (loginUser === props.singleItem.email) {
    return (
      <Layout>
        <div className="delete-page">
          <Head>
            <title>アイテム削除</title>
          </Head>
          <h1 className="page-title">アイテム削除</h1>

          <form action="" onSubmit={handleSubmit}>
            <h2>{props.singleItem.title}</h2>
            <Image src={`/${props.singleItem.image}`} width={750} height={500} alt="item-image" />
            <h3>¥{props.singleItem.price}</h3>
            <p>{props.singleItem.description}</p>

            <button>削除</button>
          </form>
        </div>
      </Layout>
    )
  } else {
    return <h1>権限がありません</h1>
  }

}

export default DeleteItem

export const getServerSideProps: GetServerSideProps<ReadSingleDataType> = async (context) => {
  const itemId = context.query.id; // queryパラメータから`id`を取得

  const response = await fetch(`https://next-market-lime.vercel.app/api/item/${itemId}`);
  const singleItem = await response.json();

  return {
    props: singleItem
  };
};
