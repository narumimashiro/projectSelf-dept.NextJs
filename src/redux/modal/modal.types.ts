export interface ModalStyle {
  width: number,
  height: number,
}

export type ModalInfo = {
  title: string,
  style?: {
    width: number,
    height: number,
  }
}

export interface ModalState {
  isModalOpen: boolean,
  modalInfo: {
    title: string,
    style: {
      width: number,
      height: number,
    },
  }
}

// ↓Not using from here↓
export const ModalActionTypes = {
  DISP_MESSAGE: 'DISP_MESSAGE',
  MODAL_SIZE: 'MODAL_SIZE'
}