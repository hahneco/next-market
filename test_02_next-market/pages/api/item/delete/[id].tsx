import connectDB from "../../../../utils/database";
import { ItemModel } from "../../../../utils/schemaModels";
// import { Request, Response } from 'express';
import { ExtendedNextApiRequestItem, ResMessageType, SavedItemDataType } from "../../../../utils/types";
import { NextApiResponse } from "next";


const deleteItem = async (req:ExtendedNextApiRequestItem, res:NextApiResponse<ResMessageType>) => {
  try {
    await connectDB()
    const singleItem: SavedItemDataType | null = await ItemModel.findById(req.query.id)
    if(!singleItem) return res.status(400).json({message: "アイテムが存在していないためアイテム削除失敗"})
    if (singleItem.email === req.body.email) {
      await ItemModel.deleteOne({ _id: req.query.id })
      return res.status(200).json({message: "アイテム削除成功"})
    } else {
      throw new Error()
    }
  } catch (err) {
    return res.status(400).json({message: "アイテム削除失敗"})
  }
}

export default deleteItem;
