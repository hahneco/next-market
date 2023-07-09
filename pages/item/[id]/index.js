'use client'

import Image from "next/image";


const ReadSingleItem = (props) => {
  console.log("レンダリング(｀・ω・´)");
  console.log(props);

  return (
    <div>
      <div>
        <Image src={`/${props.singleItem.image}`} width="750" height="800" alt="item-image" />
        <div>
          <h1>{props.singleItem.title}</h1>
          <h2>{props.singleItem.price}</h2>
          <hr />
          <p>{props.singleItem.description}</p>
        </div>
      </div>
    </div>
  )
};

export default ReadSingleItem;

export const getServerSideProps = async (context) => {
  const itemId = context.query.id; // queryパラメータから`id`を取得

  const response = await fetch(`http://localhost:3000/api/item/${itemId}`);
  const singleItem = await response.json();

  // console.log(context);

  return {
    props: singleItem
  };
};
