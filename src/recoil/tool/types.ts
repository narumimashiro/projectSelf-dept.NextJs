export interface Task {
  id: string,
  text: string
}

export type UID = {
  uid: string
}

export type CommentData = {
  user: string,
  date: string,
  comment: string
}