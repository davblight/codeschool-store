const API_URL = "https://fakestoreapi.com";

Vue.component('thing', {
    template: `
        <div class="item">
            <img v-bind:src="item.image" style="max-width: 100px">
            <h1>{{ item.title }}</h1>
            {{ item.description }}<br><br>
            <i>{{ item.price }}</i><br><br>
            <button v-if="page == 'shop'" v-on:click="addToCart()">Add to Cart</button>
        </div>
    `,
    props: {
        "item": Object,
        "cart": Array,
        "addFunction": Function,
        "page": String
    },
    data: function () {
        return {

        }
    },
    methods: {
        addToCart: function () {
            this.cart.push(this.item)
        }
    },
})

var app = new Vue({
    el: "#app",
    data: {
        page: "shop",
        productList: [],
        cart: []
    },
    methods: {
        showWelcome: function () {
            this.page = "welcome";
        },
        showShop: function () {
            this.page = "shop";
        },
        showCart: function () {
            this.page = "cart";
        },
    },
    created: async function () {
        let response = await fetch(API_URL + "/products");
        let data = await response.json();
        this.productList = data;
    }
});