// Book Class: Representa los libros 
class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;

    }

}


// UI class : Maneja la UI

class UI {

    static displayBooks(){
        const books = Store.getBooks();
      
        books.forEach((book) => UI.addBookToList(book));
    }
    static addBookToList(book) {
        const list = document.querySelector("#book-list")

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><a href="#" class= "btn btn-danger btn-sm delete">X</a></td>
        `;
        list.appendChild(row);
    }

    static deleteBook(el) {
        if(el.classList.contains("delete")){
            el.parentElement.parentElement.remove();
        }
    }


    static showAlert(message, className) {
        const div = document.createElement("div");
        div.className = "alert  ${className}";
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector(".container");
        const form = document.querySelector("#book-form");
        container.insertBefore(div, form);
        // Vanish 
        setTimeout(() => document.querySelector(".alert").remove(), 2700);

    }

    static clearFields(){
        document.querySelector("#title").value = "";
        document.querySelector("#author").value = "";
        document.querySelector("#isbn").value = "";

    }
}

// Store Class : Maneja Storage

class Store {
    static getBooks (){
        let books;
        if(localStorage.getItem("books")== null){
            books = [];


        } else {
            books = JSON.parse(localStorage.getItem("books"));

        }
        return books;

    }
    static addBook(book) {
        const books = Store.getBooks();
        books.push(book);
        localStorage.setItem("books", JSON.stringify(books));

    }

    static removeBook(isbn){
        const books = Store.getBooks();
        books.forEach((book, index) => {
            if(book.isbn == isbn)
            books.splice(index, 1);
        })
        localStorage.setItem("books" , JSON.stringify(books));
    }
}

// Event : Mostrar Libros
document.addEventListener("DOMContentLoaded" , UI.displayBooks);

// Event : Agregar un libro

document.querySelector("#book-form").addEventListener("submit" , (e) => {
// Prevenir el submit
    e.preventDefault();


    // Valores del Form
    const title = document.querySelector("#title").value;
    const author = document.querySelector("#author").value;
    const isbn = document.querySelector("#isbn").value;

    //Validar
    if(title == "" || author == "" || isbn == "" ) {
        UI.showAlert("Completa todos los campos")
    }
    else {

    //Crear objeto(libro)
    const book = new Book(title, author, isbn);
    console.log(book)

    // Agregar libro a la UI
    UI.addBookToList(book);

    // Agregar libro al local Storage
    Store.addBook(book);

    //Succes menssage

    UI.showAlert ("Libro Agregado" , "success")

    // Limpiar Campos

    UI.clearFields();
    }
})

// Event : Remover un libro de la UI
document.querySelector("#book-list").addEventListener("click", (e) => {
    UI.deleteBook(e.target)
    UI.showAlert ("Libro eliminado" , "success")

    //Remover libro del local storage 
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);



});