import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/NoteContext'


function AddNote(props) {
    const context=useContext(noteContext)
    const {addNote}=context

    const [note, setNote] = useState({title:"",description:"",tag:"default"})

    const handleClick=(e)=>{
        e.preventDefault()
        addNote(note.title,note.description,note.tag)
        setNote({title:"",description:"",tag:"" })
        props.showAlert("Note added sucessfully","success")

    }

    const onChange=(e)=>{
        setNote({...note,[e.target.name]:e.target.value})
    }

  return (
    <div>
      <h1>Add Notes</h1>
        <form>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input type="text" onChange={onChange} className="form-control" value={note.title} id="title" name="title"  />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <input type="text" onChange={onChange} className="form-control" value={note.description} id="description" name="description" />
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label">Tag</label>
            <input type="text" onChange={onChange} className="form-control" value={note.tag} id="tag" name="tag" />
          </div>
          <button disabled={note.title.length<5 || note.description.length<5} type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
        </form>
    </div>
  )
}

export default AddNote
