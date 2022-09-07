class Book {
  constructor(title, author, pages, idNum, status) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.idNum = idNum;
    this.status = status;
  }
}

class UI {
  static displayBooks() {
    const books = Store.getBooks();

    books.forEach((book) => UI.addBookToList(book));
  }

  static addBookToList(book) {
    const list = document.querySelector("#book-list");

    const row = document.createElement("tr");

    row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.pages}</td>
        <td>${book.status}</td>
        <td>${book.idNum}</td>
        <td><a href="#" class="btn "><i class="delete fa-solid fa-trash-can fa-sm"></i></a></td>
        `;

    list.appendChild(row);
  }

  static deleteBook(el) {
    if (el.classList.contains("delete")) {
      el.parentElement.parentElement.parentElement.remove();
    }
  }

  static clearFields() {
    document.querySelector("#title").value = "";
    document.querySelector("#author").value = "";
    document.querySelector("#idnum").value = "";
    document.querySelector("#pages").value = "";
    document.querySelector("#status").checked = "";
  }
}
// Local Storage
class Store {
  static getBooks() {
    let books;
    if (localStorage.getItem("books") === null) {
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

  static removeBook(idNum) {
    const books = Store.getBooks();

    books.forEach((book, index) => {
      if (book.idNum === idNum) {
        books.splice(index, 1);
      }
    });

    localStorage.setItem("books", JSON.stringify(books));
  }
}

document.addEventListener("DOMContentLoaded", UI.displayBooks);

document.querySelector("#book-form").addEventListener("submit", (e) => {
  e.preventDefault();

  // Get from values
  const title = document.querySelector("#title").value;
  const author = document.querySelector("#author").value;
  const idNum = document.querySelector("#idnum").value;
  const pages = document.querySelector("#pages").value;
  const status = document.querySelector("#status").checked;

  // Validate
  if (title === "" || author === "" || pages === "" || idNum === "") {
    alert("Enter a valid input");
  } else {
    alert("Book Added");
    // Instatiate book
    const book = new Book(title, author, pages, idNum, status);

    // Add book to the UI
    UI.addBookToList(book);

    // Add Book to store
    Store.addBook(book);
    console.log(book);

    // Clear fields
    UI.clearFields();
  }
});

// Remove Book

document.querySelector("#book-list").addEventListener("click", (e) => {
  // remove book from UI
  UI.deleteBook(e.target);

  // Remove book from store
  Store.removeBook(
    e.target.parentElement.parentElement.previousElementSibling.textContent
  );

  alert("Book Removed");
});
