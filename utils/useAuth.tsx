// 「ログイン状態を調べる」機能。※独自フック

import jwt from "jsonwebtoken"
import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { DecodedType } from "./types"


// シークレットキー
const secret_key = "nextmarket"


const useAuth = () => {
  const [loginUser, setLoginUser] = useState("")

  const router = useRouter() // ページを強制的に遷移させるのに使う。

  // ページが表示される前に行いたい処理にはuseEffectが有効
  useEffect(() => {
    const token = localStorage.getItem("token")
    // console.log(token)
    // console.log(jwt.verify(token, secret_key))

    if (!token) { // トークンがない場合はログインページに行く。
      router.push("/user/login");
      return;
    }

    // トークンがある場合はサーバーに検証リクエストを送信
    // トークンが有効かチェックする(jwt.verify()とシークレットキーが必要。)
    try {
      const decoded = jwt.verify(token!, secret_key) // トークンを解析し、保存されたデータがdecodedに保存される。
      setLoginUser((decoded as DecodedType).email)
    } catch (error) { // トークンが有効でない場合はログインページに行く。
      // router.push("/user/login")
      console.log("トークンが無効です");
    }
  }, [router])

  return loginUser
}

export default useAuth
