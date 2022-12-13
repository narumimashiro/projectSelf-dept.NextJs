export interface ModalStyle {
  width: number,
  height: number,
  fSize: number,
}

export interface ButtonItems {
  btnTitle: string,
  callback: () => void,
}

export type ModalInfo = {
  title: string,
  style?: ModalStyle,
  buttonItems?: Array<ButtonItems>,
}

export interface ModalState {
  isModalOpen: boolean,
  modalInfo: {
    title: string,
    style: ModalStyle
    buttonItems: Array<ButtonItems>
  },
}

// ↓Not using from here↓
export const ModalActionTypes = {
  DISP_MESSAGE: 'DISP_MESSAGE',
  MODAL_SIZE: 'MODAL_SIZE'
}