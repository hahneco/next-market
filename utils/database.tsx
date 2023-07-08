import mongoose from "mongoose"

const connectDB = async() => {
  try { // したい処理
    await mongoose.connect("mongodb+srv://hahnecochito:S5haJdAot3cbbIsp@cluster0.c0xxupd.mongodb.net/appDataBase?retryWrites=true&w=majority")
    console.log("Success: Connected to MongoDB")
  } catch (err) { // 失敗した時!!
    console.log("Failure: Unconnected to MongoDB")
    throw new Error()
  }
}

export default connectDB;
