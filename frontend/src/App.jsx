import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
//import './App.css'
//import UserContext from './contexts/UserContext.js';
import { getCurrentUser } from './services/user.service.js'
import { login, logout } from "./store/authSlice"
import { Container, Header } from './components/index.js'
//import { Footer } from './components/Footer/Footer.jsx'
import { Outlet } from 'react-router-dom'

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  //const {user} = useContext(UserContext)

  useEffect(() => {
    if(!loading){
      getCurrentUser()
    .then((userData) => {
      console.log('current user in app',userData)
      if (userData) {
        dispatch(login({userData}))
      } else {
        dispatch(logout())
      }
    })
    .finally(() => setLoading(false))
  }
  else{
    setLoading(false)
  }
}, [])
  console.log("App loading",loading)
  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between'>
      <div className='w-full block'>
        <Header />
        <main>
          <Container>
            <Outlet />
          </Container>
        </main>
      </div>
    </div>
  ) : null
}

export default App
