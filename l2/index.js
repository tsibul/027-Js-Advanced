'use strict'
// Класс должен содержать приватное свойство #balance, которое инициализируется значением 0 и представляет собой текущий баланс счета.
//     Реализуйте геттер balance, который позволит получить информацию о текущем балансе.
//     Реализуйте метод deposit(amount), который позволит вносить средства на счет. Убедитесь, что сумма внесения не отрицательная; в противном случае выбрасывайте ошибку.
//     Реализуйте метод withdraw(amount), который позволит снимать средства со счета. Убедитесь, что сумма для снятия неотрицательная и что на счете достаточно средств; в противном случае выбрасывайте ошибку.
//     Реализуйте конструктор, который принимает начальный баланс в качестве аргумента. Убедитесь, что начальный баланс не отрицательный; в противном случае выбрасывайте ошибку.




class bankAccount {
    #balance = 0

    constructor(balance) {
        if (typeof balance !== "number" || balance < 0) {
            throw new Error("Баланс не может быть отрицательна");
        }
        this.#balance = balance;
    }

    get balance() {
        return this.#balance;
    }

    deposit (amount){
        if(amount < 0 || typeof amount !== 'number'){
            throw new Error("Сумма для внесения не может быть отрицательной");
        }
            this.#balance +=amount;
    }
}

// У вас есть базовый список пользователей. Некоторые из них имеют информацию о своем премиум аккаунте,
// а некоторые - нет. Ваша задача - создать структуру классов для этих пользователей и функцию для получения информации о наличии премиум аккаунта, используя Опциональную цепочку вызовов методов, оператор нулевого слияния и instanceof.
// Создайте базовый класс User с базовой информацией (например, имя и фамилия).
// Создайте классы PremiumUser и RegularUser, которые наследуются от User.
// Класс PremiumUser должен иметь свойство premiumAccount (допустим, дата истечения срока действия),
// а у RegularUser такого свойства нет.
// Создайте функцию getAccountInfo(user), которая принимает объект класса User и возвращает информацию
// о наличии и сроке действия премиум аккаунта, используя Опциональную цепочку вызовов методов и оператор нулевого слияния.
// В функции getAccountInfo используйте instanceof для проверки типа переданного пользователя и дайте соответствующий ответ.
class User {
    constructor(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
    }
}
class PremiumUser extends User {
    constructor(firstName, lastName, premiumAccount) {
        super(firstName, lastName);
        this.premiumAccount = premiumAccount;
    }
}
class RegularUser extends User {
    constructor(firstName, lastName) {
        super(firstName, lastName);
    }
}
function getAccountInfo(user) {
    if (!(user instanceof User)) {
        return null;
    }
    if (user instanceof PremiumUser) {
        return user.premiumAccount;
    } else if (user instanceof RegularUser) {
        return "this user is Regular";
    }
    return "Unknown user";
}
const user1 = new User("ivan", "ivanov");
const user2 = new RegularUser("sergey", "sergeev");
const user3 = new PremiumUser("andrey", "andreev", "05.05.2024");
const user4 = 123;
console.log(getAccountInfo(user1));
console.log(getAccountInfo(user2));
console.log(getAccountInfo(user3));
console.log(getAccountInfo(user4));