import {useParams} from "react-router";
import {useEffect, useRef, useState} from "react";
import axios from "axios";
import {Box, Modal, Typography} from "@mui/material";
import Columns from "../../components/Columns.jsx";
import './dashboard.css'


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '1px solid #000',
    boxShadow: 24,
    p: 4,
};

const Dashboard = () => {
    const params = useParams()
    const [columnsData, setColumnsData] = useState({});
    const [open, setOpen] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const columnName = useRef()

    const handleEdit = () => setEditMode(true)
    const handleSaveEdit = () => setEditMode(false)
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const getData = () => {
        axios
            .get(`http://localhost:3001/todos?id=${params.id}`)
            .then(({data}) => {
                setColumnsData(data[0])
            })
    }

    useEffect(() => {
        getData()
    }, []);

    const onSbmtColumn = (e) => {
        e.preventDefault()
        const columnId = Date.now()
        const columns = columnsData
        const column = {
            columnId: columnId,
            columnName: columnName.current.value,
            tasks: []
        }
        if (column.columnName) {
            columns.columns.push(column)
            axios
                .put(`http://localhost:3001/todos/${params.id}`, columns)
            getData()
            handleClose()
        } else alert('Please fill Column Name field!')
    }

    const onRemoveColumn = (columnId) => {
        setColumnsData({...columnsData, columns: columnsData.columns.filter((column) => column.columnId !== columnId)})
    }

    const onCloseTask = (columnIndex, taskId, taskIndex) => {
        let tempColumns = columnsData
        tempColumns.columns[columnIndex].tasks.splice(taskIndex, 1)
        axios
            .put(`http://localhost:3001/todos/${params.id}`, tempColumns)
        getData()
    }

    const addTask = (event, index, taskName) => {
        event.preventDefault()
        const columns = columnsData
        if (taskName.current.value) {
            columns.columns[index].tasks.push({taskId: Date.now(), taskName: taskName.current.value})
            axios
                .put(`http://localhost:3001/todos/${params.id}`, columns)
                .then(() => {
                    taskName.current.value = ''
                })
            getData()
        } else alert('Please fill Task name field!')
    }

    const onEdit = () => {
        axios
            .put(`http://localhost:3001/todos/${params.id}`, columnsData)
            .finally(() => handleSaveEdit())
    }

    return (
        <div className={'dashboard'}>
            <header>
                <h2>{columnsData.name}'s Dashboard</h2>
                <button onClick={handleOpen} className={'crtBtn'}>Create new Column</button>
            </header>


            <section>
                <div className={'editBtn'}>
                    {editMode ? <button onClick={onEdit} className={'dfBtn'}>Save changes</button> : <button onClick={handleEdit} className={'dfBtn'}>Edit</button>}
                </div>

                <div className={'columns'}>
                    {columnsData.columns && columnsData.columns.map((column, index) =>
                        <Columns key={column.columnId}
                                 columnName={column.columnName}
                                 columnId={column.columnId}
                                 tasks={column.tasks}
                                 ColumnIndex={index}
                                 onRemoveColumn={onRemoveColumn}
                                 editMode={editMode}
                                 addTask={addTask}
                                 onCloseTask={onCloseTask}
                        />
                    )}
                </div>
            </section>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        <div className={'new_column'}>
                            <h2>Create new Column</h2>
                            <form action="" onSubmit={onSbmtColumn} className={'new_column_form'}>
                                <input type="text" ref={columnName} placeholder={'Column name'}/>
                                <button className={'dfBtn'}>Add Column</button>
                            </form>
                        </div>
                    </Typography>
                </Box>
            </Modal>
        </div>
    );
};

export default Dashboard;