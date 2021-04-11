const formSubmit = document.getElementById('form-submit');
const bookForm = document.querySelector('#book-form');
const formBtn = document.querySelector('#form-btn');
const title = document.querySelector('#title');
const author = document.querySelector('#author');
const pages = document.querySelector('#pages');

function deserializeMyLibrary() {
  let books = [];

  if (localStorage.getItem('mylibrary')) {
    books = JSON.parse(localStorage.mylibrary);
  }
  return books;
}

class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }
}


function displayForm() {
  if (bookForm.style.display === '') {
    bookForm.style.display = 'block';
  } else {
    bookForm.style.display = '';
  }
}


function displayBooks() {
  const deserialisedBooks = deserializeMyLibrary();
  const table = document.getElementById('book-list');
  for (let i = 0; i < deserialisedBooks.length; i += 1) {
    const readValue = deserialisedBooks[i].read === true ? 'Already Read' : 'To Read';
    const row = document.createElement('tr');
    row.setAttribute('id', i);
    row.innerHTML = `
      <td>${deserialisedBooks[i].title}</td>
      <td>${deserialisedBooks[i].author}</td>
      <td>${deserialisedBooks[i].pages}</td>
      <td><button class='btn btn-success read-status'>${readValue}</button></td>
      <td><button class='btn btn-danger remove'>Remove Book</button></td>
      `;
    table.appendChild(row);
  }
}

function createBook() {
  const r1 = document.getElementById('read-status');

  const read = r1.checked;


  const mylibrary = deserializeMyLibrary();
  if (title.value === '' || author.value === '' || pages.value === '' || read === null) {
    alert('please fill all fields');
  } else {
    const aBook = new Book(title.value, author.value, pages.value, read);
    mylibrary.push(aBook);
    localStorage.mylibrary = JSON.stringify(mylibrary);
  }
}

function removeBook(id) {
  const mylibrary = deserializeMyLibrary();
  mylibrary.splice(id, 1);
  localStorage.mylibrary = JSON.stringify(mylibrary);
}

function changeReadStatus(id) {
  const mylibrary = deserializeMyLibrary();
  mylibrary[id].read = !(mylibrary[id].read);
  localStorage.mylibrary = JSON.stringify(mylibrary);
}


document.querySelector('#book-list').addEventListener('click', (e) => {
  if (e.target.className.includes('read-status')) {
    const button = e.target;
    const buttonText = e.target.textContent;
    const tRow = e.target.parentNode.parentNode;
    changeReadStatus(tRow.id);
    button.textContent = (buttonText === 'Already Read') ? 'To Read' : 'Already Read';
  }
});


document.querySelector('#book-list').addEventListener('click', (e) => {
  if (e.target.className.includes('remove')) {
    const tBody = e.target.parentNode.parentNode.parentNode;
    const tRow = e.target.parentNode.parentNode;
    removeBook(tRow.id);
    tBody.removeChild(tRow);
  }
});


formSubmit.addEventListener('click', createBook);
formBtn.addEventListener('click', displayForm);
displayBooks();
