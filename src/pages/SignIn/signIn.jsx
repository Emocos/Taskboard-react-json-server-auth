import {useRef, useState} from "react";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import './signInPage.css'

const SignIn = () => {
    const login = useRef();
    const password = useRef();
    const navigate = useNavigate()
    const [onError, setOnError] = useState(false);

    const onErrorOn = () => setOnError(true)

    const submit = (e) => {
        e.preventDefault()
        let userData
        axios
            .get(`http://localhost:3001/users?login=${login.current.value}&password=${password.current.value}`)
            .then(({data}) => {
                userData = data[0]
            })
            .then(() => {
                if (userData) {
                    navigate(`toDoList/${userData.id}`, {replace: true})
                } else onErrorOn()
            })
    }

    return (
        <div className={'signInPage'}>
            <div className="sign-in__wrapper">
                <h1>Sign In</h1>
                <form action="" onSubmit={submit} className={'signInForm'}>
                    {onError && <p className={'error'}>Incorrect login or password*</p>}
                    <input type="text" ref={login} placeholder='Login'/>
                    <input type="password" ref={password} placeholder='Password'/>
                    <button>Sign In</button>
                </form>
                <p>
                    Have not registered yet, <Link to={'signUp'} className={'sign-up_link'}>Sign Up</Link>
                </p>
            </div>
        </div>
    );
};

export default SignIn;