import Link from "next/link"

const Header = () => {
  return (
    <header>
      <div>
        <Link href="/">
          <img src="/header.svg" alt="header-img" />
        </Link>
        <nav>
          <ul>
            <li>
              <Link href="/user/register">登録</Link>
              <Link href="/user/login">ログイン</Link>
              <Link href="/user/create">アイテム作成</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header
