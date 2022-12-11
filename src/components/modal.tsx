import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@/redux/store'
import { modalReducer } from '@/redux/modal/modal.reducer'
import { CSSTransition, Transition } from 'react-transition-group'
import styles from './Modal.module.sass'

const Modal = () => {
  const isModalOpen = useSelector((state: RootState) => state.modal.isModalOpen)
  const dispatch = useDispatch()
  
  const closeModal = () => {
    dispatch(modalReducer.closeModal())
  }

  return (
    <CSSTransition
      in={isModalOpen}
      timeout={1000}
      unmountOnExit
      classNames={{
        enter:       styles['modal-enter'],
        enterActive: styles['modal-enter-active'],
        enterDone:   styles['modal-enter-done'],
        exit      :  styles['modal-exit'],
        exitActive:  styles['modal-exit-active']
      }}>
      <div>
        <div className={styles['modal-overlay']} onClick={closeModal}>
          <div className={styles['modal-window']}
               onClick={(event) => event.stopPropagation()}>
              <div className={styles['modal-content']}>
                <header>This is modal window</header>
                <div>use this area message board</div>
                <footer>ok or close button</footer>
              </div>
          </div>
        </div>
      </div>
    </CSSTransition>
  )
}
export default Modal