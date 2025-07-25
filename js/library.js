const readBooks = []
const unreadBooks = []

function Book(bookCover, title, author, pages, isRead) {
  if (!new.target) {
    throw Error("Must use 'new' operator");
  }

  this.bookCover = bookCover;
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;

  function info() {
    return `${title} by ${author} added to library`
  }
}

form = document.querySelector("#book-form");

form.addEventListener('submit', function(event) {
  event.preventDefault();

  const imageUpload = document.querySelector("#imageUpload").files[0];

  console.log("File: ", imageUpload);

  let bookCover = "";
  if (imageUpload) {
    const reader = new FileReader();

    reader.onload = function () {
      const imagePreview = document.createElement("img");
      imagePreview.src = reader.result;

      // use reader.result as the src image
      document.body.appendChild(imagePreview);
      bookCover = reader.result;

      const title = document.querySelector("#title").value;
      const author = document.querySelector("#author").value;
      const totalPage = document.querySelector("#totalPages").value;
      const pagesRead = document.querySelector("#pagesRead").value;
      const hasRead = document.querySelector("#checkbox").checked;

      const book = new Book(bookCover, title, author, totalPage, pagesRead, hasRead);

      hasRead ? readBooks.push(book): unreadBooks.push(book);

      console.log(`Confirmed book added to list in: ${JSON.stringify(readBooks)} or ${JSON.stringify(unreadBooks)}`);

      console.log(`${title} by ${author} with total pages of ${totalPage} and pages read of ${pagesRead} added to library, also read = ${hasRead}`);
      form.reset();
    };

    reader.readAsDataURL(imageUpload);
  }
});

