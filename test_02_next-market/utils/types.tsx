import type { NextApiRequest } from "next"
import { Types } from "mongoose"

// schemaModels.tsx
export interface ItemDataType {
  title: String
  image: String
  price: String
  description: String
  email: String
}

// auth.tsx
export interface UserDataType {
  name: string
  email: string
  password: string
}

// auth.tsx
export interface DecodedType {
  email: string
}

// auth.tsx
export interface ExtendNextApiRequestAuth extends NextApiRequest {
  headers: {
    authorization: string
  }
  body: {
    email: string
  }
}

// common
export interface ResMessageType {
  message: string
  token?: string
}

// register.tsx
export interface ExtendNextApiRequestUser extends NextApiRequest {
  body: UserDataType
}

// login.tsx
export interface SaveUserDataType extends UserDataType {
  _id: Types.ObjectId
}

// readAll.tsx, update/[id].tsx, delete/[id].tsx
export interface SavedItemDataType extends ItemDataType {
  _id: Types.ObjectId
}

// readAll.tsx
export interface ResReadAllType {
  message: string
  allItems?: SavedItemDataType[]
}

// create.tsx
export interface ExtendedNextApiRequestItem extends NextApiRequest {
  body: ItemDataType
}

// [id].tsx
export interface ResReadSingleType {
  message: string
  singleItem?: SavedItemDataType
}
