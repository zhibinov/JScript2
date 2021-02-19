'use strict';

//1 урок

// const goods = [
//     { title: 'Jacket black', price: 150, photo: 1 },
//     { title: 'Coat brown', price: 250, photo: 2 },
//     { title: 'Windbreaker blue', price: 350, photo: 3 },
//     { title: 'T-shirt gray', price: 50, photo: 4 },
//     { title: 'Hoodie blue', price: 150, photo: 5 },
//     { title: 'Bomber blue', price: 150, photo: 6 },
//     { title: 'Jacket gray', price: 350, photo: 7 },
//     { title: 'Jacket brown', price: 250, photo: 8 },
//     { title: 'T-shirt blue', price: 50, photo: 9 },
// ];

// const renderGoodsItem = (title, price, photo) => {
//     return `<div class="product-card">
//     <div class="featuredImgWrap">
//         <div class="featuredBuy">
//             <button>
//                 <img src="img/addToCart.png" alt="">
//                 Add to Cart
//             </button>
//         </div>
//         <img src="img/product_photo${photo}.png" alt="photo" class="product-photo">
//         </div>
//         <div class="product-name">${title}</div>
//         <div class="product-price">$${price}.00</div>
//     </div>`;
// };

// const renderGoodsList = (list) => {
//     let goodsList = list.map(item => renderGoodsItem(item.title, item.price, item.photo));
//     document.querySelector('.product-box').innerHTML = goodsList.join("");
// }

// renderGoodsList(goods);

// sumGoodsList(goods)

// function sumGoodsList(array) {
//     let sum = 0;
//     for (let i = 0; i < array.length; i++) {
//         sum = sum + parseInt(array[i].price);
//     }
//     console.log(sum);
// }

//2 урок

// const goodsShop = [
//     { title: 'Jacket black', price: 150, photo: 1 },
//     { title: 'Coat brown', price: 250, photo: 2 },
//     { title: 'Windbreaker blue', price: 350, photo: 3 },
//     { title: 'T-shirt gray', price: 50, photo: 4 },
//     { title: 'Hoodie blue', price: 150, photo: 5 },
//     { title: 'Bomber blue', price: 150, photo: 6 },
//     { title: 'Jacket gray', price: 350, photo: 7 },
//     { title: 'Jacket brown', price: 250, photo: 8 },
//     { title: 'T-shirt blue', price: 50, photo: 9 },
// ];

// class GoodsList {
//     goods = [];

//     __getGoodsItemTemplate({ title, price, photo }) {
//         return `<div class="product-card">
//         <div class="featuredImgWrap">
//             <div class="featuredBuy">
//                 <button>
//                     <img src="img/addToCart.png" alt="">
//                     Add to Cart
//                 </button>
//             </div>
//             <img src="img/product_photo${photo}.png" alt="photo" class="product-photo">
//             </div>
//             <div class="product-name">${title}</div>
//             <div class="product-price">$${price}.00</div>
//         </div>`;
//     };

//     getGoods(goods) {
//         this.goods = goods;
//     }

//     render() {
//         const goodsTemplates = this.goods.map(item => this.__getGoodsItemTemplate(item)).join("");
//         const wrapper = document.querySelector('.product-box');
//         wrapper.innerHTML = goodsTemplates;
//     }

//     sumGoodsList() {
//         let array = this.goods;
//         let sum = 0;
//         for (let i = 0; i < array.length; i++) {
//             sum = sum + parseInt(array[i].price);
//         }
//         alert(`Общая стоимость товаров ${sum}$`);
//     }
// }

// const list = new GoodsList();

// list.getGoods(goodsShop);

// list.render();

// list.sumGoodsList();

// class Bascet {
//     quanity;
//     price;
// }

// class Product {
//     title;
//     price;
// }

//3 УРОК

// fetch('https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/catalogData.json')
//     .then(response => response.json())
//     .then(json => list.getGoods(json))
//     .then(json => list.render(json))
//     .then(json => list.sumGoodsList(json))

class Cart {
    __items = [];

    getItems() {
        return this.__items;
    }

    addItem(item) {
        this.__items.push(item);
        this.render();
    }

    removeItem(item_del) {
        this.__items = this.__items.filter(
            (item) => item.id_product !== item_del.id_product
        )
        this.render()

    }

    __getCartItemTemplate({ product_name, price, id_product }) {
        return `<div class = "cart__product">
        <p>${product_name}, цена: ${price} рублей<p>
        <button class="button__del" id="${id_product}">Удалить</button>
        </div>`;
    };

    render() {
        let cartTemplates = this.__items.map(item => this.__getCartItemTemplate(item)).join("");
        let wrapperCart = document.querySelector('.cart__box');
        wrapperCart.innerHTML = cartTemplates;
        // wrapperCart.insertAdjacentHTML('afterbegin', cartTemplates);
        wrapperCart.querySelectorAll('.button__del').forEach(i => {
            i.addEventListener('click', () => {
                let id = +i.getAttribute('id');
                console.log(id);
                let item_del = this.__items.find(goodsItem => goodsItem.id_product === id);
                cart.removeItem(item_del);
            });
        });
        let array = this.__items;
        let sum = 0;
        for (let i = 0; i < array.length; i++) {
            sum = sum + parseInt(array[i].price);
        }
        let wrapperSum = document.querySelector('.cart__sum');
        wrapperSum.innerHTML = `<p>Общая стоимость товаров ${sum}₽</p>`;
    }
}

class GoodsList {
    goods = [];
    filteredGoods = [];
    buttons;
    input;

    __getGoodsItemTemplate({ product_name, price, id_product }) {
        return `<div class="product-card">
            <div class="featuredImgWrap">
                <div class="featuredBuy">
                    <button class="button" id="${id_product}">
                        <img src="img/addToCart.png" alt="">
                        Add to Cart
                    </button>
                </div>
                <img src="img/${id_product}.jpg" alt="photo" class="product-photo">
                </div>
                <div class="product-name">${product_name}</div>
                <div class="product-price">₽${price}.00</div>
            </div>`;
    };

    // handleChange = event => {
    //     this.filteredGoods = this.goods.filter(item => {
    //         const v = event.target.id.toLowerCase();
    //         return item.product_name.toLowerCase().includes(v);
    //     });
    //     console.log(this.filteredGoods);
    //     this.render();
    // };

    init(url) {
        this.getGoods(url).then(() => {
            this.render();
            this.sumGoodsList()
            // console.log(this.goods)
        });
    }

    getGoods(url) {
        return fetch(url)
            .then(r => r.json())
            .then(r => {
                this.goods = r;
                this.filteredGoods = this.goods;
            });
    }

    // render() {
    //     const goodsTemplates = this.filteredGoods.map(item => this.__getGoodsItemTemplate(item)).join("");
    //     const wrapper = document.querySelector('.product-box');
    //     wrapper.innerHTML = goodsTemplates;
    //     let button = document.querySelectorAll('.button');
    //     button.forEach(elem => clickToProduct(elem));
    //     function clickToProduct(item) {
    //         item.addEventListener('click', function (event) {
    //             let idProduct = +event.target.id;

    //             this.goods.filter(x => x.id_product === idProduct);
    //             console.log(this.getGoods);
    //         })
    //     }
    // }

    render(selector = '.product-box') {
        let goodsTemplates = this.filteredGoods.map(item => this.__getGoodsItemTemplate(item)).join('');
        let wrapper = document.querySelector(selector);
        wrapper.innerHTML = goodsTemplates;
        wrapper.querySelectorAll('.button').forEach(i => {
            i.addEventListener('click', () => {
                // console.log(cart);
                let id = +i.getAttribute('id');
                let item = this.goods.find(goodsItem => goodsItem.id_product === id);
                cart.addItem(item);
            });
        });
    }

    sumGoodsList() {
        let array = this.goods;
        let sum = 0;
        for (let i = 0; i < array.length; i++) {
            sum = sum + parseInt(array[i].price);
        }
        console.log(`Общая стоимость товаров ${sum}₽`);
    }
}

let cart = new Cart();
let url = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/catalogData.json';
let list = new GoodsList().init(url);






