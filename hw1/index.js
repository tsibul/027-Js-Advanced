'use strict'

// Задание 1
// • Используя Symbol.iterator, создайте объект "Музыкальная коллекция",
//     который можно итерировать. Каждая итерация должна возвращать следующий альбом из коллекции.
// • Создайте объект musicCollection, который содержит массив альбомов и имеет свойство-символ
// Symbol.iterator. Каждый альбом имеет следующую структуру:

const albums = [
    {title: "Please, Please me", artist: "The Beatles", year: "1963"},
    {title: "The Beatles", artist: "The Beatles", year: "1970"},
    {title: "Abbey Road", artist: "The Beatles", year: "1972"},
]

const musicCollection = {
    albums: [...albums],
    [Symbol.iterator]: function () {
        let count = 0;
        return {
            next: (() => {
                if (count >= this.albums.length) {
                    return {done: true}
                } else {
                    return {
                        value: this.albums[count++],
                        done: false
                    }
                }
            })
        }
    },
}
for (const album of musicCollection) {
    console.log(album.title, album.artist, album.year);
}

// Задание 2
// Вы управляете рестораном, в котором работают разные повара, специализирующиеся на определенных блюдах.
// Клиенты приходят и делают заказы на разные блюда.
// Необходимо создать систему управления этими заказами, которая позволит:
// • Отслеживать, какой повар готовит какое блюдо.
// • Записывать, какие блюда заказал каждый клиент.
//
// Используйте коллекции Map для хранения блюд и их поваров, а также для хранения заказов каждого клиента.
// В качестве ключей для клиентов используйте объекты.

class MealType{
    constructor(name){
        this.name = name;
    }
}

class Customer{
    constructor(name){
        this.name = name;
    }
}
const alexey = new Customer('Alexey');
const maria = new Customer('Maria');
const irina = new Customer('Irina');

const pizza = new MealType('Pizza');
const sushi = new MealType('Sushi');
const dolchi = new MealType('Desert');

const cook = new Map;
cook.set(pizza, 'Victor');
cook.set(sushi, 'Olga');
cook.set(dolchi, 'Dmitri')


const meal = new Map;
meal.set('Pizza Margarita', pizza);
meal.set('Pizza Pepperoni', pizza);
meal.set('Sushi Philadelphia', sushi);
meal.set('Sushi California', sushi);
meal.set('Tiramisu', dolchi);
meal.set('CheeseCake', dolchi);

const currentOrders = new Map;
currentOrders.set(alexey,[]);
currentOrders.set(maria,[])
currentOrders.set(irina,[])

orderItem(alexey, 'Pizza Pepperoni');
orderItem(alexey, 'Tiramisu');
orderItem(maria, 'Sushi California');
orderItem(maria, 'Pizza Margarita');
orderItem(irina, 'CheeseCake');

function orderItem(customer, meal){
    currentOrders.get(customer).push(meal);
}


console.log(`Pizza Margarita prepared by ${cook.get(meal.get('Pizza Margarita'))}`)
let mariaOrders = '';
currentOrders.get(maria).forEach(el =>{mariaOrders += el + ' prepared by ' + cook.get(meal.get(el)) + ', '})
console.log(`${maria.name} order ${mariaOrders}`)