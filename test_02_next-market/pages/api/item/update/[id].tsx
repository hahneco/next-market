import connectDB from "../../../../utils/database";
import { ItemModel } from "../../../../utils/schemaModels";
import auth from "../../../../utils/auth";
import { NextApiRequest, NextApiResponse } from "next";
import { ResMessageType, SavedItemDataType } from "../../../../utils/types";
// import { Request, Response } from 'express';


const updateItem = async (req:NextApiRequest, res:NextApiResponse<ResMessageType>) => {
  // console.log(req)
  try {
    await connectDB()
    const singleItem: SavedItemDataType | null = await ItemModel.findById(req.query.id)
    if(!singleItem) return res.status(400).json({message: "アイテムが存在しないため編集失敗"})
    if (singleItem.email === req.body.email) {
      await ItemModel.updateOne({_id: req.query.id}, req.body)
      return res.status(200).json({message: "アイテム編集成功"})
    } else {
      throw new Error()
    }
  } catch (err) {
    return res.status(400).json({message: "アイテム編集失敗"})
  }
}

export default auth(updateItem);
