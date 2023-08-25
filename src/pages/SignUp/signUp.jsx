import {useRef, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import './signUpPage.css'


const SignUp = () => {
    const login = useRef();
    const password = useRef();
    const repPassword = useRef();
    const navigate = useNavigate()
    const [onLoginError, setOnLoginError] = useState(false);
    const [onPasswordError, setOnPasswordError] = useState(false);
    const [onEmptyFieldsError, setOnEmptyFieldsError] = useState(false);

    const onSubmitSignUp = (e) => {
        e.preventDefault()
        setOnLoginError(false)
        setOnPasswordError(false)
        setOnEmptyFieldsError(false)
        const id = Date.now()
        if (login.current.value.length && password.current.value.length) {
            if (password.current.value === repPassword.current.value) {
                const newUser = {
                    id: id,
                    login: login.current.value,
                    password: password.current.value
                }
                const userTodo = {
                    id: id,
                    name: login.current.value,
                    columns: []
                }
                axios
                    .get(`http://localhost:3001/users?login=${login.current.value}`)
                    .then(({data}) => {
                        if (!data.length) {
                            axios
                                .post(`http://localhost:3001/users`, newUser)
                            axios
                                .post(`http://localhost:3001/todos`, userTodo)
                                .finally(() => {
                                    navigate(`/`)
                                })
                        } else setOnLoginError(true)
                    })

            } else setOnPasswordError(true)
        } else setOnEmptyFieldsError(true)
    }


    return (
        <div className={'signUpPage'}>
            <div className="sign-up__wrapper">
                <h1>Sign Up</h1>
                <form action="" onSubmit={onSubmitSignUp} className={'signUpForm'}>
                    {onLoginError && <p className={'error'}>Login is already in use*</p>}
                    {onPasswordError && <p className={'error'}>Your new password and confirmation <br/> password do not match*</p>}
                    {onEmptyFieldsError && <p className={'error'}>Please fill all the fields*</p>}
                    <input type="text" ref={login} placeholder={'Login'}/>
                    <input type="password" ref={password} placeholder={'Password'}/>
                    <input type="password" ref={repPassword} placeholder={'Confirm password'}/>
                    <button>Sign Up</button>
                </form>
            </div>
        </div>
    );
};

export default SignUp;