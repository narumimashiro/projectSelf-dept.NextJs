import Link from 'next/link'

interface HeaderInfo {
  readonly gameTitle: string,
  clickToBack: () => void
}

const GameHeader = (props: HeaderInfo) => {
  return (
    <div className='flex w-full h-28 justify-center items-center'>
      <p className='text-6xl font-serif font-bold'>
        {props.gameTitle}
      </p>
      <Link href='/narunaru/game'>
        <p className='absolute text-xl right-28 underline hover:no-underline'
           onClick={props.clickToBack}>
          back to list
        </p>
      </Link>
    </div>
  )
}
export default GameHeader