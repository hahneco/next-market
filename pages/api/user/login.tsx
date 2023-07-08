import jwt from "jsonwebtoken"
import connectDB from "../../../utils/database"
import { UserModel } from "../../../utils/schemaModels"
import { ExtendNextApiRequestUser, ResMessageType, SaveUserDataType } from "../../../utils/types"
import { NextApiResponse } from "next"

/*
## ログインのプロセス
* 1. ユーザ登録を済ませているか、チェックする
　　　→DBからユーザデータを取得して、その人が登録済かを調べる。
　　　　※ログイン画面で入力されたアドレスが、DBに保存されているかを確認する。
* 2. (ユーザ登録が完了していれば)ユーザがメールアドレス・パスワードを入力してログインを行う。
* 3. ログイン成功後：トークンを発行して、ログイン状態を維持する
*/


// シークレットキー
const secret_key = "nextmarket"
// import { Request, Response } from 'express';


const loginUser = async (req:ExtendNextApiRequestUser, res:NextApiResponse<ResMessageType>) => {
  try {
    await connectDB()
    const saveUserData: SaveUserDataType | null = await UserModel.findOne({ email: req.body.email })
    // console.log(saveUserData)

    if (saveUserData) {
      if (req.body.password === saveUserData.password) {
        // パスワードが正しい場合

        // ペイロード（今回はemailを使用する）
        const payload = {
          email: req.body.email,
        }
        // トークンを発行する
        const token = jwt.sign(payload, secret_key, {expiresIn: "23h"})
        console.log(token)
        return res.status(200).json({message: "ログイン成功", token: token})
      } else {
        return res.status(400).json({message: "ログイン失敗：パスワードが間違っています。"})
      }
    } else {
      return res.status(400).json({message: "ログイン失敗：ユーザ登録をしてください。"})
    }

  } catch (err) {
    return res.status(400).json({message: "ログイン失敗"})
  }
}

export default loginUser
