const bookButton = document.querySelector('.book-btn')
const bookForm = document.querySelector('.book-form')



function displayForm(){

  if (bookForm.style.display === ''){
    bookForm.style.display = 'block';
  }else{
    bookForm.style.display = ''
  }
}
bookButton.addEventListener('click', displayForm)