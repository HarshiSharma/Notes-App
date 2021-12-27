const fs = require('fs')
const chalk = require('chalk')


const addNote = (title, body) => {
    const notes = loadNotes()
        //const duplicateNotes = notes.filter((note) => note.title === title)
    const duplicateNote = notes.find((note) => note.title === title)

    if (!duplicateNote) {

        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log(chalk.green('New note added!'))
    } else {
        console.log(chalk.red('Title already exist!'))
    }
}

const updateNote = (title, body) => {
    const notes = loadNotes()
    const noteIndex = notes.findIndex((note) => note.title === title)
    if (noteIndex != -1) {
        notes[noteIndex].body = body
        saveNotes(notes)
    } else {
        console.log(chalk.red('Cannot find the note you want to update.'))
    }
}

const readNote = (title) => {
    const notes = loadNotes()
    const selectedNote = notes.find((note) => note.title === title)

    if (selectedNote) {
        console.log(`Title: ${selectedNote.title} \nBody: ${selectedNote.body}`)
    } else {
        console.log(chalk.red('Note not found.'))
    }
}

const removeNote = (title) => {
    const notes = loadNotes()
    const newNotes = notes.filter((note) => note.title != title)
    if (notes.length > newNotes.length) {
        saveNotes(newNotes)
        console.log(chalk.green('Note successfully deleted!'))
    } else {
        console.log(chalk.red('Cannot find the title you want to delete.'))
    }
}

const listNotes = () => {
    const notes = loadNotes()
    console.log(chalk.bgBlue.bold('Your Notes:'))
    notes.forEach(note => {
        console.log(note.title)
    });
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (e) {
        return []
    }

}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}


module.exports = {
    listNotes: listNotes,
    addNote: addNote,
    removeNote: removeNote,
    readNote: readNote,
    updateNote: updateNote
}