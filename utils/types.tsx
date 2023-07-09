import type { NextApiRequest } from "next"
import { Types } from "mongoose"
import { ReactNode } from "react"

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

// Frontend
// [id].tsx, update/[id].tsx, delete/[id].tsx
export interface ReadSingleDataType {
  singleItem: {
    _id: string
    title: string
    image: string
    price: string
    description: string
    email: string
  }
}

// index.tsx
export interface ReadAllDataType {
  allItems: {
    _id: string
    title: string
    image: string
    price: string
    description: string
    email: string
  }[]
}

// Frontend
// layout.tsx
export interface Props {
  children: ReactNode;
}

// Define the item type
export interface ItemType {
  _id: string;
  image: string;
  // Add other properties if necessary
};
