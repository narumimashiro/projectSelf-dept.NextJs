import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@/redux/store'
import { modalReducer } from '@/redux/modal/modal.reducer'
import { CSSTransition } from 'react-transition-group'
import styles from '@/styles/components/Modal.module.sass'
import { ButtonItems } from '@/redux/modal/modal.types'

// ViewComponent
import ComingSoon from './comingsoon'

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
//     }],
//     component: 'commingsoon',
//   }
//   dispatch(modalReducer.openModal(modalInfo))
// }
//
// ****************************************************** //

interface CompProps {
  childComp: string
}

function ViewComponent(props: CompProps) {

  switch(props.childComp) {
  case 'commingsoon':
    return <ComingSoon/>
  default:
    console.log('Error, not found component')
    return <></>
  }
}

interface BtnProps {
  btnItems: Array<ButtonItems>,
  btnFont: number,
}
function ExecButton(props: BtnProps) {
  const execButton = props.btnItems.map((el) =>
    <li key={el.btnTitle}
        className="inline ml-3 list-none"
        onClick={el.callback}
    >
      <span style={{fontSize: props.btnFont / 2 + 'px'}}>
        {el.btnTitle}
      </span>
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
      in={isModalOpen}
      timeout={390}
      unmountOnExit
      styles={{zIndex: 20}}
      classNames={{
        enter:       styles['modal-enter'],
        enterActive: styles['modal-enter-active'],
        enterDone:   styles['modal-enter-done'],
        exit:        styles['modal-exit'],
        exitActive:  styles['modal-exit-active']
      }}>
      <div>
        <div className={styles['modal-overlay']} onClick={closeModal}>
          <div style={{width: modalInfo.style.width + 'px', 
                       height: modalInfo.style.height + 'px',}}
               onClick={(event) => event.stopPropagation()}>
              <div className={styles['modal-content']}>
                <header className="flex h-1/6 justify-center">
                  <span className="font-bold"
                        style={{fontSize: modalInfo.style.fSize + 'px'}}>
                    {modalInfo.title}
                  </span>
                </header>
                <div className="h-2/3">
                  <ViewComponent
                    childComp={modalInfo.component} />
                </div>
                <footer className="flex h-1/6 items-center justify-end pr-8">
                  <ExecButton
                    btnItems={modalInfo.buttonItems}
                    btnFont={modalInfo.style.fSize} />
                  <li className="inline ml-3 list-none"
                      onClick={closeModal}>
                    <span className="font-bold hover:underline"
                          style={{fontSize: modalInfo.style.fSize / 2 + 'px'}}>Close</span>
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