import { useState, useEffect } from "react";

function App() {
    const [notes, setNotes] = useState(
        JSON.parse(localStorage.getItem("Notes")) || []
    );
    const saveNotes = () => {
        localStorage.setItem("Notes", JSON.stringify(notes));
    };
    useEffect(() => {
        saveNotes();
    }, [notes]);
    const generateNoteId = () => {
        let uniqueNoteID = Math.random() * 999;
        while (notes.find((note) => note.noteid == uniqueNoteID)) {
            uniqueNoteID = Math.random() * 999;
        }
        return uniqueNoteID;
    };
    const addNewNote = () => {
        setNotes((current) => [
            ...current,
            {
                noteid: generateNoteId(),
                title: "",
                text: "",
                date: new Date().toLocaleDateString("en-US"),
                hue: "hue-rotate(" + Math.random() * 360 + "deg)",
            },
        ]);
    };
    const deleteNote = (noteidtoremove) => {
        setNotes(notes.filter((note) => note.noteid != noteidtoremove));
    };
    const updateTitle = (noteid, e) => {
        notes.find((note) => note.noteid == noteid).title =
            e.target.textContent;
        saveNotes();
    };
    const updateContent = (noteid, e) => {
        // window.onkeydown = (k) => {
        //     k.keyCode == 13 ? k.preventDefault() : null;
        // };
        notes.find((note) => note.noteid == noteid).text = e.target.innerHTML;
        saveNotes();
    };

    const Card = (props) => {
        return (
            <div
                className={props.noteid + " card"}
                style={{
                    filter: props.hue,
                }}
            >
                <div
                    className=" title"
                    onInput={(e) => {
                        updateTitle(props.noteid, e);
                    }}
                    contentEditable
                >
                    {props.title}
                </div>
                <div
                    className=" content"
                    onInput={(e) => {
                        updateContent(props.noteid, e);
                    }}
                    contentEditable
                    dangerouslySetInnerHTML={{ __html: props.text }}
                ></div>
                <button
                    onClick={() => {
                        deleteNote(props.noteid);
                    }}
                >
                    Delete
                </button>
                <h5>{props.date}</h5>
            </div>
        );
    };

    return (
        <>
            <h1>My Notes</h1>
            <div className="cards" id="noteslist">
                {notes.map((note) => (
                    <Card
                        key={note.noteid}
                        {...note}
                        // title={note.title}
                        // text={note.text}
                        // date={note.date}
                        // noteid={note.noteid}
                    />
                ))}
            </div>
            <button className="addnew" onClick={addNewNote}>
                +
            </button>
        </>
    );
}

export default App;
