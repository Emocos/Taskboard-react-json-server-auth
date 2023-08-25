import {useEffect, useRef, useState} from "react";
import './Column.css'
import checked from '../assets/checked.png'
import plus from '../assets/plus.png'

const Columns = ({columnId, columnName, tasks, onRemoveColumn, editMode, addTask, ColumnIndex, onCloseTask}) => {
    const taskName = useRef();
    const [toDos, setToDos] = useState([]);
    const [addTaskMode, setAddTaskMode] = useState(false);

    useEffect(() => {
        setToDos(tasks)
    }, [tasks]);


    return (
        <div className={'column'}>
            <h1>{columnName}</h1>
            {toDos && toDos.map((task, index) =>
                <div key={task.taskId} className={'task_elem'}>
                    <p>{task.taskName}</p>
                    <button onClick={() => onCloseTask(ColumnIndex, task.taskId, index)}><img src={checked}/></button>
                </div>
            )}
            <hr/>
            {addTaskMode ?
                <form action="" onSubmit={() => addTask(event, ColumnIndex, taskName, setAddTaskMode(false))} className={'task_form'}>
                    <input type="text" ref={taskName}/>
                    <button><img src={plus} className={'pls_btn_img'}/></button>
                </form>
                :
                <button onClick={() => setAddTaskMode(true)}><img src={plus} className={'pls_btn_img'}/></button>
            }

            {editMode && <button onClick={() => onRemoveColumn(columnId)}>Delete</button>}
        </div>
    );
};

export default Columns;