const API_URL = "https://fakestoreapi.com";

Vue.component('thing', {
    template: `
        <div class="item">
            <img v-bind:src="item.image" style="max-width: 100px">
            <h1>{{ item.title }}</h1>
            <p>{{ item.description }}<br><br>
            <i>{{ item.price }}</i></p><br><br>
            <button v-if="page == 'shop'" v-on:click="addToCart()">Add to Cart</button>
            <button v-if="page == 'cart'" v-on:click="removeFromCart()">Remove from Cart</button>
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
        },
        removeFromCart: function () {
            this.cart.splice(this.cart.indexOf(this.item), 1)
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