
const allBooks = [
    {
        title: "The Hobbit",
        author: "J.R.R. Tolkien",
        image: "https://images-na.ssl-images-amazon.com/images/I/51wScUt0gZL._SY291_BO1,204,203,200_QL40_FMwebp_.jpg",
        alreadyRead: true
    },
    {
        title: "Harry Potter and the Philosopher's Stone",
        author: "J.K. Rowling",
        image: "https://images-na.ssl-images-amazon.com/images/I/51DF6ZR8G7L._SY291_BO1,204,203,200_QL40_FMwebp_.jpg",
        alreadyRead: false
    }
];

const bookSection = document.querySelector('.listBooks');


allBooks.forEach(book => {
    
    
    const bookDiv = document.createElement('div');
    
    
    
    const bookInfo = document.createElement('p');
    bookInfo.textContent = `${book.title} written by ${book.author}`;
    
   
    const bookImage = document.createElement('img');
    bookImage.src = book.image;
    bookImage.style.width = '100px';
    
   
    if (book.alreadyRead) {
        bookInfo.style.color = 'red';
    }
    
   
    bookDiv.appendChild(bookInfo);
    bookDiv.appendChild(bookImage);
    
 
    bookSection.appendChild(bookDiv);
});