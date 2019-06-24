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

    methods: {
        addProductToCart(product) {
            console.log(product);
            // this.$parent.getJson('../json/addToCart.json')
            //     .then(data => {
            //         if (data.result) {
            //             let find = this.cartProducts
            //                 .find(elem => elem.id === product.id);
            //             if (find) {
            //                 find.quantity++;
            //             } else {
            //                 let productInCart = {quantity: 1, ...product};
            //                 this.cartProducts.push(productInCart);
            //             }
            //         }
            //     })
        }
    },

    template: `<section class="cart__items">
                    <cart-product
                    v-for="product of cartProducts"
                    :key="product.id"              
                    :cart-product="product"
                    ></cart-product>
                </section>`
};