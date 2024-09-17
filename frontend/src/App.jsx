//import React from 'react'
//import './App.css'
import {BrowserRouter,Routes,Route, Navigate} from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import NotFound from "./pages/NotFound"
import Home from "./pages/Home"
import ProtectedRoute from "./components/ProtectedRoutes"


function Logout(){
  localStorage.clear()
  return <Navigate to = "/login"/>
}
// ked sa budem chceiť registorvať nemožem nahavať stary token vstorage 
function RegisterAndLogout(){
  localStorage.clear()
  return <Register/>
}

function App() {


  return (
    <BrowserRouter>
        <Routes>
          <Route 
          path='/'
          element={
            // nepusti ma pokial nemam validny acces token pretože home je pre ludi ktory su prihlaseny 
            <ProtectedRoute>
              <Home/>
            </ProtectedRoute>
          }/>
          
          <Route 
          path='/login' 
          element= {// tu nemusim ochranovať cestu tokenom nakolko nieje dovod 
          <Login/>
          }/>
          <Route path='/Logout' element= {<Logout/>}/>
          <Route path='/register' element= {<RegisterAndLogout/>}/>
          <Route path='*' element= {<NotFound/>}/>
        </Routes>
    </BrowserRouter>
  )
}

export default App
