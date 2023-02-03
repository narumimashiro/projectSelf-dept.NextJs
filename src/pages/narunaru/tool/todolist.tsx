import Head from 'next/head'
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd"
import type { DraggingStyle, NotDraggingStyle, DropResult, DraggableLocation } from "react-beautiful-dnd"
import { useRecoilState } from 'recoil'
import { todoTask, progressTask, doneTask, countTask } from '@/recoil/tool/todolist'
import type { Task } from '@/recoil/tool/types'
import styles from '@/styles/pages/ToolTodoList.module.sass'
import Sakura from '@/components/ui_components/sakura'

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
  onUpdateItems: (taskId: string, idx: number, e: React.ChangeEvent<HTMLInputElement>) => void
  onDeleteItemFromList: (taskId: string, idx: number) => void
}

const getListStyle = (isDraggingOver: boolean) => ({
  padding: '1rem',
  margin: '1rem',
  minWidth: '200px',
  height: '70vh',
  background: isDraggingOver ? "#a0d8ef" : "#eaf4fc",
  borderRadius: '0.5rem',
})

const getItemStyle = (isDragging: boolean, draggableStyle: DraggingStyle | NotDraggingStyle) => ({
  display: 'flex',
  userselect: "none",
  padding: '1rem',
  margin: "0 0 8 0",
  background: isDragging ? "#86cecb" : "#c3e5e7",
  borderLeft: 'solid 0.5rem #137a7f',
  color: '#373b3e',
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
  const result: {[listName: string]: Array<Task>} = {}
  result[droppableSource.droppableId] = srcClone
  result[droppableDestination.droppableId] = dstClone
  return result
}

const ListItem = (props: Props) => {

  return (
    <div className='flex-1'>
      <header className='text-3xl italic text-center font-bold'>{props.taskId}</header>
      <Droppable droppableId={props.taskId}>
        {(provided, snapshot) => (
          <div {...provided.droppableProps}
               ref={provided.innerRef}
               style={getListStyle(snapshot.isDraggingOver)}
          >
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
                           className={styles['item-form']}
                           placeholder='Please enter your task'
                           value={item.text}
                           onChange={e => props.onUpdateItems(props.taskId, index, e)}
                    />
                    <button className={styles['delete-item-btn']}
                            onClick={() => props.onDeleteItemFromList(props.taskId, index)}
                    />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
            <button className={styles['add-item-btn']}
                    onClick={() => props.onAddItems(props.taskId)}
            />
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
    if(taskId == listName[0] /* todo */) {
      return todo
    } else if(taskId == listName[1] /* progress */) {
      return progress
    } else if(taskId == listName[2] /* done */) {
      return done
    }
  }

  const setList = (taskId: string, list: Array<Task>) => {
    if(taskId == listName[0] /* todo */) {
      setTodoList(list)
    } else if(taskId == listName[1] /* progress */) {
      setProgressList(list)
    } else if(taskId == listName[2] /* done */) {
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

  const updateItems = (taskId: string, idx: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const listClone = getList(taskId)!.slice()
    listClone[idx] = { id: listClone[idx].id,
                       text: e.target.value }
    setList(taskId, listClone)
  }

  const deleteItemFromList = (taskId: string, idx: number) => {
    const remove = deleteItem(getList(taskId)!, idx)
    setList(taskId, remove)
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className='flex flex-wrap mt-28'>
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
        <title>Tool | TodoList</title>
        <meta name="discription" content="todo list can change list order drag and drop"></meta>
      </Head>
      <Sakura/>
      <TodoListContainer/>
    </div>
  )
}
export default TodoList