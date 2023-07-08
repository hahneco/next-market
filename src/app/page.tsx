import Image from 'next/image'


export const ReadAllItems = () => {
  return (
    <div>
      <h1 className='h1-style'>こんにちわ</h1>
    </div>
  )
}

export default function Home() {
  return (
    <main>
      index
      <ReadAllItems />
    </main>
  )
}
