// console.log("Notes App");

showNotes();
let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", addNewNote);

// const notesObj;

function addNewNote() {
  let addHeading = document.getElementById("addHeading");
  let addText = document.getElementById("addText");

  if(addHeading.value.length >= 3 && addText.value.length >= 3){

    // console.log(addText.value);
  
    let notes = localStorage.getItem("notes");
    if (notes == null) {
      notesObj = [];
    } else {
      notesObj = JSON.parse(notes);
    }
  
    notesObj.push([addHeading.value, addText.value]);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    addText.value = "";
    addHeading.value = "";
    // console.log(notesObj);
  }else{
    alert(`Please enter "Note Heading" or "Add Note" properly!`)
  }

  showNotes();
}

function showNotes() {
  let notes = localStorage.getItem("notes");

  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }

  let html = "";

  notesObj.forEach((element, index) => {
    html += ` <div class="noteCard card my-2 mx-2" style="width: 18rem">
                <div class="card-body">
                <h5 class="card-title">${element[0]}</h5>
                <p class="card-text">${element[1]}</p>
                <a id="${index}" onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</a>
                </div>
            </div>`;
  });

  let newNote = document.getElementById("notes");
  if (notesObj.length != 0) {
    newNote.innerHTML = html;
  } else {
    newNote.innerHTML = `Nothing to show! "Add a Note" section above to add note.`;
  }
}

function deleteNote(index) {
    // console.log("inside delete");
    let notes = localStorage.getItem("notes");
    if(notes == null){
        notesObj = [];
    }else{
        notesObj = JSON.parse(notes);
    }

    notesObj.splice(index, 1);
    localStorage.setItem('notes', JSON.stringify(notesObj));
    showNotes();
}

let search = document.getElementById('inputSearch');

search.addEventListener('input', function(){
    // console.log("inside Search");
    let inputVal = search.value.toLowerCase();
    let noteCard = document.getElementsByClassName("noteCard");
    Array.from(noteCard).forEach((element) => {
        let cardHead = element.getElementsByTagName('h5')[0].innerText.toLowerCase();
        let cardTxt = element.getElementsByTagName('p')[0].innerText.toLowerCase();
        if(cardTxt.includes(inputVal) || cardHead.includes(inputVal)){
            element.style.display = "block";
        }else{
            element.style.display = "none";
        }
    })
});
