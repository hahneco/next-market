import mongoose from "mongoose"
import { ItemDataType, UserDataType } from "./types"

const Schema = mongoose.Schema

// interface ItemDataType {
//   title: String
//   image: String
//   price: String
//   description: String
//   email: String
// }

// interface UserDataType {
//   name: string
//   email: string
//   password: string
// }

const ItemSchema = new Schema<ItemDataType>({ // MongoDBで保存したいデータの形と種類を定義する
  // idはデータベースへ保存時にMongoDBが自動で割り当てるので必要ない
  title: String,
  image: String,
  price: String,
  description: String,
  email: String
})

const UserSchema = new Schema<UserDataType>({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true, // 空欄だとDBに登録できない
    unique: true // １つのアドレスで複数のアカウント作成できないようにする
  },
  password: {
    type: String,
    required: true
  }
}) // ユーザ登録機能用


/*
* データベースに対して実行する操作には、読み取り・書き込み・修正・削除がある。
* これらの操作を実行するにはModelというものが必要。
* ModelはSchemaをベースに生成する。
*/
// ⇩modelの作成
export const ItemModel = mongoose.models.Item || mongoose.model("Item", ItemSchema)
// ⇩modelの作成
export const UserModel = mongoose.models.User || mongoose.model("User", UserSchema)
