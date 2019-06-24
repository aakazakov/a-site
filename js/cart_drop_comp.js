Vue.component('cart-drop-list', {
    data() {
        return {
            catalogUrl: '../json/products_cart.json',
            receivedProducts: []
        }
    },

    mounted() {
        this.$parent.getJson(this.catalogUrl)
            .then(data => {
                for (let elem of data.contents) {
                    this.receivedProducts.push(elem);
                }
            });
    },

    template: `<div class="header__cart-drop-list-content">
                    <div>
                        <cart-drop-prod
                        v-for="product of receivedProducts"
                        :key="product.id"              
                        :cart-drop-prod="product"
                        ></cart-drop-prod>
                    </div>
                    <div class="cart-drop-prod__total">
                        <span>TOTAL</span>
                        <p>$<span class="cart-drop-prod__total-price">500.00</span></p>
                    </div>
                    <a class="cart-drop-prod__btn" href="checkout.html">Checkout</a>
                    <a class="cart-drop-prod__btn" href="cart.html">Go to cart</a>
                </div>`
});