'use strict'

// Задание 1
// Представьте, что у вас есть класс для управления библиотекой.
// В этом классе будет приватное свойство для хранения списка книг, а также методы для добавления книги,
// удаления книги и получения информации о наличии книги.

// Класс должен содержать приватное свойство #books, которое инициализируется пустым массивом и
// представляет собой список книг в библиотеке.

// Реализуйте геттер allBooks, который возвращает текущий список книг.

// Реализуйте метод addBook(title), который позволяет добавлять книгу в список.
// Если книга с таким названием уже существует в списке, выбросьте ошибку с соответствующим сообщением.

// Реализуйте метод removeBook(title), который позволит удалять книгу из списка по названию.
// Если книги с таким названием нет в списке, выбросьте ошибку с соответствующим сообщением.

// Реализуйте метод hasBook(title), который будет проверять наличие книги в библиотеке и возвращать true или false
// в зависимости от того, есть ли такая книга в списке или нет.

// Реализуйте конструктор, который принимает начальный список книг (массив) в качестве аргумента.
// Убедитесь, что предоставленный массив не содержит дубликатов; в противном случае выбрасывайте ошибку.

class Library{
    #books = [];

    allBooks() {
        return this.#books;
    }

    hasBook(title){
        return this.#books.includes(title);
    }

    addBook(title){
        if(this.hasBook(title)){
            throw new Error(`${title} is exists`)
        } else {
            this.#books.push(title);
        }
    }

    removeBook(title){
        if(!this.hasBook(title)){
            throw new Error(`${title} is not exists`)
        } else {
            this.#books.splice(this.#books.indexOf(title), 1);
        }
    }

    constructor(bookArray) {
        const bookSet = new Set(bookArray);
        if(bookArray.length !== bookSet.size){
            throw  new Error('there are duplicates')
        } else {
            this.#books = bookArray;
        }
    }
}

const bookArr = [1984, '1178 when civilization Destroyed', '45 and other years', 'Обломов', 'Обрыв'];

const library = new Library(bookArr);
console.log(library.allBooks())
library.addBook('Titan');
console.log(library.allBooks())
library.addBook('1984')
console.log(library.allBooks())
library.removeBook('1984');
console.log(library.allBooks())
library.removeBook('1984');
console.log(library.allBooks())

// bookArr2.push(1984);
// bookArr2.push('Обрыв');
// const library2 = new Library(bookArr2);
