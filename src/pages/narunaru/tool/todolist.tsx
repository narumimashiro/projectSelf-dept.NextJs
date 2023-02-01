import Head from 'next/head'
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd"
import type { DraggingStyle, NotDraggingStyle, DropResult, DraggableLocation } from "react-beautiful-dnd"
import { useState } from 'react'
import { useRecoilState } from 'recoil'
import { todoTask, progressTask, doneTask, countTask } from '@/recoil/tool/todolist'
import type { Task } from '@/recoil/tool/types'
import Styles from '@/styles/pages/ToolTodoList.module.sass'

// タスク進捗状態
// const listName = {
//   list1: 'todo',
//   list2: 'progress',
//   list3: 'done',
// }
const listName = [
  'todo',
  'progress',
  'done',
]

interface Props {
  key: string,
  taskId: string,
  list: Array<Task>,
  onAddItems: (taskId: string) => void
  onUpdateItems: (taskId: string, idx: number, e: any) => void
  onDeleteItemFromList: (taskId: string, idx: number) => void
}
// type ListName = 'list1' | 'list2' | 'list3'


const getListStyle = (isDraggingOver: boolean) => ({
  padding: '1rem',
  margin: '1rem',
  minWidth: '200px',
  height: '70vh',
  background: isDraggingOver ? "lightblue" : "lightgray",
  // textAlign: 'left',
  borderRadius: '0.5rem',
})

const getItemStyle = (isDragging: boolean, draggableStyle: DraggingStyle | NotDraggingStyle) => ({
  display: 'flex',
  // userselect: "none",
  padding: '1rem',
  margin: "0 0 8 0",
  background: isDragging ? "lightgreen" : "gray",
  borderLeft: 'solid 0.5rem #86cecb',
  color: '#c3e5e7',
  ...draggableStyle
})

const reOrder = (list: Array<Task>, startIndex: number, endIndex: number) => {
  const result = list.slice()
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)
  return result
}

const deleteItem = (list: Array<Task>, index: number) => {
  const result = list.slice()
  result.splice(index, 1)
  return result
}

const move = (source: Array<Task>,
              destination: Array<Task>,
              droppableSource: DraggableLocation,
              droppableDestination: DraggableLocation) => {
  const srcClone = source.slice()
  const dstClone = destination.slice()
  const [removed] = srcClone.splice(droppableSource.index, 1)
  dstClone.splice(droppableDestination.index, 0, removed)
  const result: any = {}
  result[droppableSource.droppableId] = srcClone
  result[droppableDestination.droppableId] = dstClone
  return result
}

const ListItem = (props: Props) => {

  return (
    <div className={Styles['To-do-list']}>
      <Droppable droppableId={props.taskId}>
        {(provided, snapshot) => (
          <div {...provided.droppableProps}
               ref={provided.innerRef}
               style={getListStyle(snapshot.isDraggingOver)}
          >
            <h2>{props.taskId}</h2>
            {props.list.map((item, index) => (
              <Draggable key={item.id}
                         draggableId={item.id}
                         index={index}
              >
                {(provided, snapshot) => (
                  <div ref={provided.innerRef}
                       {...provided.draggableProps}
                       {...provided.dragHandleProps}
                       style={getItemStyle(snapshot.isDragging, provided.draggableProps.style!)}
                  >
                    <input type='text'
                           className={Styles['Item-form']}
                           placeholder='Please enter your task'
                           value={item.text}
                           onChange={e => props.onUpdateItems(props.taskId, index, e)}
                    />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
            <button className={Styles['Add-item-btn']}
                    onClick={() => props.onAddItems(props.taskId)}></button>
          </div>
        )}
      </Droppable>
    </div>
  )
}

const TodoListContainer = () => {
  
  const [todo, setTodoList] = useRecoilState(todoTask)
  const [progress, setProgressList] = useRecoilState(progressTask)
  const [done, setDoneList] = useRecoilState(doneTask)
  const [itemCount, setItemCount] = useRecoilState(countTask)

  const getList = (taskId: string) => {
    if('todo' == taskId) {
      return todo
    } else if('progress' == taskId) {
      return progress
    } else if('done' == taskId) {
      return done
    }
  }

  const setList = (taskId: string, list: Array<Task>) => {
    if('todo' == taskId) {
      setTodoList(list)
    } else if('progress' == taskId) {
      setProgressList(list)
    } else if('done' == taskId) {
      setDoneList(list)
    }
  }

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result
    if(!destination) {
      // drag先が無いときは何もしない
      return
    }
    if(source.droppableId === destination.droppableId) {
      const update = reOrder(
        getList(source.droppableId)!,
        source.index,
        destination.index
      )
      setList(source.droppableId, update)
    } else {
      const result = move(
        getList(source.droppableId)!,
        getList(destination.droppableId!)!,
        source,
        destination
      )
      setList(source.droppableId, result[source.droppableId])
      setList(destination.droppableId!, result[destination.droppableId])
    }
  }

  const addItems = (taskId: string) => {
    setList(
      taskId,
      getList(taskId)!.concat(
        {
          id: `${itemCount}`,
          text: ''
        }
      )
    )
    setItemCount(itemCount + 1)
  }

  const updateItems = (taskId: string, idx: number, e: any) => {
    const listCopy = getList(taskId)!.slice()
    listCopy![idx].text = e.target.value
    setList(taskId, listCopy!)
  }

  const deleteItemFromList = (taskId: string, idx: number) => {
    const remove = deleteItem(getList(taskId)!, idx)
    setList(taskId, remove)
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className={Styles['To-do-list-container']}>
        {listName.map(el => (
          <ListItem key={el}
                    taskId={el}
                    list={getList(el)!}
                    onAddItems={addItems}
                    onUpdateItems={updateItems}
                    onDeleteItemFromList={deleteItemFromList}
          />
        ))}
      </div>
    </DragDropContext>
  )
}

const TodoList = () => {
  return (
    <div>
      <Head>
        <title>Tool | Todoリスト</title>
        <meta name="discription" content="todo list can change list order drag and drop"></meta>
      </Head>
      <TodoListContainer/>
    </div>
  )
}
export default TodoList

// https://amateur-engineer.com/react-to-do-app/