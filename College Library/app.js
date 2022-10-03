console.log("welcome to Library")

let addBtn = document.getElementById("addBtn");

function Book(name, author, type){
    this.name = name;
    this.author = author;
    this.type = type;
}

function Display(){

}

Display.prototype.show = function(){
    let books = localStorage.getItem("library");
    if(books == null){
        libraryObj = [];
    }else{
        libraryObj = JSON.parse(books);
    }
    let uiString = "";

    libraryObj.forEach((element, index) => {
        uiString += `
                    <tr>
                        <th scope="row">${index + 1}</th>
                        <td>${element.name}</td>
                        <td>${element.author}</td>
                        <td>${element.type}</td>
                    </tr>
                    `
    });
    let tableBody = document.getElementById("tableBody");
    tableBody.innerHTML = uiString;
}

Display.prototype.clear = () => {
    let addBtn = document.getElementById("libraryForm");
    addBtn.reset();
}

Display.prototype.message = function(type, showMessage){
    let message = document.getElementById('message');
    message.innerHTML = `
                        <div class="alert alert-${type} alert-dismissible fade show" role="alert">
                        <strong>Message!</strong> ${showMessage}
                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>`

    setTimeout(() => {
        message.innerHTML = '';
    }, 3000);
}

Display.prototype.add = (book) => {
    let books = localStorage.getItem('library');
    if(books == null){
        libraryObj = [];
    }else{
        libraryObj = JSON.parse(books);
    }

    libraryObj.push(book);
    localStorage.setItem('library', JSON.stringify(libraryObj));
}
let display = new Display();
display.show();


let libraryForm = document.getElementById("libraryForm");
libraryForm.addEventListener('submit', libraryFormSubmit);

function libraryFormSubmit(e){
    // e.preventDefault();

    // console.log("Clicked submited button");

    let inputName = document.getElementById('inputName').value;
    let inputAuthor = document.getElementById('inputAuthor').value;
    
    let fiction = document.getElementById('fiction');
    let programming = document.getElementById('programming');
    let cooking = document.getElementById('cooking');

    let type;

    if(fiction.checked){
        type = fiction.value;
    }else if(programming.checked){
        type = programming.value;
    }else if(cooking.checked){
        type = cooking.value;
    }

    

    let display = new Display();

    if(inputName.length >= 3 && inputAuthor.length >= 3){

        inputName = inputName[0].toUpperCase() + inputName.slice(1);
        inputAuthor = inputAuthor[0].toUpperCase() + inputAuthor.slice(1);

        let newBook = new Book(inputName, inputAuthor, type);

        display.add(newBook);
        display.clear();
        display.message('success', "Book successfully added.");
            
    }else{
        // console.log("condition false");
        display.message('danger', 'Please enter proper "Book Name" or "Author Name".');
    }
    
    display.show();
    

    e.preventDefault();
}

// let search = document.getElementById('inputSearch');

// search.addEventListener('input', searchFromLibrary);

// function searchFromLibrary(){
//     console.log("inside Search");
//     let inputVal = search.value;
//     let tableRow = document.getElementsByTagName('tr');
//     Array.from(tableRow).slice(1).forEach((element) => {
//         let name = element.getElementsByTagName("td")[0].innerText;
//         // let author = element.getElementsByTagName("td")[1].innerText;
//         // let type = element.getElementsByTagName("td")[2].innerText;
//         // if(name.includes(inputVal) || author.includes(inputVal) || type.includes(inputVal)){
//         if(name.includes(inputVal)){
//             // document.getElementsByTagName('tr')[0];
//             element.style.display = '';
//         }else{
//             element.style.display = 'none';
//         }
//     })
// }