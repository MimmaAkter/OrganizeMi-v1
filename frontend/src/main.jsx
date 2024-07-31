import React from 'react';
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
//import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import HomePage from './pages/HomePage.jsx'
import DisplayPage from './pages/DisplayPage';
//import CreatePage from './pages/CreatePage.jsx'
import AccountPage from './pages/AccountPage.jsx'
import UploadPage from './pages/UploadPage.jsx'
import EditPage from './pages/EditPage';
//import UserEdit2 from './components/User/UserEdit2.jsx'
import UserLogin from './components/User/UserLogin.jsx';
//import UserContextProvider from './contexts/UserContextProvider.jsx'
import { Provider } from 'react-redux';
import store from './store/store.js';
import { AuthLayout, UserList2 } from './components/index.js'
import ForgotPassword from './components/User/ForgotPassword.jsx'
import ResetPassword from './components/User/ResetPassword.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
        {
            path: "/",
            element: <HomePage />,
        },
        {
            path: "/forgot-password",
            element: <ForgotPassword />,
        },
        {
            path: "/reset-password/:resetPassToken",
            element: <ResetPassword/>,
        },
        {
            path: "/Login",
            element: (
                <AuthLayout authentication={false}>
                    <UserLogin />
                </AuthLayout>
            ),
        },
        {
            path: "/Read",
            element: (
                <AuthLayout authentication={false}>
                    <UserList2 />
                </AuthLayout>
            ),
        },
        {
            path: "/password",
            element: (
                <AuthLayout authentication={false}>
                    <AccountPage />
                </AuthLayout>
            ),
        },
        {
            path: "/ReadUser",
            element: (
                <AuthLayout authentication>
                    {" "}
                    <DisplayPage />
                </AuthLayout>
            ),
        },
        {
            path: "/upload",
            element: (
                <AuthLayout authentication>
                    {" "}
                    <UploadPage />
                </AuthLayout>
            ),
        },
        {
            path: "edit/:id",
            element: (
                <AuthLayout authentication>
                    {" "}
                    <EditPage />
                </AuthLayout>
            ),
        },
    ],
},
])




/*
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route path='' element={<HomePage/>}/>
      <Route path='ReadUser' element={<DisplayPage/>} />
      <Route path='CreateUser' element={<CreatePage/>} />
      <Route path='password' element={<AccountPage/>} />
      <Route path='upload' element={<UploadPage/>} />
      <Route path='edit/:id' element={<EditPage/>} />
      <Route path='profile/edit/:id' element={<UserEdit2/>} />
      <Route path ='Login' element={<UserLogin />}></Route>
    </Route>
  )
)
*/

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>
  </React.StrictMode>,
)
