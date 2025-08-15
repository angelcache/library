let readBooks = []
let unreadBooks = []

generateExampleBook();
loadBooks();

function Book(bookCover, title, author, totalPage, pagesRead, isRead) {
  if (!new.target) {
    throw Error("Must use 'new' operator");
  }
  this.id = crypto.randomUUID();
  this.bookCover = bookCover;
  this.title = title;
  this.author = author;
  this.totalPage = totalPage;
  this.pagesRead = pagesRead;
  this.isRead = isRead;
}

function generateExampleBook() {
  const exampleBook = new Book(
    "./img/harry-potter.jpg",
    "Harry Potter and the Chamber of Secrets",
    "J.K. Rowling",
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

  const targetId = `#${book.id}`;

  setUpBookCard(targetId, hasRead, book);

  const newBookPrevContainer = document.createElement("a");
  newBookPrevContainer.href = targetId;
  newBookPrevContainer.dataset.id = book.id;
  newBookPrevContainer.dataset.read = hasRead ? "1": "0";

  const newBookPrev = document.createElement("img");

  newBookPrevContainer.append(newBookPrev);
  newBookPrev.classList.add("book");
  newBookPrev.src = book.bookCover;
  newBookPrev.alt = `Cover of ${book.title}`;

  bookShelf.appendChild(newBookPrevContainer);
}

function setUpBookCard(targetId, hasRead, book) {
  const bookCard = hasRead? document.querySelector("#card-section-read"): document.querySelector("#card-section-unread");

  const newBookInfoContainer = document.createElement("div");
  newBookInfoContainer.id = book.id;
  newBookInfoContainer.dataset.read = hasRead ? "1": "0";
  newBookInfoContainer.classList.add("card-component");

  const newBookInfo = document.createElement("div");
  newBookInfo.classList.add("book-info-card");

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

  const editButton = document.createElement("button");
  editButton.innerText = "Edit"
  editButton.classList.add("edit-button");
  
  const deleteButton = document.createElement("button");
  deleteButton.innerText = "Delete";
  deleteButton.classList.add("delete-button");
  deleteButton.dataset.id = book.id;
  deleteButton.dataset.read = book.isRead ? "1" : "0";

  const exitContainer = document.createElement("a");
  exitContainer.href = "#";

  const buttonContainer = document.createElement("div");
  buttonContainer.classList.add("button-container")

  buttonContainer.append(editButton, deleteButton);

  const exit = document.createElement("div");
  exit.classList.add("exit-book-info-card");
  exit.innerText = "X"

  exitContainer.append(exit);

  newBookInfo.append(bookTitleSpan, bookTitle, authorSpan, author, totalPagesSpan, totalPages,ReadPagesSpan, readPages, buttonContainer, exitContainer);

  const overlay = document.createElement("div");
  overlay.classList.add("overlay");

  newBookInfoContainer.append(newBookInfo, overlay);

  bookCard.append(newBookInfoContainer);
}

function loadBooks() {
  readBooks = JSON.parse(localStorage.getItem("readBooks")) || [];
  unreadBooks = JSON.parse(localStorage.getItem("unreadBooks")) || [];

  // Re-render saved books when the page loads
  readBooks.forEach(book => addNewBook(book, true));
  unreadBooks.forEach(book => addNewBook(book, false));

  console.log(unreadBooks);
}

const deleteButtons = document.querySelectorAll(".delete-button");

deleteButtons.forEach((deleteButton) => {
  deleteButton.addEventListener("click", () => {
    const bookId = deleteButton.dataset.id;
    const read = deleteButton.dataset.read;

    let index = -1;
    if (read === "1") {
      readBooks = readBooks.filter(b => b.id !== bookId);
    } else {
      unreadBooks = unreadBooks.filter(b => b.id !== bookId);
      console.log(unreadBooks)
      clearBooks();
      saveBooks();
      loadBooks();
    }  
  })
})

function clearBooks() {
  document.querySelector(".read-books")?.replaceChildren();
  document.querySelector(".unread-books")?.replaceChildren();
  document.querySelector("#card-section-read")?.replaceChildren();
  document.querySelector("#card-section-unread")?.replaceChildren()
}