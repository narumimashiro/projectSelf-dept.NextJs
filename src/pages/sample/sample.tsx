import Head from 'next/head'
import { useDispatch, useSelector } from 'react-redux'
import { reducers } from '@/redux/sample/sample.reducer'
import { RootState } from '@/redux/store'
import styles from '@/styles/sample/Sample.module.sass'

const Sample = () => {
  const dispatch = useDispatch()
  const message = useSelector((state: RootState) => state.sample.sample_message)
  return (
    <div>
      <Head>
        <title>Sample</title>
      </Head>
      <div className={styles.main}>
        <h1>This is Sample Page</h1>
        <button onClick={() => dispatch(reducers.dispMessage('Button Pushed!!!'))}>
          if you push button, the message below changes
        </button>
        <p>message : { message }</p>
      </div>
    </div>
  )
}
export default Sample