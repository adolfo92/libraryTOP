// --------- Variables de entorno
const myLibrary = [];

const bookShelf = document.querySelector(".bookShelf");

const documentBody = document.querySelector("body");
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

// --------------------- Create book button

const createBookButton = document.querySelector(".addBook");

const myForm = document.querySelector(".formContainer");

createBookButton.addEventListener("click", () => {
  const coverDiv = document.createElement("div");
  coverDiv.classList.add("coverDiv");
  documentBody.appendChild(coverDiv);

  myForm.style.display = "flex";
});

// ------------------- Submit book button

const submitButton = document.querySelector(".submit");
submitButton.addEventListener("click", (e) => {
  e.preventDefault();

  const theForm = document.querySelector("#theForm");
  const data = new FormData(theForm);
  const finalData = Array.from(data.entries());

  const newBook = new Book(
    finalData[0][1],
    finalData[1][1],
    finalData[2][1],
    finalData[3][1]
  );

  addBookToLibrary(newBook);
  const coverDiv = document.querySelector(".coverDiv");
  documentBody.removeChild(coverDiv);
  theForm.reset();
  myForm.style.display = "none";
});
