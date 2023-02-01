// --------- Variables de entorno
const myLibrary = [];

const bookShelf = document.querySelector(".bookShelf");
// --------- Book object
class Book {
  constructor(author, title, pages, read) {
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.read = read;
  }
}
// -------- Delete method for button
Book.prototype.MakeDeleteButton = function () {
  const button = document.createElement("button");
  button.textContent = "Eliminar libro";
  button.classList.add("deleteButton");
  button.addEventListener("click", () => {
    myLibrary.splice(
      myLibrary.findIndex((element) => element === this),
      1
    );
    bookShelf.removeChild(document.querySelector(`.${this.title}`));
  });

  return button;
};
// -------- Book publishing handlers

function MakeBookCardDiv() {
  const newCard = document.createElement("div");
  newCard.classList.add("bookCard");
  return newCard;
}

function printBookData(htmlTag, ObjectKey, object, container) {
  const title = document.createElement(htmlTag);
  title.textContent = `${ObjectKey}: ${object[ObjectKey]}`;
  title.classList.add(`${ObjectKey}`);
  container.appendChild(title);
}

function addBookToLibrary(book) {
  myLibrary.push(book);
}

function displayBooks() {
  if (myLibrary.length > 0) {
    myLibrary.forEach((item) => {
      const bookCard = bookShelf.appendChild(MakeBookCardDiv());
      bookCard.classList.add(`${item.title}`);

      const keys = Object.keys(item);

      keys.forEach((key) => printBookData("h2", key, item, bookCard));

      bookCard.appendChild(item.MakeDeleteButton());
    });
  }
}
//---------------------
