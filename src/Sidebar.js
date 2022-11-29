//aqui seria a parte lateral onde fica as notas

import React from "react";

export default function Sidebar({
  notes,
  onAddNote,
  onDeleteNote,
  activeNote,
  setActiveNote,
}) {

const sortedNotes = notes.sort((a,b)=> b.lastModified - a.lastModified) /* aqui seria uma logica para o ultimo elemento editado sempre ir para cima */



  return (
    <div className="app-sidebar">
      <div className="app-sidebar-header">
        <h1>Notes</h1>

        <button onClick={onAddNote}>Add</button> {/* toda vez que clicamos nesse botão adicionamos um novo elemento no estado notes */}
      </div>

      <div className="app-sidebar-notes">
        {/*aqui falamos que cada novo elemento adicionado no state notes ira ser exibido na tela com esse esquema tendo um id proprio gerado pelo uuid */}
        {sortedNotes.map((note) => (
<div /* nessa div falamos que quando clicarmos nessa div a mesma ira exibir o id do elemento que veio do state notes e vai jogar esse id dentro do state setActiveNote, depois falamos que se o id da div for igual ao id do state ou seja quando clicarmos ela fica azul */
            className={`app-sidebar-note ${note.id === activeNote && "active"}`}
            onClick={() => setActiveNote(note.id)}
          >
            <div className="sidebar-note-title">
              <strong>{note.title}</strong>
              <button onClick={() => onDeleteNote(note.id)}>Delete</button>
            </div>
            <p>{note.body && note.body.substr(0, 100) + "..."}</p>
            <small className="note-meta">
              Last Modified{" "}
              {/* aqui criamos o horario da ultima vez que ela foi modificada */}
              {new Date(note.lastModified).toLocaleDateString("pt-br", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </small>
          </div>
        ))}
      </div>
    </div>
  );
}
