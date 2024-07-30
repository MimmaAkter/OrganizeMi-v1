import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
//import './App.css'
//import UserContext from './contexts/UserContext.js';
import { getCurrentUser } from './services/user.service.js'
import { login, logout } from "./store/authSlice"
import { Container, Header, Navbar2, Nav, Footer, NewHeader,FlyoutMenu } from './components/index.js'
//import { Footer } from './components/Footer/Footer.jsx'
import { Outlet } from 'react-router-dom'

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()
  const isLoggedIn = window.localStorage.getItem('isLoggedIn')
  //const {user} = useContext(UserContext)

  useEffect(() => {
    if(isLoggedIn){
      getCurrentUser().then((userData) => {
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
  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between'>
      <div className='w-full block'>
        <FlyoutMenu />
        <main>
          <Container>
            <Outlet />
          </Container>
        </main>
        <Footer/>
      </div>
    </div>
  ) : null
}

export default App
