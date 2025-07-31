import express from 'express'




let books = [
  {
    id: 1,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    publishedYear: 1960
  },
  {
    id: 2,
    title: "1984",
    author: "George Orwell",
    publishedYear: 1949
  },
  {
    id: 3,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    publishedYear: 1925
  },
  {
    id: 4,
    title: "Pride and Prejudice",
    author: "Jane Austen",
    publishedYear: 1813
  },
  {
    id: 5,
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    publishedYear: 1937
  }
];



const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/api/books', (req, res) => {
    try{
        res.json(books)
        res.status(200)
    }catch(err) {
        res.json("fail to fetch all books")
    }
})


app.get('/api/books/:bookId', (req, res) => {
    try{
        const id = parseFloat(req.params.bookId)
        let result = books.filter(book => book.id === id)
        
        if (!result) {
            res.status(404).json("Book not found")
        } else {
            res.json(result)
            console.log(result);
            
        res.status(200).json("Fetch success")
        }
        
    } catch(err) {
        res.status(500).json("Server failed")
    }
})

app.post('/api/books', (req, res) => {
    try{
        let newId = books.length + 1
        let {title, author, publishedYear} = req.body
        if (!title || !author || !publishedYear) {
            res.status(400).json("Title, author and published year are required")
        }

        let newBook = {
            id: newId,
            title: title,
            author: author,
            publishedYear: publishedYear
        }
        
        books.push(newBook)
        res.status(201).json(newBook)
    }catch(err) {
        res.status(500).json("failed to create a book")
    }
})







const Port = 5000
app.listen(Port, ()=> {
    console.log(`server running on port ${Port}`);
    
})