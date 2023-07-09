import type { NextApiRequest, NextApiResponse } from "next"
import jwt from "jsonwebtoken"
import { DecodedType, ExtendNextApiRequestAuth, ResMessageType } from "./types"


const secret_key = "nextmarket"

/*
DBのcreateやupdateファイルが実行される前に、
トークンを確認して「ログイン状態」を調べる。

上記のような特定の機能で他の機能の処理を補助するものを「ミドルウェア」という。
*/


const auth = (handler:any) => { // createItemとかdeleteItemとかを受け取る
  return async (req:ExtendNextApiRequestAuth, res:NextApiResponse<ResMessageType>) => {
    // ログイン状態を判別する処理
    // 1. リクエストの種類を判別する
    if (req.method === "GET") { // GETの場合はログイン判定不要。
      return handler(req, res) // 処理を止める
    }

    // const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImhlbGxvNUBtb25vdGFpbi5jb20iLCJpYXQiOjE2ODg3OTkyMzYsImV4cCI6MTY4ODg4MjAzNn0.BZq5r2-NkaKGAUC2k13KU-itGd0m2SK-TavGbfJnHuU"
    // フロント側から送られたリクエストのheaderからトークンを取得している。
    const token = await req.headers.authorization.split(" ")[1]

    // トークンがない場合
    if (!token) {
      return res.status(401).json({message: "トークンがありません"})
    }

    // トークンがある場合
    try {
      const decoded = jwt.verify(token!, secret_key)
      // console.log(decoded)
      req.body.email = (decoded as DecodedType).email // asを使用するものを型アサーション（Type Assertion）という。
      return handler(req, res)
    } catch (err) {
      return res.status(401).json({message: "トークンが正しくないので、ログインしてください。"})
    }
  }
}

export default auth
