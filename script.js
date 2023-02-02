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
Book.prototype.makeBookButton = function (className, textContent, btn) {
  const button = document.createElement("button");
  button.textContent = textContent;
  button.classList.add(className);
  button.classList.add("btn");
  button.classList.add(btn);
  return button;
};

// -------- Delete method for button
Book.prototype.MakeDeleteButton = function () {
  const button = this.makeBookButton("remove", "Eliminar Libro", "btn-warning");

  button.addEventListener("click", () => {
    myLibrary.splice(
      myLibrary.findIndex((element) => element === this),
      1
    );
    bookShelf.removeChild(document.querySelector(`.${this.title}`));
  });

  return button;
};
// ------------- Toogle Read button
Book.prototype.toggleRead = function () {
  let button;
  if (this.read === "true") {
    button = this.makeBookButton("readToggler", "Leido :)", "btn-success");
  } else {
    button = this.makeBookButton("readToggler", "No Leido :(", "btn-danger");
  }
  const thisCard = bookShelf.querySelector(`.${this.title}`);
  const readField = thisCard.querySelector(".read");
  readField.classList.add("card");

  button.addEventListener("click", () => {
    if (this.read === "true") {
      this.read = "false";
      button.textContent = "No leido";
    } else {
      this.read = "true";
      button.textContent = "Leido";
    }

    resetLibrary();
    displayBooks();
  });

  return button;
};

// -------- Book publishing handlers

function MakeBookCardDiv() {
  const newCard = document.createElement("div");
  newCard.classList.add("bookCard");
  return newCard;
}

function printBookData(htmlTagKey, htmlTagValue, ObjectKey, object, container) {
  const title = document.createElement(htmlTagKey);
  const content = document.createElement(htmlTagValue);
  title.textContent = `${ObjectKey.toUpperCase()}:`;
  content.textContent = `${object[ObjectKey]}`;
  title.classList.add(`${ObjectKey}`);
  container.appendChild(title);
  container.appendChild(content);
}

function addBookToLibrary(book) {
  myLibrary.push(book);
}

function displayBooks() {
  if (myLibrary.length > 0) {
    myLibrary.forEach((item) => {
      const bookCard = bookShelf.appendChild(MakeBookCardDiv());
      bookCard.classList.add(`${item.title}`);
      bookCard.classList.add("card");

      const keys = Object.keys(item);

      keys.forEach((key) => printBookData("h2", "p", key, item, bookCard));
      bookCard.appendChild(item.toggleRead());
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
// -------------------- Reset library function
function resetLibrary() {
  while (bookShelf.hasChildNodes()) {
    if (bookShelf.lastChild.localName === "div") {
      bookShelf.removeChild(bookShelf.lastChild);
    } else {
      return;
    }
  }
}
// ------------------- Submit book button

const submitButton = document.querySelector(".submit");
submitButton.addEventListener("click", (e) => {
  e.preventDefault();

  const theForm = document.querySelector("#theForm");
  const data = new FormData(theForm);
  const finalData = Array.from(data.entries()).map(([key, value]) => [
    key,
    value.replace(/ /g, "_"),
  ]);

  if (finalData[0][1] === "" || finalData[1][1] === "" || finalData[2][1] < 1) {
    theForm.reset();
    alert("Necesita agregar datos validos");
    return console.error("Data invalida");
  }

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
  resetLibrary();
  displayBooks();
  return "sucess";
});
