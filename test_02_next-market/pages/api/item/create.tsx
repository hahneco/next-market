// アイテム作成用ファイル

import connectDB from "../../../utils/database";
import { ItemModel } from "../../../utils/schemaModels";
import auth from "../../../utils/auth";
import { NextApiResponse } from "next";
import { ExtendedNextApiRequestItem, ResMessageType } from "../../../utils/types";
// import { Request, Response } from 'express';


const createItem = async(req:ExtendedNextApiRequestItem, res:NextApiResponse<ResMessageType>) => {
  // 接続の順序
  // 1. データベースとの接続を行う。
  // 2. 書き込みを実行する。
  try {
    await connectDB()
    // console.log(req.body);
    await ItemModel.create(req.body) // create()がDBへの書き込みを行う。()には書き込みたいデータを入れる。
    return res.status(200).json({message: "アイテム作成"})
  } catch (err) {
    return res.status(400).json({message: "アイテム作成失敗"})
  }
}

export default auth(createItem);
