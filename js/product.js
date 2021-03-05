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
    </div>`
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
            const url = `http://localhost:3001/products/getAll`
            return fetch(url, {
                method: 'GET'
            }).then(result => {
                return result.json();
            }).then(result => {
                this.productsList = result.products;
                this.filteredList = result.products;
            })
        },
        addCart(id) {
            const url = `http://localhost:3001/cart/add?id=${id}`
            return fetch(url, {
                method: 'GET'
            }).then(result => {
                return result.json();
            }).then(result => {
                this.cartList = result.cartList;
            })
        },
        removeCart(id) {
            console.log(id);
            const url = `http://localhost:3001/cart/remove?id=${id}`
            return fetch(url, {
                method: 'GET'
            }).then(result => {
                return result.json();
            }).then(result => {
                this.cartList = result.cartList;
            })
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






