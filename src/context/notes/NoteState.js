import React, { useState } from 'react';
import NoteContext from './NoteContext';



const NoteState = (props) => {
    const host = "http://localhost:5000"
    const notesIntial =  []
    const [notes, setNotes] = useState(notesIntial)

    //get All notes
    const getNote = async() => {
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token':  localStorage.getItem('token') 
            },
        })
        const json=await response.json()
        setNotes(json)

    }

    //Add notes
    const addNote = async (title, description, tag) => {
        const response = await fetch(`${host}/api/notes/addnotes`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')            },
            body: JSON.stringify({ title, description, tag })
        })
        const json = await response.json()
        setNotes(notes.concat(json))
    }


    //Delete notes
    const deleteNote = async(id) => {
        const response = await fetch(`${host}/api/notes/deletenotes/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQzNzk3MjEzMGZiNmUzMmEzMGIyZDQyIn0sImlhdCI6MTY4MTM2NjQyM30.9LPwZb8vaSW9SYuSojLlo3W-UpmNvFqHb61Lx3tPyh0'
            }
        })
        const json = await response.json()
        console.log(json)

        console.log("deleting the node with the id" + id)
        const newNotes = notes.filter((note) => {
            return note._id !== id
        })
        setNotes(newNotes)
    }


    //Edit a note
    const editNote = async (id, title, description, tag) => {
        console.log(title)

        const response = await fetch(`${host}/api/notes//updatenotes/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQzNzk3MjEzMGZiNmUzMmEzMGIyZDQyIn0sImlhdCI6MTY4MTM2NjQyM30.9LPwZb8vaSW9SYuSojLlo3W-UpmNvFqHb61Lx3tPyh0'
            },
            body: JSON.stringify({title,description,tag})
        })
        const json = await response.json()
        let  newNotes=JSON.parse(JSON.stringify(notes))

        for (let index = 0; index < notes.length; index++) {
            const element = notes[index];
            if (element._id === id) {
                newNotes[index].title = title
                newNotes[index].description = description
                newNotes[index].tag = tag
                break;
            }

        }
        setNotes(newNotes)
    }


    return (
        <NoteContext.Provider value={{ notes, setNotes, addNote, deleteNote, editNote,getNote }}>
            {props.children}
        </NoteContext.Provider>
    );
};

export default NoteState;



