const CartItems = {
    data() {
        return {
            catalogUrl: '../json/products_cart.json',
            cartProducts: []
        }
    },

    components: {
        'CartProduct': CartProduct
    },

    mounted() {
        this.$parent.getJson(this.catalogUrl)
            .then(data => {
                for (let elem of data.contents) {
                    this.cartProducts.push(elem);
                }
            });
    },

    template: `<section class="cart__items">
                    <cart-product
                    v-for="product of cartProducts"
                    :key="product.id"              
                    :cart-product="product"
                    ></cart-product>
                </section>`
};