import type { NextApiRequest, NextApiResponse } from "next"
import jwt from "jsonwebtoken"
import { decode } from "punycode"
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

    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImhlbGxvQG1vbm90YWluLmNvbSIsImlhdCI6MTY4ODc4MDY5NSwiZXhwIjoxNjg4ODYzNDk1fQ.GhOiAbvP4ooP9oLV--ByORD272Ve7mA5nqrePauzuGQ"
    // const token = await req.headers.authorization.split(" ")[1]

    // トークンがない場合
    if (!token) {
      return res.status(401).json({message: "トークンがありません"})
    }

    // トークンがある場合
    try {
      const decoded = jwt.verify(token, secret_key)
      // console.log(decoded)
      req.body.email = (decoded as DecodedType).email // asを使用するものを型アサーション（Type Assertion）という。
      return handler(req, res)
    } catch (err) {
      return res.status(401).json({message: "トークンが正しくないので、ログインしてください。"})
    }
  }
}

export default auth
