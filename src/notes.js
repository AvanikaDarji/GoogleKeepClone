"use strict";

export class App {
    constructor() {
        this.notes = JSON.parse(localStorage.getItem('notes')) || [];
        this.title = "";
        this.text = "";
        this.id = "";
        this.color="";
        this.$form = document.querySelector("#form");
        this.$noteTitle = document.querySelector("#note-title");
        this.$noteText = document.querySelector("#note-text");
        this.$formButtons = document.querySelector("#form-buttons");
        this.$notes = document.querySelector("#notes");
        this.$note = document.querySelector(".note");
        this.$formCloseButton = document.querySelector('#form-close-button');
        this.$modal = document.querySelector(".modal");
        this.$modalClose = document.querySelector(".close-modal");
       this.modalColor = document.querySelector(".modal-content").getAttribute("data-bg-color");
      
        this.$modalTitle = document.querySelector(".modal-title");
        this.$modalText = document.querySelector(".modal-text");
        this.$colorTooltip = document.querySelector(".color-tooltip");
        this.$checked = document.querySelector(".switch__input");
        //this.$trash = document.querySelector(".toolbar-trash");
        // this.$toolbarColor = document.querySelector(".toolbar-color");
        this.saveNotes();
        this.displayNotes();
        this.addEventListeners();

    }
    addEventListeners() {
            document.body.addEventListener("click", event => {
                this.handleFormClick(event);
                this.selectNote(event);
                this.openModal(event);
                this.deleteNote(event);
                // this.changeMode(event);
                //  this.closeModal(event);
            });
            this.$form.addEventListener("submit", event => {
                event.preventDefault();
                const title = this.$noteTitle.value;
                const text = this.$noteText.value;
                const hasNote = title || text;
                if (hasNote) {
                    this.addNote({ title, text });
                }
            })
            this.$formCloseButton.addEventListener("click", event => {
                event.stopPropagation();
                this.closeForm();
            })
            this.$modalClose.addEventListener("click", event => {
                this.editNote();
                this.closeModal();
            })
            document.body.addEventListener("mouseover", event => {
                this.openTooltip(event);
            });
            document.body.addEventListener("mouseout", event => {
                this.closeTooltip(event);
            });
            this.$colorTooltip.addEventListener("mouseover", function() {
                this.style.display = "flex";
            });
            this.$colorTooltip.addEventListener("mouseout", function() {
                this.style.display = "none";
            });
            this.$colorTooltip.addEventListener("click", event => {
                const color = event.target.dataset.color;
                if (color) {
                    this.editNoteColor(color);
                }
            });
        }
        /*changeMode(event) {
            var result = (this.$checked).checked;
            //  console.log(result);
            if (result == true) {
                // document.body.style.backgroundImage = 'url(./src/Images/swirl_dark.png)';
                document.body.style.background = "black";
            } else {
                document.body.style.background = "white";
            }
        }*/
    handleFormClick(event) {
        const isFormClicked = this.$form.contains(event.target);
        const title = this.$noteTitle.value;
        const text = this.$noteText.value;
        const hasNote = title || text;
        if (isFormClicked) {
            this.openForm();
        } else if (hasNote) {
            this.addNote({ title, text });
        } else {
            this.closeForm();
        }
    }

    openForm() {
        this.$form.classList.add("form-open");
        this.$noteText.style.display = "block";
        this.$noteTitle.setAttribute("placeholder", "Title");
        this.$formButtons.style.display = "block";
    }

    closeForm() {
        this.$form.classList.remove("form-open");
        this.$noteText.style.display = "none";
        this.$formButtons.style.display = "none";
        this.$noteTitle.setAttribute("placeholder", "Take a note...");
        this.$noteTitle.value = "";
        this.$noteText.value = "";
    }
    openModal(event) {
        if (event.target.matches(".toolbar-trash")) return;
        if (event.target.closest(".note")) {
            this.$modal.classList.toggle("open-modal");
         this.$modal.lastElementChild.style.backgroundColor  =  this.color;
          //   this.$modal.lastChild  =  this.color;
            this.$modalTitle.value = this.title;
            this.$modalText.value = this.text;
        }
    }
    deleteNote() {
        event.stopPropagation();
        if (!event.target.matches(".toolbar-trash")) {
            return;
        }
        const id = event.target.dataset.id;
        this.notes = this.notes.filter((note) => {
            return note.id !== Number(id);
        })
        this.saveNotes();
        this.displayNotes();
    }
    openTooltip(event) {
        //console.log(event.target);
        if (!event.target.matches(".toolbar-color")) return;
        this.id = event.target.dataset.id;
        // this.id = event.target.nextElementSibling.dataset.id;
        const noteCoords = event.target.getBoundingClientRect();
        const horizontal = noteCoords.left + window.scrollX;
        const vertical = noteCoords.top + window.scrollY - 20;
        this.$colorTooltip.style.transform = `translate(${horizontal}px, ${vertical}px)`;
        this.$colorTooltip.style.display = 'flex';
    }
    closeTooltip(event) {
        if (!event.target.matches(".toolbar-color")) return;
        this.$colorTooltip.style.display = "none";
    }

    selectNote(event) {
        const selectedNote = event.target.closest(".note");
        if (!selectedNote) return;
        const [$noteTitle, $noteText] = selectedNote.children;
        this.title = $noteTitle.innerText;
        this.color = selectedNote.style.backgroundColor;
        this.text = $noteText.innerText;
        this.id = selectedNote.dataset.id;
    }
    editNote() {
        this.title = this.$modalTitle.value;
        this.text = this.$modalText.value;
        //console.log(this.notes);
        for (let i = 0; i < this.notes.length; i++) {
            if (this.notes[i].id == this.id) {
                this.notes[i].title = this.title;
                this.notes[i].text = this.text;
                this.saveNotes();
                this.displayNotes();
            }
        }
    }
    editNoteColor(color) {
        this.notes = this.notes.map(note => {

                if (note.id === Number(this.id)) {
                    return {...note, color }

                } else {
                    return note;
                }
            }
            //  note.id === Number(this.id) ? {...note, color } : note
        );
        //  console.log(this.notes);
        this.saveNotes();
        this.displayNotes();
    }
    closeModal() {
        this.$modal.classList.remove("open-modal");
    }

    addNote(note) {
        const newNote = {
            title: note.title,
            text: note.text,
            color: "gray",
            id: this.notes.length > 0 ? this.notes[this.notes.length - 1].id + 1 : 1
        }
        this.notes = [...this.notes, newNote];
        this.saveNotes();
        this.displayNotes();
        this.closeForm();
    }
    saveNotes() {
        localStorage.setItem("notes", JSON.stringify(this.notes));
    }
    displayNotes() {
        this.$notes.innerHTML = this.notes.map(note => `<div style="background: ${note.color};" class="note" data-id="${note.id}">
        <div class="note-title">${note.title}</div>
        <div class="note-text">${note.text}</div>
        <div class="toolbar-container">
            <div class="toolbar" >
            <div class="material-icons toolbar-trash" data-id=${note.id}>delete
            </div>
            <div class="toolbar-color" data-id=${note.id}>
              <span class="material-icons">palette</span>
</div>
            </div>
          </div>
       </div>`).join("");
    }

}
/***when dom is ready to interact */
document.addEventListener("readystatechange", (event) => {
    if (event.target.readyState == "complete") {
        initApp();
    }
})

const initApp = () => {
    new App();
}