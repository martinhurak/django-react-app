import { useState } from "react";
import api from "../api"
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN , REFRESH_TOKEN} from "../constants";

import "../styles/Form.css"
import LoadingIndicator from "./LoadingIndicator";
// tu mi bude chibať overenie a email 
// zase disablujem props validaciu 
// eslint-disable-next-line react/prop-types
function Form ({route,method}){ // route ciskavam z routera  , methoda je či sa prihasujem alebo registrujem 
    const [userName,setUserName] = useState("")
    const [password,setpassword] = useState("")
    const [loading,setLoading] = useState(false)
    const navigate = useNavigate()
    const name = method === "login"?"Login":"Register"

    const handleSubmit = async (e)=>{
        setLoading(true);
        e.preventDefault();
        // tu chem poslať request 
        try {   ;
            const res = await api.post(route,{username:userName, password:password})
            // ak sa prihlasujem ziskavam s local storage novy token aj acces aj refresh 
            if (method === "login"){
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                localStorage.setItem(REFRESH_TOKEN , res.data.refresh)
                navigate("/") // idem home
            }
            else {
                // ak som prihlaseny nepotrebuje mdalši token inač sa chem registrovať kde ten token ziskam 
                navigate("/login")
            }
        } catch (error) {
            alert(error)
        }// vždy dostanem finaly block ked 
        finally{
            setLoading(false)
        }
    }
    return (
    <form onSubmit={handleSubmit} className="form-container">
        <h1>{name}</h1>
        <input 
            type="text" 
            className="form-input" 
            value={userName}
            onChange={(e)=>setUserName(e.target.value)}
            placeholder="Username"
        />
        <input 
            type="text" 
            className="form-input" 
            value={password}
            onChange={(e)=>setpassword(e.target.value)}
            placeholder="Password"
        />
        {loading && <LoadingIndicator/>}
        <button className="form-button" type="submit">
            {name}
        </button>
    </form>)
}

export default Form