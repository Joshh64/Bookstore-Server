const express = require("express");
const app = express()

const books = []
book_id = 1;

const firstBook = {
    id: book_id,
    title: "LotR",
    author: "J.R.R. Tolkien",
    genre: "Adventure"
}

books.push(firstBook);
book_id += 1;

app.use(express.json())

app.get("/book", (request, response) => {
    // const book = {
    //     title: "LotR",
    //     author: "J.R.R. Tolkien",
    //     genre: "Fantasy"
    // }

    const successResponse = {
        message: "Books successfully retrieved",
        book: books
    }

    response.send(successResponse)
})

app.post("/book", (request, response) => {
    console.log(request.body)

    const newBook = {
        id: book_id,
        title: request.body.title,
        author: request.body.author,
        genre: request.body.genre
    }

    books.push(newBook);
    book_id += 1;

    const successResponse = {
        message: "Books successfully added",
        book: newBook
    }

    response.send(successResponse)
})

app.put("/book", (request, response) => {
    function findBook(x) {
        return x.title === request.body.title;
    }
    const index = books.findIndex(findBook);

    if (index !== -1) {
        if (request.body.author) {
            books[index].author = request.body.author
        }
        if (request.body.genre) {
            books[index].genre = request.body.genre
        }
        const successResponse = {
            message: "Book successfully found"
        }
        response.send(successResponse)
    } else {
        const failureResponse = {
            message: "Book not found",
            book: request.body.title
        }
        response.send(failureResponse)
    }
})

app.delete("/book", (request, response) => {
    function deleteBook(x) {
        return x.title === request.body.title;
    }
    const index = books.findIndex(deleteBook);

    if (index !== -1) {
        const deletedBook = books.splice(index, 1)[0];
        const successResponse = {
            message: "Book successfully deleted",
            book: deletedBook
        }
        response.send(successResponse)
    } else {
        const failureResponse = {
            message: "Book not found",
            book: request.body.title
        }
        response.send(failureResponse)
    }
})

app.listen(5001, () => console.log("server is listening on port 5001"))