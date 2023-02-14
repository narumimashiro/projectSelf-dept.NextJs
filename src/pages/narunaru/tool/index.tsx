import Head from 'next/head'
import Link from 'next/link'

const Tool = () => {
  return(
    <div className="mt-28">
      <Head>
        <title>B.T.W | Tool</title>
        <meta name="discription" content="provide some tools"></meta>
      </Head>
      <section className="text-center mb-12">
        <p className="text-8xl font-bold underline decoration-4">TOOL</p>
        <p className="text-xl italic pt-4">
          I made some tools such as TodoList<br/>
          I will continue to create tools!!
        </p>
      </section>
      <div className='flex justify-center flex-wrap w-2/3 h-28 m-auto'>
        <li className='text-2xl m-auto underline hover:no-underline'><Link href='tool/todolist'>TodoList</Link></li>
        <li className='text-2xl m-auto underline hover:no-underline'><Link href='tool/whiteboard'>WhiteBoard</Link></li>
        <li className='text-2xl m-auto underline hover:no-underline'><Link href='tool/bulletinboard'>BulletinBoard</Link></li>
      </div>
    </div>
  )
}
export default Tool