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
    const StoredBooks = [
      {
        title: "Book One",
        author: "John Doe",
        idNum: "1",
        pages: 20,
        status: true,
      },

      {
        title: "Book Two",
        author: "Jane Doe",
        idNum: "2",
        pages: 15,
        status: false,
      },
    ];

    const books = StoredBooks;

    books.forEach((book) => UI.addBookToList(book));
  }

  static addBookToList(book) {
    const list = document.querySelector("#book-list");

    const row = document.querySelector("tr");

    row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.pages}</td>
        <td>${book.status}</td>
        <td><a href="#" class="btn">X</a></td>
        `;

    list.appendChild(row);
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

  // Instatiate book

  const book = new Book(title, author, pages, idNum, status);

  console.log(book);
});
