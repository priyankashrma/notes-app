const chalk = require("chalk");
const fs = require("fs");

const listNotes = () => {
  const notes = loadNotes();
  console.log(chalk.green("Your notes"));

  notes.forEach((note) => console.log(note.title));
  return notes;
};

const addNote = (title, body) => {
  const notes = loadNotes();
  // const duplicateNotes = notes.filter((item) => item.title === title);
  const duplicateNote = notes.find((item) => item.title === title);
  if (!duplicateNote) {
    notes.push({ title: title, body: body });
    saveNotes(notes);
    console.log(chalk.green("note added"));
  } else {
    console.log(chalk.red("note already exist"));
  }
};

const removeNote = (title) => {
  const notes = loadNotes();
  const notesAfterRemoval = notes.filter((item) => item.title !== title);
  if (notesAfterRemoval.length === notes.length) {
    console.log(chalk.red("No node found"));
  } else {
    console.log(chalk.green("Node removed"));
    saveNotes(notesAfterRemoval);
  }
};

const readNote = (title) => {
  const notes = loadNotes();
  const hasNote = notes.find((item) => item.title === title);
  if (hasNote) {
    console.log(chalk.green(hasNote.title));
    console.log(hasNote.body);
  } else {
    console.log(chalk.red("Note does not exist"));
  }
};

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync("notes.json");
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    return [];
  }
};

const saveNotes = (notes) => {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync("notes.json", dataJSON);
};

module.exports = { addNote, removeNote, listNotes, readNote };
