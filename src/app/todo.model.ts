export interface Todo {
  _id: string;
  title: string;
  description: string;
  status: string;
}

export enum TodoState {
  OPEN = 'open',
  DONE = 'done'
}
