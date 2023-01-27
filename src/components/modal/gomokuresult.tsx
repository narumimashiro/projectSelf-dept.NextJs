import { useRecoilValue } from 'recoil'
import { gomokuData } from '@/recoil/game/gameinfo'
import Connfetti from '@/components/ui_components/confetti'

// 定数定義
const P1 = 1
const P2 = 2

const GomokuResult = () => {

  const gameData = useRecoilValue(gomokuData)
  const winner = gameData.p1IsNext ? P2 : P1

  return (
    <div className="w-full h-full">
      <div className="flex w-full h-full justify-center items-center">
        <p className="text-4xl font-extrabold text-red-500">
          {winner == P1 && 'Player1 Win'}
          {winner == P2 && 'Player2 Win'}
        </p>
      </div>
      <Connfetti/>
    </div>
  )
}
export default GomokuResult