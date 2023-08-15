import './App.css'
import axios from "axios";
import {useEffect, useRef, useState} from "react";

function App() {

    const name = useRef();
    const bDate = useRef();
    const image = useRef();

    const [data, setData] = useState();

    useEffect(() => {
        axios
            .get(`http://localhost:3001/users`)
            .then(({data}) => {
                setData(data)
            })
    }, []);

    const submit = () => {
        const file = image.current.files[0]
        const reader = new FileReader();
        reader.readAsDataURL(file)

        reader.onload = () => {
            const data = {
                id: Date.now(),
                name: name.current.value,
                bDate: bDate.current.value.toLocaleString(),
                imageUrl: reader.result
            }
            axios
                .post(`http://localhost:3001/users`, data)
        }
    }

    const deleteByName = (id) => {
        axios
            .delete(`http://localhost:3001/users/${id}`)
        axios
            .get(`http://localhost:3001/users/`)
            .then(({response}) => {
                setData(response)
            })
    }

    return (
        <>
            <form action="" onSubmit={submit}>
                <input type="text" ref={name}/>
                <input type="date" ref={bDate}/>
                <input type="file" ref={image}/>
                <button>Submit</button>
            </form>
            <div>
                {
                    data?.map((item) =>
                        <div key={item.id}>
                            {item.name} <br/>
                            {item.bDate} <br/>
                            <img src={item.imageUrl} alt=""/>
                            <button onClick={() => deleteByName(item.id)}>Delete</button>
                        </div>
                    )
                }
            </div>
        </>
    )
}

export default App
