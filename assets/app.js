const bookButton = document.querySelector('.book-btn');
const bookForm = document.querySelector('.book-form');
const title = document.getElementById('title');
const author = document.getElementById('author');
const pages = document.getElementById('pages');
const readNodes = document.getElementsByName('read-status');
let read;
function getReadStatus(radio){
  for(let i=0; i<radio.length; i++){
    if (radio[i].checked){
      read = radio[i].value
    }
  }
}
getReadStatus(readNodes)

let library = [];

function Book(title, author, pages, read){
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}


function addBookToLibrary(book){

}

function displayForm(){
  if (bookForm.style.display === ''){
    bookForm.style.display = 'block';
  }else{
    bookForm.style.display = '';
  }
}









bookButton.addEventListener('click', displayForm)