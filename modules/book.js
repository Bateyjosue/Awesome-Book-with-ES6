export default class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
    this.id = null;
    this.bookArray = JSON.parse(localStorage.getItem('bookArray')) || [];
  }

  createBook = (title, author) => {
    this.bookArray.push({ title, author });
  }

  removeBook = (book) => {
    const bookTitle = book.querySelector('.title').innerHTML;
    const f = this.bookArray.filter((book) => bookTitle.toLowerCase() === book.title.toLowerCase());
    const filtIndex = this.bookArray.indexOf(f[0]);
    this.bookArray.splice(filtIndex, 1);
  }

  updateCollection = () => {
    localStorage.setItem('bookArray', JSON.stringify(this.bookArray));
  }
}