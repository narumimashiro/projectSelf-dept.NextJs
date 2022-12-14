import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@/redux/store'
import { modalReducer } from '@/redux/modal/modal.reducer'
import { CSSTransition } from 'react-transition-group'
import styles from './Modal.module.sass'
import { ButtonItems } from '@/redux/modal/modal.types'

// *** How to use Modal Window ************************** //
//
// const openModal = () => {
//   const modalInfo = {
//     title: 'This is sample modal',
//     style: { //default // other recommended styles
//       width: 390,      // 600, 900
//       height: 260,     // 400, 600
//       fSize: 25,       // 35,  50
//     },
//     buttonItems:[{
//       btnTitle: 'OK',
//       callback: () => clickOk(),
//     }]
//   }
//   dispatch(modalReducer.openModal(modalInfo))
// }
//
// ****************************************************** //

interface Props {
  btnItems: Array<ButtonItems>
}
function ExecButton(props: Props) {
  const execButton = props.btnItems.map((el) =>
    <li key={el.btnTitle}
        onClick={ el.callback }
    >
      <span>{ el.btnTitle }</span>
    </li>
  )

  return (
    <>{ execButton }</>
  );
}

const Modal = () => {
  const isModalOpen = useSelector((state: RootState) => state.modal.isModalOpen)
  const modalInfo = useSelector((state: RootState) => state.modal.modalInfo)
  const dispatch = useDispatch()
  
  const closeModal = () => {
    dispatch(modalReducer.closeModal())
  }

  return (
    <CSSTransition
      in={ isModalOpen }
      timeout={390}
      unmountOnExit
      classNames={{
        enter:       styles['modal-enter'],
        enterActive: styles['modal-enter-active'],
        enterDone:   styles['modal-enter-done'],
        exit:        styles['modal-exit'],
        exitActive:  styles['modal-exit-active']
      }}>
      <div>
        <div className={styles['modal-overlay']} onClick={ closeModal }>
          <div style={{width: modalInfo.style.width + 'px', 
                       height: modalInfo.style.height + 'px',}}
               onClick={(event) => event.stopPropagation()}>
              <div className={styles['modal-content']}>
                <header>
                  <span style={{fontSize: modalInfo.style.fSize + 'px'}}>
                    { modalInfo.title }
                  </span>
                </header>
                <div>use this area message board</div>
                <footer>
                  <ExecButton
                    btnItems={ modalInfo.buttonItems } />
                  <li onClick={ closeModal }>
                    <span>Close</span>
                  </li>
                </footer>
              </div>
          </div>
        </div>
      </div>
    </CSSTransition>
  )
}
export default Modal