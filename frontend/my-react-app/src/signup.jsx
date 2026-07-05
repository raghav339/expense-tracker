import {useState} from 'react';
import { useNavigate } from "react-router-dom";


export default function Signup()
{
    const [username,setUsername]=useState("");
    const [password,setPassword]=useState("");
    const[message,setMessage]=useState("");
    const navigate = useNavigate();

    async function submit()
    {
        const res=await fetch("http://localhost:3000/signup",{
            method:"POST",
            credentials:"include",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                username:username,
                password:password
            })
        })

        const content=await res.json();
        setMessage(content.message);
    }

    return(
        <>
            <h1 style={{textAlign:"center"}}>Sign Up</h1>
            <div style={{display:"flex",flexDirection:"column",alignItems: "center",gap:"10px"}}>
                <h2 style={{ margin: "5px 0" }} >
                    Username : <input style={{width:"200px"}} placeholder="Enter Username" value={username} onChange={(e)=>setUsername(e.target.value)} />
                </h2>
                <h2 style={{ margin: "5px 0" }}>
                    Password : <input style={{width:"200px"}} placeholder="Enter Password" type="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                </h2>
                <button onClick={submit} style={{width:"100px"}}>Submit</button>
                <p>{message}</p>
                {message === "SAVED!" && (
                    <button onClick={() => navigate("/signin")}>
                        Sign In
                    </button>
                )}

            </div>
        </>
    )
}