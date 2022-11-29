import { useEffect, useState } from "react";
import uuid from "react-uuid";
import "./App.css";
import Main from "./Main";
import Sidebar from "./Sidebar";

function App() {
  const [notes, setNotes] = useState(
    localStorage.notes ? JSON.parse(localStorage.notes) : []
  );
  const [activeNote, setActiveNote] = useState(false);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  /* aqui estamos criando um array e adicionando informações a ele estilo hardcode e adicionando essas informaçoes dentro do estado setNotes e automaticamente notes */
  const onAddNote = () => {
    const newNote = {
      title: "Untitled Note",
      id: uuid(),
      body: "",
      lastModified: Date.now(),
    };

    setNotes([newNote, ...notes]);
    setActiveNote(newNote.id);
  };

  /* aqui filtramos o state notes e afirmamos que nenhum id do array dele bate com o id que é passado no botao de deletar que seria o id do elemento gerado, como algum id vai bater retorna false e apaga elemento no qual o botao foi clicado e id exibido */
  const onDeleteNote = (noteId) => {
    setNotes(notes.filter(({ id }) => id !== noteId));
  };

  /* aqui voce vai filtra o notes e afirmar que tem algum elemento la que o id é igual o do state activeNote como vai ter quando retornar true voce passa dos os valores passados no updatedNote la no main depois joga esses valores no state notes */
  const onUpdateNote = (updatedNote) => {
    const updatedNotesArr = notes.map((note) => {
      if (note.id === activeNote) {
        return updatedNote;
      }

      return note;
    });

    setNotes(updatedNotesArr);
  };
/* aqui estamos procurando no state notes e falamos que algum id do state vai ser igual o id do state do activenote que seria quando clicamos em algum elemento exibido na tela, como vai retorna true retorna o objeto o qual o id é igual */
  const getActiveNote = () => {
    return notes.find(({ id }) => id === activeNote);
  };

  return (
    <div className="App">
      <Sidebar
        notes={notes}
        onAddNote={onAddNote}
        onDeleteNote={onDeleteNote}
        activeNote={activeNote}
        setActiveNote={setActiveNote}
      />
      <Main activeNote={getActiveNote()} onUpdateNote={onUpdateNote} />
    </div>
  );
}

export default App;