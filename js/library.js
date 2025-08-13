let readBooks = []
let unreadBooks = []
loadBooks();

function Book(bookCover, title, author, totalPage, pagesRead, isRead) {
  if (!new.target) {
    throw Error("Must use 'new' operator");
  }

  this.bookCover = bookCover;
  this.title = title;
  this.author = author;
  this.totalPage = totalPage;
  this.pagesRead = pagesRead;
  this.isRead = isRead;

  function info() {
    return `${title} by ${author} added to library`
  }
}

const form = document.querySelector("#book-form");

form.addEventListener('submit', function(event) {
  event.preventDefault();

  const imageUpload = document.querySelector("#imageUpload").files[0];

  let bookCover = "";
  if (imageUpload) {
    const reader = new FileReader();

    reader.onload = function () {
      bookCover = reader.result;

      const title = document.querySelector("#title").value;
      const author = document.querySelector("#author").value;
      const totalPage = document.querySelector("#totalPages").value;
      const pagesRead = document.querySelector("#pagesRead").value;
      const hasRead = document.querySelector("#checkbox").checked;

      console.log(hasRead);
      const book = new Book(bookCover, title, author, totalPage, pagesRead, hasRead);

      if (hasRead) {
        readBooks.push(book);
      } else {
        unreadBooks.push(book);
      }
      addNewBook(book, hasRead);

      saveBooks();
      form.reset();
    };

    reader.readAsDataURL(imageUpload)
  }
});

function saveBooks() {
  localStorage.setItem("readBooks", JSON.stringify(readBooks));
  localStorage.setItem("unreadBooks", JSON.stringify(unreadBooks));
}

function addNewBook(book, hasRead) {

  console.log(hasRead);
  const bookShelf = hasRead? document.querySelector(".read-books"): document.querySelector(".unread-books");

  const newBook = document.createElement("img");

  newBook.classList.add("book");
  newBook.src = book.bookCover;
  console.log(book.bookCover);

  bookShelf.appendChild(newBook);
}

function loadBooks() {
  readBooks = JSON.parse(localStorage.getItem("readBooks")) || [];
  unreadBooks = JSON.parse(localStorage.getItem("unreadBooks")) || [];

  // Re-render saved books when the page loads
  readBooks.forEach(book => addNewBook(book, true));
  unreadBooks.forEach(book => addNewBook(book, false));

  console.log(unreadBooks);
}