import Head from 'next/head'
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd"
import type { DraggingStyle, NotDraggingStyle, DropResult } from "react-beautiful-dnd"
import { useState } from 'react'

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

const TodoList = () => {

  const [itemList, setItemList] = useState(items)

  const onDragEnd = (result: DropResult) => {
    if(!result.destination) {
      // drag先が無いときは何もしない
      return
    }
    const iitem = itemList
    const deleteItem = iitem.splice(result.source.index, 1)
    iitem.splice(result.destination.index, 0, deleteItem[0])
    setItemList(iitem)
    // reOrder(items, result.source.index, result.destination.index)
  }

  return (
    <div>
      <Head>
        <title>Tool | Todoリスト</title>
        <meta name="discription" content="todo list can change list order drag and drop"></meta>
      </Head>
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
    </div>
  )
}
export default TodoList