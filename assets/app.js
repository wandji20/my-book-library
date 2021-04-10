const form_submit = document.getElementById('form-submit');
const book_form = document.querySelector('#book-form');
const form_btn = document.querySelector('#form-btn');
const title = document.querySelector('#title');
const author = document.querySelector('#author');
const pages = document.querySelector('#pages');
const read_inputs = document.getElementsByName('read-status');


//  function serializeMyLibrary() {
//   let mylibrary = [];
//   localStorage.mylibrary = JSON.stringify(mylibrary);
// }

function deserializeMyLibrary() {
  let book = [];

  if (localStorage.getItem('mylibrary')){
    books = JSON.parse(localStorage.mylibrary); 
  }
  return books;
}

function Book(title, author, pages, read){
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function displayForm(){
  if (book_form.style.display === ''){
    book_form.style.display = 'block';
  }else{
    book_form.style.display = '';
  }
}


function displayBooks(){
  deserialised_books = deserializeMyLibrary()
  /// deserialised_books = JSON.parse(localStorage.mylibrary)
  const table = document.getElementById('book-list');
  
  for(let i=0; i<deserialised_books.length; i++){
    // const read_text = deserialised_books[i].read == true ? 'Already Read' : 'To Read';
    // const read_class = deserialised_books[i].read ? 'success' : 'danger';
    const row = document.createElement('tr');
    row.setAttribute('id', i);
    row.innerHTML = `
      <td>${deserialised_books[i].title}</td>
      <td>${deserialised_books[i].author}</td>
      <td>${deserialised_books[i].pages}</td>
      <td><button class='btn btn-success'>${deserialised_books[i].read}</button></td>
      <td><button class='btn btn-danger remove'>Remove Book</button></td>
      `;
    table.appendChild(row);
  }
}
    
function createBook(){
  const r1 = document.getElementById('read-status');

  const read = r1.checked


  let mylibrary = deserializeMyLibrary();
  // mylibrary = JSON.parse(localStorage.mylibrary)
  if(title.value === '' || author.value === '' || pages.value == '' || read == null ){
    alert('please fill all fields');
  }else{
    let aBook = new Book(title.value, author.value, pages.value, read);
    mylibrary.push(aBook);
    localStorage.mylibrary = JSON.stringify(mylibrary);

  }
}

function removeBook(id){
  mylibrary = deserializeMyLibrary();
  mylibrary.splice(id, 1);
  localStorage.mylibrary = JSON.stringify(mylibrary);
  
}

document.querySelector('#book-list').addEventListener('click', (e) => {
  console.log(e.target.className.includes('remove'))
  if (e.target.className.includes('remove')){
    let t_body = e.target.parentNode.parentNode.parentNode
    let t_row = e.target.parentNode.parentNode
    removeBook(t_row.id);
    t_body.removeChild(t_row);
  }
});

// document.querySelector('.remove').addEventListener('click', remove)
// function remove(){
//   console.log(this)
// }


form_submit.addEventListener('click', createBook);
form_btn.addEventListener('click', displayForm);

if (localStorage.mylibrary){
  mylibrary = JSON.parse(localStorage.mylibrary);
}else{
  localStorage.mylibrary = JSON.stringify(mylibrary)
}
displayBooks();
