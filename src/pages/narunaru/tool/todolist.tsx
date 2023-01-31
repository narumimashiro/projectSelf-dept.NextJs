import Head from 'next/head'
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd"
import type { DraggingStyle, NotDraggingStyle, DropResult } from "react-beautiful-dnd"
import { useState } from 'react'
import { useRecoilState } from 'recoil'
import { todoTask, progressTask, doneTask } from '@/recoil/tool/todolist'
import type { Task } from '@/recoil/tool/types'

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
type ListName = 'list1' | 'list2' | 'list3'

// Todo delete
const items = [
  {
    id: "item1",
    content: "item1"
  },
  {
    id: "item2",
    content: "item2"
  },
  {
    id: "item3",
    content: "item3"
  },
  {
    id: "item4",
    content: "item4"
  },
  {
    id: "item5",
    content: "item5"
  },
  {
    id: "item6",
    content: "item6"
  },
  {
    id: "item7",
    content: "item7"
  },
]

const getListStyle = (isDraggingOver: boolean) => ({
  background: isDraggingOver ? "lightblue" : "lightgray",
  width: 250,
  padding: 8,
})

const getItemStyle = (isDragging: boolean, draggableStyle: DraggingStyle | NotDraggingStyle) => ({
  userselect: "none",
  padding: 16,
  margin: "0 0 8 0",
  background: isDragging ? "lightgreen" : "gray",
  ...draggableStyle
})

const reOrder = (list: any, startIndex: number, endIndex: number) => {
  const removed = list.splice(startIndex, 1) // Drag開始の要素番号をリストから削除し、詰める
  list.splice(endIndex, 0, removed[0]) // Drag先のIndexに詰めたものを挿入する
}

const TodoListContainer = () => {
  
  const [todo, setTodoList] = useRecoilState(todoTask)
  const [progress, setProgressList] = useRecoilState(progressTask)
  const [done, setDoneList] = useRecoilState(doneTask)
  const [itemCount, setItemCount] = useState(1)

  const getList = (id: string) => {
    if(id == 'todo') {
      return todo
    } else if(id = 'progress') {
      return progress
    } else if(id = 'done') {
      return done
    }
  }

  const setList = (id: string, list: Array<Task>) => {
    if(id == 'todo') {
      setTodoList(list)
    } else if(id == 'progress') {
      setProgressList(list)
    } else if(id == 'done') {
      setDoneList(list)
    }
  }

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result
    if(!result.destination) {
      // drag先が無いときは何もしない
      return
    }
    if(source.droppableId === destination?.droppableId) {
      const update = reOrder(
        getList(source.droppableId),
        source.index,
        destination.index
      )
      setList(source.droppableId, update)
    } else {
      const result = move(
        getList(source.droppableId),
        getList(destination?.droppableId!),
        source,
        destination
      )
      setList(source.droppableId, result[source.droppableId])
      setList(destination?.droppableId!, result[destination?.droppableId])
    }

    const addItems = (id: string) => {
      setList(
        id,
        getList(id)!.concat(
          {
            id: `item-${itemCount + 1}`,
            text: ''
          }
        )
      )
    }

    const updateItems = (id: string, idx: number, e: any) => {
      const listCopy = getList(id)?.slice()
      listCopy![idx].text = e.target.value
      setList(id, listCopy!)
    }

    const deleteItemFromList = (id: string, idx: number) => {
      const remove = deleteItem(getList(id), idx)
      setList(id, remove)
    }

  }

  return (
    <div className="flex justify-center items-center mt-28">
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div {...provided.droppableProps}
                 ref={provided.innerRef}
                 style={getListStyle(snapshot.isDraggingOver)}>
              {items.map((el, index) => (
                <Draggable key={el.id} draggableId={el.id} index={index}>
                  {(provided, snapshot) => (
                    <div ref={provided.innerRef}
                         {...provided.draggableProps}
                         {...provided.dragHandleProps}
                         style={getItemStyle(snapshot.isDragging, provided.draggableProps.style!)}
                    >
                      {el.content}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
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