const validator = require('validator')
const chalk = require('chalk')
const yargs = require('yargs')

const notes = require('./notes.js')


yargs.command({
    command: 'list',
    describe: "List of all Note",
    handler: () => {
        notes.listNotes()
    }
})

yargs.command({
    command: 'add',
    describe: "Adding a Note",
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Note body',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.addNote(argv.title, argv.body)
    }
})

yargs.command({
    command: 'update',
    describe: "Updating a Note body",
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Note body',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.updateNote(argv.title, argv.body)
    }
})



yargs.command({
    command: 'read',
    describe: "Read a particular note",
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.readNote(argv.title)
    }
})
yargs.command({
    command: 'remove',
    describe: "Removing a Note",
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.removeNote(argv.title)
    }
})

yargs.parse()