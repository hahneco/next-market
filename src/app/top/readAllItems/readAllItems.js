'use client'

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
    <div>
      {items.map(item => {
        return (
          <Link href="#" key={item._id}>
            <Image
              src={`/${item.image}`}
              width="750"
              height="500"
              alt="item-image" />
            <h2>¥{item.price}</h2>
            <h2>{item.title}</h2>
            <h2>{item.description.substring(0, 80)}...</h2>
          </Link>
        )
      })}
    </div>
  );
};

export default ReadAllItems;
