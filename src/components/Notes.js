import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from '../context/notes/NoteContext'
import NoteItem from './NoteItem'
import AddNote from './AddNote'
import { useNavigate } from 'react-router-dom'



const Notes=(props)=> {
    const navigate=useNavigate()
    const context = useContext(noteContext)
    const { notes, getNote,editNote } = context

    useEffect(() => {
        if(localStorage.getItem('token')){
            getNote()
        }
        else{
            navigate('/login')
        }

    }, [])
    const [note, setNote] = useState({ etitle: "", edescriptionription: "", etag: "default" })

    const handleClick = (e) => {
        e.preventDefault()
        editNote(note.id,note.etitle,note.edescription,note.etag)
        refClose.current.click()
        props.showAlert("Updated successfully","success")



    }

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    const updateNote = (currentNote) => {
        ref.current.click()
        setNote({ id:currentNote._id,etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag })
       
    }
    const ref = useRef(null)
    const refClose = useRef(null)


    return (
        <>
            <AddNote showAlert={props.showAlert}/>
            <button type="button" className="btn btn-primary d-none" ref={ref} data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit note</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="etitle" className="form-label">Title</label>
                                    <input type="text" onChange={onChange} className="form-control" value={note.etitle} id="etitle" name="etitle" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="edescription" className="form-label">Description</label>
                                    <input type="text" onChange={onChange} className="form-control" value={note.edescription} id="edescription" name="edescription" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="etag" className="form-label">Tag</label>
                                    <input type="text" onChange={onChange} className="form-control" value={note.etag} id="etag" name="etag" />
                                </div>
                                <div className="modal-footer">
                                    <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <button type="button" disabled={note.etitle.length<5 || note.edescription.length<5} onClick={handleClick} className="btn btn-primary">Update Note</button>
                                </div>
                            </form>
                        </div>

                    </div>
                </div>
            </div>
            <div className='row my-3'>
                <h1>Your Notes</h1>
                <div className="container mx-2">
                    {notes.length==0 && "No notes to display"}
                </div>
                {notes.map((notes) => {
                    return <NoteItem showAlert={props.showAlert} key={notes._id} updateNote={updateNote} note={notes} />
                })}
            </div>
        </>
    )
}

export default Notes
