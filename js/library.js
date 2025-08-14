let readBooks = []
let unreadBooks = []

generateExampleBook();
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

function generateExampleBook() {
  const exampleBook = new Book(
    "./img/harry-potter.jpg",
    "Harry Potter and the Chamber of Secrets",
    "J.K. Rowling",
    "341",
    "341",
    "7",
    false,
  );
  unreadBooks.push(exampleBook);
  saveBooks();
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
  const bookCard = hasRead? document.querySelector("#card-section-read"): document.querySelector("#card-section-unread");

  const bookNumber = hasRead ? readBooks.length: unreadBooks.length;

  const newBookInfoContainer = document.createElement("div");
  newBookInfoContainer.id = (`book-info-unread-${bookNumber}`);
  newBookInfoContainer.classList.add("card-component");

  console.log(newBookInfoContainer);

  const newBookPrev = document.createElement("img");
  const newBookPrevContainer = document.createElement("a");
  newBookPrevContainer.href = hasRead? `#book-info-read-${bookNumber}`: `#book-info-unread-${bookNumber}`;

  newBookPrevContainer.append(newBookPrev);

  const newBookInfo = document.createElement("div");
  newBookInfo.classList.add("book-info-card-unread");

  const bookTitleSpan = document.createElement("span");
  bookTitleSpan.innerText = "📔 Book Title:";

  const bookTitle = document.createElement("p");
  bookTitle.innerText = book.title;

  const authorSpan = document.createElement("span");
  authorSpan.innerText = "🖊️ Author:";

  const author = document.createElement("p");
  author.innerText = book.author;

  const totalPagesSpan = document.createElement("span");
  totalPagesSpan.innerText = "📄 Total Pages:";

  const totalPages = document.createElement("p");
  totalPages.innerText = book.totalPage;

  const ReadPagesSpan = document.createElement("span")
  ReadPagesSpan.innerText = "📖 Pages Read:";

  const readPages = document.createElement("p");
  readPages.innerText = book.pagesRead;

  const deleteButton = document.createElement("button");
  deleteButton.innerText = "Delete";

  const exitContainer = document.createElement("a");
  exitContainer.href = "#";

  const exit = document.createElement("div");
  exit.classList.add("exit-book-info-card");
  exit.innerText = "X"

  exitContainer.append(exit);

  newBookInfo.append(bookTitleSpan, bookTitle, authorSpan, author, totalPagesSpan, totalPages,ReadPagesSpan, readPages, deleteButton, exitContainer);

  newBookInfoContainer.append(newBookInfo);

  bookCard.append(newBookInfoContainer);

  newBookPrev.classList.add("book");
  newBookPrev.src = book.bookCover;
  newBookPrev.alt = "book";

  bookShelf.appendChild(newBookPrevContainer);
}

function loadBooks() {
  readBooks = JSON.parse(localStorage.getItem("readBooks")) || [];
  unreadBooks = JSON.parse(localStorage.getItem("unreadBooks")) || [];

  // Re-render saved books when the page loads
  readBooks.forEach(book => addNewBook(book, true));
  unreadBooks.forEach(book => addNewBook(book, false));

  console.log(unreadBooks);
}