const bookModel = require('../models/bookModel');

const getAllBooks = async (req, res) => {
  try {
    const books = await bookModel.getAllBooks();
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getBookById = async (req, res) => {
  try {
    const book = await bookModel.getBookById(req.params.bookId);
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }
    res.json(book);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createBook = async (req, res) => {
  try {
    const { title, author, publishedYear } = req.body;
    if (!title || !author) {
      return res.status(400).json({ error: 'Title and author are required' });
    }
    const newBook = await bookModel.createBook(title, author, publishedYear);
    res.status(201).json(newBook);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateBook = async (req, res) => {
  try {
    const { title, author, publishedYear } = req.body;
    if (!title || !author) {
      return res.status(400).json({ error: 'Title and author are required' });
    }
    const updatedBook = await bookModel.updateBook(
      req.params.bookId,
      title,
      author,
      publishedYear
    );
    if (!updatedBook) {
      return res.status(404).json({ error: 'Book not found' });
    }
    res.json(updatedBook);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteBook = async (req, res) => {
  try {
    const deletedBook = await bookModel.deleteBook(req.params.bookId);
    if (!deletedBook) {
      return res.status(404).json({ error: 'Book not found' });
    }
    res.json({ message: 'Book deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
};