import Book from './modules/book.js';
import luxon from './modules/luxon.js';

document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('.book-list-container').style.display = 'block';
  document.querySelector('.new-book').style.display = 'none';
  document.querySelector('.contact-form').style.display = 'none';
});

const addBook = document.forms['add-book'];
const bookList = document.querySelector('.book-list');
const addBookButton = document.querySelector('#submit');

const bookOject = new Book();

addBookButton.addEventListener('click', (event) => {
  event.preventDefault();
  const bookTitle = addBook.querySelector('input[name="title"]').value;
  const bookAuthor = addBook.querySelector('input[name="author"]').value;

  if (bookTitle.length > 1 && bookAuthor.length > 1) {
    bookOject.createBook(bookTitle, bookAuthor);
    bookOject.updateCollection();
    bookList.innerHTML += `<li class="book">
      <p>
      "<span class="title">${bookTitle}</span>" by
      <span class="author">${bookAuthor}</span>
      </p>
      <button type="button" class="delete-btn">Remove</button>
    </li>`;
    if (document.querySelector('.validation-error')) {
      document.querySelector('.validation-error').style.display = 'none';
    }
    document.querySelectorAll('.input-text').forEach((element) => {
      element.value = '';
    });
  } else {
    const div = document.createElement('div');
    div.className = 'validation-error';
    div.textContent = 'Please Book Title or Book Author Shouldn\'t be empty';
    div.style.display = 'block';
    addBook.appendChild(div);
  }
});

bookList.addEventListener('click', (e) => {
  if (e.target.className === 'delete-btn') {
    const book = e.target.parentElement;
    bookOject.removeBook(book);
    bookOject.updateCollection();
    bookList.removeChild(book);
  }
});

if (bookOject.bookArray) {
  bookOject.bookArray.forEach((book) => {
    if (book) {
      bookList.innerHTML += `<li class="book">
              <p>
              "<span class="title">${book.title}</span>" by
              <span class="author">${book.author}</span>
              </p>
              <button type="button" class="delete-btn">Remove</button>
            </li>`;
    }
  });
} else {
  bookList.innerHTML = `<li class="book">
          <p>
          No Book Found
          </p>
        </li>`;
}

const nav = document.querySelectorAll('nav a');
nav.forEach((element) => {
  element.addEventListener('click', (e) => {
    if (e.target.innerText === 'List') {
      document.querySelector('.book-list-container').style.display = 'block';
      document.querySelector('.new-book').style.display = 'none';
      document.querySelector('.contact-form').style.display = 'none';
    } else if (e.target.innerText === 'Add New') {
      document.querySelector('.book-list-container').style.display = 'none';
      document.querySelector('.new-book').style.display = '';
      document.querySelector('.contact-form').style.display = 'none';
    } else if (e.target.innerText === 'Contact') {
      document.querySelector('.book-list-container').style.display = 'none';
      document.querySelector('.new-book').style.display = 'none';
      document.querySelector('.contact-form').style.display = 'block';
    }
  });
});

const date = document.querySelector('.date');

setInterval(() => {
  date.innerHTML = luxon.DateTime.now().toLocaleString(luxon.DateTime.DATETIME_FULL_WITH_SECONDS);
}, 200);