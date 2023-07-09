'use client'

import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";


const ReadAllItems = () => {
  console.log("レンダリング(｀・ω・´)");

  const [items, setItems] = useState([]);

  // getServerSidePropでうまくfetchできないので、一旦useEffectを使って実装する
  const getItems = useCallback(async () => {
    const response = await fetch("http://localhost:3000/api/item/readall");
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

      {items.map(item => {
        return (
          <Link href={`/item/${item._id}`} key={item._id} className="card">
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

export default ReadAllItems;
