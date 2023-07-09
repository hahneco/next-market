'use client'

import Image from "next/image";
import Link from "next/link";
import '../../../src/app/globals.css'
import Head from "next/head";
import { Layout } from "../layout";


const ReadSingleItem = (props) => {
  console.log("レンダリング(｀・ω・´)");
  console.log(props);

  return (
    <Layout>
      <div className="grid-container-si">
        <Head>
          <title>{props.singleItem.title}</title>
        </Head>

        <div>
          <Image src={`/${props.singleItem.image}`} width="750" height="500" alt="item-image" />
          <div>
            <h1>{props.singleItem.title}</h1>
            <h2>{props.singleItem.price}</h2>
            <hr />
            <p>{props.singleItem.description}</p>

            <div>
              <Link href={`/item/update/${props.singleItem._id}`} >
                アイテム編集
              </Link>

              <Link href={`/item/delete/${props.singleItem._id}`} >
                アイテム削除
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
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
