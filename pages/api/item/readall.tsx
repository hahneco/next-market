// データベースとの接続
import { NextApiRequest, NextApiResponse } from "next";
import connectDB from "../../../utils/database";
// MongoDBからデータの読み取りを行う機能を持つModelを読み込む
import { ItemModel } from "../../../utils/schemaModels";
import { ResReadAllType, SavedItemDataType } from "../../../utils/types";
// import { Request, Response } from 'express';


const getAllItems = async(req:NextApiRequest, res:NextApiResponse<ResReadAllType>) => {
  try {
    await connectDB()
    const allItems: SavedItemDataType[] = await await ItemModel.find() // ItemModel.find()でDBから取得されたデータは、allItemsへ格納される
    // console.log(allItems)
    return res.status(200).json({message: "アイテム読み取り成功（オール）", allItems: allItems})
  }catch(err) {
    return res.status(400).json({message: "アイテム読み取り失敗（オール）"})
  }
}

export default getAllItems;
