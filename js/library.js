function Book(title, author, pages, isRead) {
  if (!new.target) {
    throw Error("Must use 'new' operator");
  }

  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;

  function info() {
    return `${title} by ${author} added to library`
  }
}

form = document.querySelector("#book-form");
console.log(form);

form.addEventListener('submit', function(event) {
  event.preventDefault();

  const imageUpload = document.querySelector("#imageUpload").files[0];

  if (imageUpload) {
    const reader = new FileReader();

    reader.onload = function () {
      const imagePreview = document.createElement("img");
      // use reader.result as the src image
    }
  }
  const title = document.querySelector("#title").value;
  const author = document.querySelector("#author").value;
  const totalPage = document.querySelector("#totalPages").value;
  const pagesRead = document.querySelector("#pagesRead").value;
  const hasRead = document.querySelector("#checkbox").checked;

  console.log(`${title} by ${author} with total pages of ${totalPage} and pages read of ${pagesRead} added to library, also read = ${hasRead}`);
  form.reset();
});