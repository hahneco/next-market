import Image from "next/image"

const DeleteItem = (props) => {
  console.log(props.singleItem)

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await fetch(`http://localhost:3000/api/item/delete/${props.singleItem._id}`, {
        method: "DELETE",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "authorization": `Bearer ${localStorage.getItem("token")}` // Bearerは必須ではないが、慣習的に使用される
        },
      })
      const jsonData = await response.json()
      console.log(jsonData)
      alert(jsonData.message)
    } catch (err) {
      alert("アイテム削除失敗")
    }
  }

  return (
    <div>
      <h1>アイテム削除</h1>

      <form action="" onSubmit={handleSubmit}>
        <h2>{props.singleItem.title}</h2>
        <Image src={`/${props.singleItem.image}`} width={750} height={500} alt="item-image" />
        <h3>¥{props.singleItem.price}</h3>
        <p>{props.singleItem.description}</p>

        <button>削除</button>
      </form>
    </div>
  )
}

export default DeleteItem

export const getServerSideProps = async (context) => {
  const itemId = context.query.id; // queryパラメータから`id`を取得

  const response = await fetch(`http://localhost:3000/api/item/${itemId}`);
  const singleItem = await response.json();

  console.log(context);

  return {
    props: singleItem
  };
};