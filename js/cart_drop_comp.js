const CartDropList = {
    data() {
        return {
            catalogUrl: '../json/products_cart.json',
            cartDropProducts: []
        }
    },

    components: {
        'CartDropProd': CartDropProd
    },

    mounted() {
        this.$parent.getJson(this.catalogUrl)
            .then(data => {
                for (let elem of data.contents) {
                    this.cartDropProducts.push(elem);
                }
            });
    },

    methods: {
        addProductToCart(product) {
            this.$parent.getJson('../json/addToCart.json')
                .then(data => {
                    if (data.result) {
                        let find = this.cartDropProducts.find(elem => elem.id === product.id);
                        if (find) {
                            find.quantity++;
                        } else {
                            let productInCart = {quantity: 1, ...product};
                            this.cartDropProducts.push(productInCart);
                        }
                    }
                })
        },

        removeProductFromCart(product) {
            // console.log(product);
            this.$parent.getJson('../json/removeFromCart.json')
            .then(data => {
                if (data.result) {
                    let find = this.cartDropProducts.find(elem => elem.id === product.id);
                    if (find.quantity > 1) {
                        find.quantity--;
                    } else {
                        let findIdx = this.cartDropProducts.indexOf(find);
                        this.cartDropProducts.splice(findIdx, 1);
                    }
                }
            })
        }
    },

    template: `<div class="header__cart-drop-list-content">
                    <div>
                        <cart-drop-prod
                        v-for="product of cartDropProducts"
                        :key="product.id"              
                        :cart-drop-prod="product"
                        @remove="removeProductFromCart"
                        ></cart-drop-prod>
                    </div>
                    <div class="cart-drop-prod__total">
                        <span>TOTAL</span>
                        <p>$<span class="cart-drop-prod__total-price">500.00</span></p>
                    </div>
                    <a class="cart-drop-prod__btn" href="checkout.html">Checkout</a>
                    <a class="cart-drop-prod__btn" href="cart.html">Go to cart</a>
                </div>`
};