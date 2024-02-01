'use strict'


const container = document.querySelector('.container');
let initialData = {};
if (localStorage.getItem('initialData')) {
    initialData = JSON.parse(localStorage.getItem('initialData'))
} else {
    initialData['maxId'] = 0;
    initialData['maxItemId'] = 0;
    initialData['items'] = [];
}

const newItemBtn = document.querySelector('#new-item');
document.querySelector('.data').addEventListener('click', () => {
    console.log(initialData);
});


newItemBtn.addEventListener('click', () => {
    const newItemInput = newItemBtn.previousElementSibling;
    if(!checkNewItem(newItemInput.value)){
        newItemInput.value = '';
    }
    if (newItemInput.value !== '') {
        initialData.maxItemId++;
        let newProduct = {id: initialData.maxItemId, 'product': newItemInput.value, 'reviews': []};
        initialData.items.push(newProduct);
        productBlock(newProduct);
        localStorage.setItem('initialData', JSON.stringify(initialData));
        newItemInput.value = '';
    }
});

initialData.items.forEach(product => productBlock(product));

function reviewBlock(product) {
    const review = document.createElement('div');
    review.classList.add('review');
    const reviewInput = document.createElement('textarea');
    reviewInput.classList.add('review__input');
    reviewInput.placeholder = 'Введите отзыв';
    const reviewBtn = document.createElement('button');
    reviewBtn.classList.add('review__btn');
    reviewBtn.type = 'button';
    reviewBtn.textContent = 'Комментировать';
    reviewBtn.addEventListener('click', (key, value) => {
        const errorField = review.parentElement.querySelector('.err-msg')
        errorField.textContent = '';
        try {
            if (reviewInput.value.length < 10 || reviewInput.value.length > 50) {
                throw new Error('or to short or to long comment')
            }
            initialData.maxId++;
            product.reviews.push({id: initialData.maxId.toString(), text: reviewInput.value});
            review.nextElementSibling.appendChild(createLine(initialData.maxId.toString(), reviewInput.value));
            localStorage.setItem('initialData', JSON.stringify(initialData));
            reviewInput.value = '';
        } catch (error) {
            errorField.textContent = error.message;
        }

    });
    review.appendChild(reviewInput);
    review.appendChild(reviewBtn);
    return review;
}

function productBlock(product) {
    const div = document.createElement('div');
    div.classList.add('product');
    const h3 = document.createElement('h3');
    const errorMsg = document.createElement('div')
    errorMsg.classList.add('err-msg');
    const review = reviewBlock(product);
    const ul = document.createElement('ul')
    h3.textContent = product.product;
    div.appendChild(h3);
    div.appendChild(errorMsg);
    div.appendChild(review);
    div.appendChild(ul);
    if (product.reviews) {
        product.reviews.forEach(rev => {
            ul.appendChild(createLine(rev.id, rev.text, product.id));
        });
    }
    container.appendChild(div);
}


function createLine(id, text, productId) {
    let li = document.createElement('li');
    li.textContent = id + '. ' + text;
    li.dataset.id = id;
    li.dataset.product = productId;
    let deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'удалить';
    deleteBtn.classList.add('review__btn_del')
    li.appendChild(deleteBtn);
    deleteBtn.addEventListener('click', e => deleteReview(e.target))
    return li;
}


function checkNewItem (itemValue){
    let newItem = true;
    initialData.items.forEach(item => {
        if(item.product === itemValue){
            newItem = false;
        }
    });
    return newItem;
}

function deleteReview(btn){
    const li = btn.closest('li');
    const reviewId = li.dataset.id;
    const productId = Number(li.dataset.product);
    li.remove();
    const product = initialData.items.find(item => item.id === productId);
    product.reviews = product.reviews.filter(item => item.id !== reviewId);
    localStorage.setItem('initialData', JSON.stringify(initialData));
}