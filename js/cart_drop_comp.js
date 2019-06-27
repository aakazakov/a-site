const CartDropList = {
    data() {
        return {
            catalogUrl: '../json/products_cart.json',
            cartDropProducts: [],
            visibile: false
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
            })
    },

    computed: {
        totalAmount() {
            let totalAmount = 0;
            this.cartDropProducts.forEach(item => {
                if(isNaN(+item.quantity)) {
                    return 0;
                }
                totalAmount += Math.abs(+item.quantity);
            })
            return Math.round(totalAmount);
        },

        totalCost() {
            let totalPrice = 0;
            this.cartDropProducts.forEach(item => {
                let total = Math.round(Math.abs(+item.quantity))*item.price;
                if (isNaN(total)) {
                    return 0;
                }
                totalPrice += total
            });
            if (Number.isInteger(totalPrice)) {
                return totalPrice;
            }else {
                return totalPrice.toFixed(2);
            }            
        }
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
        },

        calcPrice(quantity, price) {
            if (isNaN(+quantity)) {
               return 0;
            }
            return Math.round(Math.abs(+quantity))*price;           
        }
    },

    template: `<div class="header__cart-wrapper">
                    <a class="header__cart-reference" href="cart.html"
                    @mouseenter="visibile = true">
                        <img class="header__cart-img" src="../img/cart_black.svg" alt="cart">
                        <span class="header__cart-indicator" >{{ totalAmount }}</span>
                    </a>
                    <section class="header__cart-drop-list"
                    @mouseleave="visibile = false"
                    v-show="visibile"> 
                        <div class="header__cart-drop-list-content" >
                            <p 
                            v-if="!cartDropProducts.length"
                            class="header__cart-empty cart-drop-prod__total">
                            here is empty...<i class="fas fa-cat"></i><p/>
                            <div>
                                <cart-drop-prod
                                v-for="product of cartDropProducts"
                                :key="product.id"              
                                :cart-drop-prod="product"
                                @remove="removeProductFromCart"
                                ></cart-drop-prod>
                            </div>
                            <div v-if="cartDropProducts.length" class="cart-drop-prod__total">
                                <span>TOTAL</span>
                                <p>$<span class="cart-drop-prod__total-price">{{ totalCost }}</span></p>
                            </div>
                            <a
                            v-if="cartDropProducts.length"
                            class="cart-drop-prod__btn" href="checkout.html">Checkout</a>
                            <a
                            v-if="cartDropProducts.length"
                            class="cart-drop-prod__btn" href="cart.html">Go to cart</a>
                        </div>
                    </section>
                </div>`
};