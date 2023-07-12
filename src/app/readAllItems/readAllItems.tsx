import { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { ReadAllDataType, SavedItemDataType } from "../../../utils/types";


const ReadAllItems: NextPage = () => {
  console.log("レンダリング(｀・ω・´)");
  console.log("٩( ᐛ )و")

  const [items, setItems] = useState<SavedItemDataType[]>([]);

  // getServerSidePropでうまくfetchできないので、一旦useEffectを使って実装する
  // app/ディレクトリ下にファイルを置こうとしたのが原因。pages/下なら動作する
  const getItems = useCallback(async () => {
    const response = await fetch("https://next-market-lime.vercel.app/api/item/readall");
    const allItems = await response.json();
    console.log(allItems.allItems)
    setItems(allItems.allItems)
  }, [])

  useEffect(() => {
    getItems();
  }, [getItems])

  return (
    <div className="container">
      <Head>
        <title>Next Market</title>
      </Head>

      {items.map((item, index) => {
        return (
          <Link href={`/item/${item._id}`} key={index} className="card">
            <Image
              src={`/${item.image}`}
              width="750"
              height="500"
              alt="item-image" />
            <div className="texts-area">
            <h2>¥{item.price}</h2>
            <h3>{item.title}</h3>
            <p>{item.description.substring(0, 80)}...</p>
            </div>
          </Link>
        )
      })}
    </div>
  );
};

export default ReadAllItems

// export const getServerSideProps: GetServerSideProps<ReadAllDataType>  = async() => {
//   const response = await fetch("https://next-market-lime.vercel.app/api/item/readall")
//   const allItems = await response.json()
//   return {
//     props: allItems
//   }
// }
