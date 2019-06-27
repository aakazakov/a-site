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
        // this.$parent.getJson(this.catalogUrl)
        //     .then(data => {
        //         for (let elem of data.contents) {
        //             this.cartProducts.push(elem);
        //         }
        //     });
        this.synchroniseBetweenCartComps()
    },

    methods: {
        synchroniseBetweenCartComps() {
            this.cartProducts = this.$root.$refs.cartDropList.cartDropProducts;
        }
    },

    computed:{
        totalCost() {
            return this.$root.$refs.cartDropList.totalCost;
        }
    },

    template: ` <div class="container">
                <p v-if="!cartProducts.length" class="arrivals__text"
                style="text-align:center">here is empty...</p>      
                <div class="cart" v-if="cartProducts.length">
                <section class="cart__products">
                    <div class="cart__titles cart__grid">
                        <p class="cart__title cart__grid-item">Product Details</p>
                        <p class="cart__title cart__grid-item">unite Price</p>
                        <p class="cart__title cart__grid-item">Quantity</p>
                        <p class="cart__title cart__grid-item">shipping</p>
                        <p class="cart__title cart__grid-item">Subtotal</p>
                        <p class="cart__title cart__grid-item">ACTION</p>
                    </div>
                    <section class="cart__items">
                        <cart-product
                        v-for="product of cartProducts"
                        :key="product.id"              
                        :cart-product="product"
                        ></cart-product>
                    </section>
                    <div class="cart__clear-or-continue">
                        <button class="cart__btn cart__clear-btn" type="button">cLEAR SHOPPING CART</button>
                        <a class="cart__btn cart__continue-btn" href="catalog.html">cONTINUE sHOPPING</a>
                    </div>
                    <div class="cart__other">
                        <div class="shipping-adress">
                            <p class="shipping-adress__name">Shipping Adress</p>
                            <form class="shipping-adress__form" action="#">
                                <select class="shipping-adress__form-unit" name="city">
                                    <option value="bangladesh">Bangladesh</option>
                                    <option value="tokio">Tokio</option>
                                    <option value="moscow">Moscow</option>
                                    <option value="new-york">New York City</option>
                                    <option value="twin-peaks">Twin Peaks</option>
                                </select>
                                <input class="shipping-adress__form-unit
                                    shipping-adress__form-unit_width" type="text" placeholder="State">
                                <input class="shipping-adress__form-unit
                                    shipping-adress__form-unit_width" type="text" placeholder="Postcode / Zip">
                                <button class="shipping-adress__form-btn" type="button">get a quote</button>
                            </form>
                        </div>
                        <div class="coupone-discount">
                            <p class="coupone-discont__name">coupon discount</p>
                            <p class="coupone-discont__text">
                                Enter your coupon code if you have one
                            </p>
                            <form class="coupone-discount__form shipping-adress__form" action="#">
                                <input class="coupone-discount__form-unit
                                 shipping-adress__form-unit
                                 shipping-adress__form-unit_width" type="text"
                                 placeholder="State">
                                <button class="coupone-discount__form-btn
                                 shipping-adress__form-btn" type="button">Apply coupon</button>
                            </form>
                        </div>
                        <div class="goto-checkout">
                            <p class="goto-checkout__sub-total">Sub total&#8195;
                                <span class="goto-checkout__sub-total-value">&#36;{{totalCost}}</span>
                            </p>
                            <p class="goto-checkout__grand-total">GRAND TOTAL&#8195;
                                <span class="goto-checkout__grand-total-value">&#36;{{totalCost}}</span>
                            </p>
                            <a class="goto-checkout__btn" href="checkout.html">proceed to checkout</a>
                        </div>
                    </div>
                </section>
            </div>
            </div>`
};