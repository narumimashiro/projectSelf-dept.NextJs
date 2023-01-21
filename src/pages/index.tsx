import Head from 'next/head'
import Getmetric from '@/components/layouts/geometric'

export default function Home() {
  return (
    <div>
      <Head>
        <title>B.T.W Next/React</title>
        <meta name="description" content="Bocchi The Work"/>
        <meta name="description" content="NextJs TailwindCSS Sass"/>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="fixed mt-20 w-full h-full">
        <Getmetric/>
      </div>
      <main className="flex flex-col min-h-screen justify-center items-center">
        <h1 className="text-center text-7xl">
          Welcome to My Homepage
        </h1>
        <h2 className="text-3xl pt-4">
          This site is created using
          <span className="ml-2 text-red-600 font-bold">NextJs</span> +
          <span className="ml-2 text-sky-600 font-bold">TypeScript</span>
        </h2>
        <h2 className="text-3xl">
          designed using
          <span className="ml-2 text-sky-300 font-bold">TailwindCSS</span> &
          <span className="ml-2 text-pink-400 font-bold">Sass</span>
        </h2>
      </main>
    </div>
  )
}