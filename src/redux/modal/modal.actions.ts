import * as ModalTypes from './modal.types'

export const dispMessage = (text: string) => {
  return ({
    type: ModalTypes.ModalActionTypes.DISP_MESSAGE,
    payload: {
      text,
    },
  })
}

export const modalWinSize = (style: ModalTypes.ModalStyle) => {
  return ({
    type: ModalTypes.ModalActionTypes.MODAL_SIZE,
    payload: {
      ...style,
    },
  })
}