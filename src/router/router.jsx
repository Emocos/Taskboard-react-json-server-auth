import {createBrowserRouter} from "react-router-dom";
import SignIn from "../pages/SignIn/signIn.jsx";
import App from "../App.jsx";
import SignUp from "../pages/SignUp/signUp.jsx";
import Dashboard from "../pages/ToDoList/dashboard.jsx";

export const router = createBrowserRouter([
    {
        path: '',
        element: <App />
    },
    {
        path: 'signIn',
        element: <SignIn />
    },
    {
        path: 'signUp',
        element: <SignUp />
    },
    {
        path: 'toDoList/:id',
        element: <Dashboard />,
    }
])