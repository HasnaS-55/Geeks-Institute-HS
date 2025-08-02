import express from 'express';
const router = express.Router();


let books = [
    { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald' },
    { id: 2, title: 'To Kill a Mockingbird', author: 'Harper Lee' }
];
let currentId = 3;


router.get('/', (req, res) => {
    try {
        res.status(200).json(books);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


router.get('/:id', (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const book = books.find(book => book.id === id);
        
        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }
        
        res.status(200).json(book);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


router.post('/', (req, res) => {
    try {
        const { title, author } = req.body;
        
        if (!title || !author) {
            return res.status(400).json({ message: "Both title and author are required" });
        }

        const newBook = {
            id: currentId++,
            title,
            author
        };

        books.push(newBook);
        res.status(201).json({ 
            message: "Book successfully added", 
            book: newBook 
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


router.put('/:id', (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const { title, author } = req.body;
        
        if (!title || !author) {
            return res.status(400).json({ message: "Both title and author are required" });
        }

        const index = books.findIndex(book => book.id === id);
        
        if (index === -1) {
            return res.status(404).json({ message: "Book not found" });
        }

        books[index] = { 
            ...books[index], 
            title, 
            author
        };

        res.status(200).json({ 
            message: "Book successfully updated",
            book: books[index]
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


router.delete('/:id', (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const initialLength = books.length;
        
        books = books.filter(book => book.id !== id);
        
        if (books.length === initialLength) {
            return res.status(404).json({ message: "Book not found" });
        }

        res.status(200).json({ message: "Book successfully deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;