import Image from "next/image"
import Link from "next/link"

const Header = () => {
  return (
    <header>
      <div>
        <Link href="/">
          <Image
            width={1100}
            height={200}
            src="/header.svg"
            alt="header-img" />
        </Link>
        <nav>
          <ul>
            <li>
              <Link href="/user/register">登録</Link>
              <Link href="/user/login">ログイン</Link>
              <Link href="/item/create">アイテム作成</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header
