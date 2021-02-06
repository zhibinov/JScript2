'use strict';

const goods = [
    { title: 'Jacket black', price: 150, photo: 1 },
    { title: 'Coat brown', price: 250, photo: 2 },
    { title: 'Windbreaker blue', price: 350, photo: 3 },
    { title: 'T-shirt gray', price: 50, photo: 4 },
    { title: 'Hoodie blue', price: 150, photo: 5 },
    { title: 'Bomber blue', price: 150, photo: 6 },
    { title: 'Jacket gray', price: 350, photo: 7 },
    { title: 'Jacket brown', price: 250, photo: 8 },
    { title: 'T-shirt blue', price: 50, photo: 9 },
];

const renderGoodsItem = (title, price, photo) => {
    return `<div class="product-card">
    <div class="featuredImgWrap">
        <div class="featuredBuy">
            <button>
                <img src="img/addToCart.png" alt="">
                Add to Cart
            </button>
        </div>
        <img src="img/product_photo${photo}.png" alt="photo" class="product-photo">
        </div>
        <div class="product-name">${title}</div>
        <div class="product-price">$${price}.00</div>
    </div>`;
};

const renderGoodsList = (list) => {
    let goodsList = list.map(item => renderGoodsItem(item.title, item.price, item.photo));
    document.querySelector('.product-box').innerHTML = goodsList.join("");
}

renderGoodsList(goods);
