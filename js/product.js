'use strict';


//Мой код
const url = 'https://602c2a0730ba720017222bc0.mockapi.io/goods';

Vue.component('app-product-list', {
    props: {
        items: Array,
        is_cart: Function,
        add_cart: Function,
        remove_cart: Function,
        filtered_list: Array,
        products_list: Array
    },
    template:
        `<div class="products-list">
      <div class="wrapper products-wrapper">
        <span v-if="filtered_list.length == 0" style="position:absolute; top: 50%; left: 50%">Продукты отсутсвуют</span>
            <app-product-item v-for="item in items" :item="item" :is_cart="is_cart" :add_cart="add_cart" :remove_cart="remove_cart"></app-product-item>
        <div v-if="products_list.length <= 0" class="loader">
                <span class="dot"></span>
                <span class="dot"></span>
                <span class="dot"></span>
            </div>
      </div>
    </div>`,
});

Vue.component('app-product-item', {
    props: {
        item: Object,
        is_cart: Function,
        add_cart: Function,
        remove_cart: Function
    },
    template:
        `<div class="goods-item product-card">
    <div class="featuredImgWrap">
        <div class="featuredBuy">
            <button :class="{disabled: is_cart(item.id)}" @click="!is_cart(item.id) ? add_cart(item.id) : remove_cart(item.id)">
                <img src="img/addToCart.png" alt="">
                Add to Cart
            </button>
        </div>
        <img :src="item.img" alt="photo" class="product-photo">
    </div>
    <div class="product-name">{{item.productName}}</div>
    <div class="product-price">{{item.price}}$</div>
</div>`
})

Vue.component('app-cart-button', {
    props: {
        open_close_cart: Function,
        cart_list: Array
    },
    template: `<button @click="open_close_cart" class="cart-button" type="button">Корзина <span class="counter-cart">{{cart_list.length}}</span><p></p></button>`
    //     template: `
    //   <button @click="open_close_cart" class="cart-button" type="button">Корзина
    //   <span class="counter-cart">{{cartGoods.length}}</span></button>`
})

Vue.component('app-search-input', {
    props: {
        search_value: String,
        search_items: Function
    },
    template: `
  <input @input="search_items" class="header-search" placeholder="Search..." @value="search_value" />`
})

//
const app = new Vue({
    el: '#root',
    data: {
        productsList: [],
        filteredList: [],
        cartList: [],
        searchValue: '',
        error: '',
        cartIsClosed: true
    },
    methods: {
        getList() {
            // const url = `${API_URL}/catalogData.json`
            return fetch(url, {
                method: 'GET'
            }).then(result => {
                return result.json();
            }).then(result => {
                this.productsList = result;
                this.filteredList = result;
            })
        },
        addCart(id) {
            this.cartList.push(this.filteredList.find(item => item.id == id));
            console.log(this.cartList);
        },
        removeCart(id) {
            this.cartList.splice(this.cartList.indexOf(this.cartList.find(item => item.id == id)));
            console.log(this.cartList);
        },
        isCart(id) {
            return !!this.cartList.find(item => item.id == id);
        },
        _searchHandle(text) {
            this.filteredList = this.productsList.filter(item => {
                const match = item.productName.toLowerCase().includes(text.toLowerCase());
                return !!match;
            })
        },
        searchItems(event) {
            this._searchHandle(event.target.value);
        },
        openCloseCart() {
            this.cartIsClosed = !this.cartIsClosed;
        }

    },

    mounted() {
        this.getList();
    }
})
//


// const app = new Vue({
//     el: '#root',
//     data: {
//         goods: [],
//         filteredGoods: [],
//         cartGoods: [],
//         searchLine: '',
//         errorMSG: '',
//         totalSum: 0,
//         isVisibleCart: false,
//     },
//     methods: {
//         getGoods() {
//             fetch(`${url}`)
//                 .then(r => r.json())
//                 .then(r => {
//                     this.goods = r;
//                     this.filteredGoods = this.goods;
//                 })
//                 .catch((e) => {
//                     this.errorMSG = e;
//                 })
//         },
//         serchItem() {
//             this.filteredGoods = this.goods.filter(item => {
//                 const regexp = new RegExp(this.searchLine, 'i');
//                 const match = item.productName.match(regexp);
//                 return !!match;
//             })
//         },
//         addToCart(id) {
//             if (!this.cartGoods.find(i => i.id === id)) {
//                 const item = this.filteredGoods.find((el) => {
//                     if (el.id === id) {
//                         return true;
//                     } else {
//                         return false;
//                     }
//                 });
//                 this.cartGoods.push(item);
//             } else {
//                 this.filteredGoods.forEach(el => {
//                     if (el.id === id) {
//                         el.quantity++
//                     }
//                 })
//             }
//         },
//         deletItemCart(id) {
//             const index = this.cartGoods.findIndex(i => i.id === id);
//             if (index !== -1) {
//                 this.cartGoods.splice(index, 1);
//             }
//         },
//         deletAllCart() {
//             this.cartGoods = [];
//         },
//         totalSumItem() {
//             let array = this.cartGoods;
//             let sum = 0;
//             for (let i = 0; i < array.length; i++) {
//                 sum = sum + parseInt(array[i].price * array[i].quantity);
//             }
//             this.totalSum = sum;
//         }

//     },
//     computed: {

//     },
//     mounted() {
//         this.getGoods();
//     }
// });






