import { useSelector, useDispatch} from 'react-redux'
import { RootState } from '@/redux/store'
import { modalReducer } from '@/redux/modal/modal.reducer'
import { Transition } from 'react-transition-group'
import styles from './Modal.module.sass'

const Modal = () => {
  const isModalOpen = useSelector((state: RootState) => state.modal.isModalOpen)
  const dispatch = useDispatch()
  
  const closeModal = () => {
    dispatch(modalReducer.closeModal())
  }

  if (isModalOpen) {
    return (
      <div className={styles.TransitionStyle}>
        {/* <Transition
          className={styles.modal}
          timeout={700}
          unmountOnExit> */}
          <div className={styles['modal-overlay']} onClick={closeModal}>
            <div className={styles['modal-window']}
                 onClick={(event) => event.stopPropagation()}>
              <header>This is modal window</header>
              <div>use this area message board</div>
              <footer>ok or close button</footer>
            </div>
          </div>
        {/* </Transition> */}
      </div>
    )
  } else {
    return null
  }
}
export default Modal