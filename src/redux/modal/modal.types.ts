export interface ModalStyle {
  width: number,
  height: number,
}

export interface ModalState {
  disp_message: string,
  modal_style: {
    width: number,
    height: number,
  },
}

export const ModalActionTypes = {
  DISP_MESSAGE: 'DISP_MESSAGE',
  MODAL_SIZE: 'MODAL_SIZE'
}