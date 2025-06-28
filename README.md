# Library Management
A Library Management applications. Fully functional with advance CRUD operations using Node.js, Express.js, MongoDB, Mongoose and Typescript. This project boosted my Mongoose and Typescript knowledge also MongoDB query.

There is book collection. Reader can borrow one or multiple books from here with a due time.
## ⚡ Features
### 📚 Book
 - Create a book
 - Get all book by filter, sort, skip and limit
 - Update a book using bookId
 - Delete a book using bookid
### 💰 Borrow
  - **Create Borrow**: When user brrow a book with **quantity** and **dueDate** the app first check if the available quantity are available in **books** collection. If the **quantity > copies** it will throw an error with an valid message "Don't have enough copy". If available the requested quantity will deducted from the available copies. When copies become 0, the available field updated with **false**. This features implement with mongoose **static methods**
  - **Brrowed Book summery**: Retrive brrowed book summery with **totalQuantity** of borrow's book and **title,isbn**.
  Example below 👇
  ```
    "data": [
        {
            "totalQuantity": 5,
            "book": {
                "title": "The Catcher in the Rye",
                "isbn": "9780316769488"
            }
        },
        {
            "totalQuantity": 10,
            "book": {
                "title": "The Martian",
                "isbn": "9780553418026"
            }
        },
        {
            "totalQuantity": 9,
            "book": {
                "title": "Marhaba Javascript a maro thaba",
                "isbn": "97801234523424"
            }
        }
    ]
  ```
## 🚀Mongoose Features
- Validation
- Custom validation error message
- Static method (With Typescript interfaces)
- Mongoose middleware
## ⛔Error handling
Added global error handling with condition based validation error message. Each controller has try-catch block. If any error occured, the error handed over to express app with **next(error)**.
```
try{

}catch(error) {
    next(error)
}
```  
Here **next()** is a express next function. 

## 🌐API Request
### Book
- **POST**: Post a book on route 
```**https://libraryapp-three-iota.vercel.app/api/book**```
#### Example data:
```
    {
    "title": "Theory of Relativity",
    "author": "Albert Einstine",
    "genre": "Science",
    "isbn": "97801234523125",
    "description": "This is a Science books about Physics",
    "copies": 14,
    "available": true
}
```
- **GET**: Get all book baed on filter, sortby, limit hit on this route
```**https://libraryapp-three-iota.vercel.app/api/book?filter=non_fiction&sortby=createdAt&sort=desc&limit=1**```

- **GET**: Get a book by bookId hit on this route
```**https://libraryapp-three-iota.vercel.app/api/book/:bookId**```

- **PUT**: Update a book by bookId hit on this route
```**https://libraryapp-three-iota.vercel.app/api/book/:bookId**```

- **DELETE**: To delete a book by bookId hit on this route
```**https://libraryapp-three-iota.vercel.app/api/book/:bookId**```

### Borrow
- **POST**: Borrow a book hit on this route with given example data
```https://libraryapp-three-iota.vercel.app/api/book```
#### Example data:
```
{
    "book": "68597cd77cf8a2fe0c099209",
    "quantity": 3,
    "dueDate": "2025-07-18T00:00:00.000Z"
}
```

- **GET**: Get borrowed book details with totalQuantity, book name and book title. Hit on this route ```https://libraryapp-three-iota.vercel.app/api/book```
#### Example output: 
```
{
    "success": true,
    "message": "Borrowed books summary retrieved successfully",
    "data": [
        {
            "totalQuantity": 5,
            "book": {
                "title": "The Catcher in the Rye",
                "isbn": "9780316769488"
            }
        },
        {
            "totalQuantity": 10,
            "book": {
                "title": "The Martian",
                "isbn": "9780553418026"
            }
        },
        {
            "totalQuantity": 9,
            "book": {
                "title": "Marhaba Javascript a maro thaba",
                "isbn": "97801234523424"
            }
        }
    ]
}
```


## 🛠️ How to install
#### 1. Clone Repository
```
git clone git@github.com:nayemalways/LibraryManagement.git
```
#### Install dependency
```
npm install
```

#### Add .env variables
```
MONGODB_URI=<your_database_connection_string>/<your_database_name>

PORT=3000
```

#### Start application
```
npm run dev
```
And boom🔥 Server started

Linkedin: https://linkedin.com/in/nayemalways
