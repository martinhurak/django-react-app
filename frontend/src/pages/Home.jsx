import { useState ,useEffect} from "react"
import api from "../api"
import "../styles/Home.css"
import Note from "../components/Note";
Note

function Home() {
    const [notes,setNotes] = useState([]);
    const [title,setTitle] = useState("")
    const [content,setContent] = useState("");

    useEffect(()=>{
        getNotes()
    },[])

    // ziskavam data 
    
    const getNotes = () =>{
        // on pisal api // to todo nam v zaklade možem to potom zmeniť na premennu 
        api.get("/todo_app/notes/")
        .then((res)=> res.data)
        .then((data)=>{setNotes(data);console.log(data)}) // zobrazim v konzole 
        .catch((err)=>alert(err))
    }

    const deleteNote = (id) =>{
        api.delete(`/todo_app/notes/delete/${id}`).then((res)=>{
            if (res.status === 204){ // 204 uspešne vymazany 
                alert("note deleted!")
            }
            else {
                alert("failed to delete note ")
            }
            getNotes() // nanovo ziskavam poznamky 
        }).catch((error)=>alert(error))
        
    }

    const createNote =(event)=>{
        event.preventDefault()
        api.post("todo_app/notes/",{content,title}).then((res)=>{
            if (res.status === 201) alert("note was created!") // 201 vytvorene
            else alert("falied to create note")
            getNotes() // ziskavam na novo 
        }).catch((err)=>{alert(err)})
        
    }
    
    // zle napisane id 
    return (
        <div> 
            <div>
                <h2>Notes</h2>
                {notes.map((note)=>(
                    <Note note = {note} onDelete={deleteNote} key={note.id}/>
                ))}
            </div>
            <h2>create note</h2>
            <form onSubmit={createNote}>
                <label htmlFor="title">Title:</label> 
                <br/>
                <input 
                    type="text" 
                    id="title" 
                    name="title" 
                    required 
                    onChange={(e)=> setTitle(e.target.value)}
                    value = {title}/> 
                    <label htmlFor="content">Content:</label> 
                    <br/>
                    <textarea 
                        name="content" 
                        id="content" 
                        required 
                        value={content} 
                        onChange={(e)=>setContent(e.target.value)}>
                    </textarea>
                    <br/>
                    <input type="submit" value="Submit"></input>
                        
            </form>
        </div>
    )
}

export default Home