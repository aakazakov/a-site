const ProductItemCtlg = {
    props: ['productItemCtlg'],
    data() {
        return {
            changeStyle: null
        }
    },
    computed: {
        eventStyle() {
            return {
                transition: 'all 0s',
                backgroundColor: '#f16d7f'
            }
        },
    },
    methods: {
        eventHandler(productItemCtlg) {
            this.$root.$refs.cartDropList.addProductToCart(productItemCtlg);
            this.changeStyle = this.eventStyle;
        }
    },
    template: ` <div class="product">
                    <img class="product__img" :src="productItemCtlg.img" :alt="productItemCtlg.name">
                    <div class="product__cart-btn"
                    @mousedown="eventHandler(productItemCtlg)"
                    @mouseup="changeStyle = null"
                    :style="changeStyle">
                        <img class="product__cart-btn-img" src="../img/cart_white.svg" alt="cart">
                        <p class="product__cart-btn-text">Add to Cart</p>
                    </div>
                    <div class="product__info">
                        <a class="product__ref" href="../html/single_product_page.html">
                            <p class="product__name">{{ productItemCtlg.name }}</p>
                        </a>
                        <p class="product__price">$<span>{{ productItemCtlg.price }}</span></p>
                    </div>
                </div> `
};

const CartProduct = {
    props: ['cartProduct'],
    template: `<div class="cart-product cart__grid">
                    <div class="cart-product__item cart__grid-item">
                        <img class="cart-product__img" :src="cartProduct.img" :alt="cartProduct.name">
                        <div class="cart-product__params">
                            <a class="cart-product__name-ref" href="single_product_page.html">
                                <p class="cart-product__name">{{ cartProduct.name }}</p>
                            </a>
                            <div class="cart-product__txt">
                                Color: <span class="cart-product__color">Red</span><br>
                                Size: <span class="cart-product__size">Xll</span>
                            </div>
                        </div>
                        </div>
                        <span class="cart-product__price cart__grid-item">&#36;{{ cartProduct.price }}</span>
                        <div class="cart-product__quantity cart__grid-item">
                            <input type="text" v-model.lazy="cartProduct.quantity">
                        </div>
                        <span class="cart-product__shipping cart__grid-item">free</span>
                        <span class="cart-product__subtotal cart__grid-item">&#36;
                        {{ this.$root.$refs.cartDropList.calcPrice(cartProduct.quantity, cartProduct.price) }}</span>
                        <span class="cart-product__del-btn cart__grid-item"
                        @click="$root.$refs.cartDropList.removeProductFromCart(cartProduct)">
                            <i class="fas fa-times-circle cart-product__del-btn_padding"></i>
                        </span>
                    </div>`
};

const CartDropProd = {
    props: ['cartDropProd'],
    methods: {
        ifIsNan(value) {
            if (isNaN(value)) {
                return 0;
            }
            return Math.round(value);
        }
    },
    template: `<div class="cart-drop-prod">
                    <img class="cart-drop-prod__img" :src="cartDropProd.img" :alt="cartDropProd.name">
                    <div class="cart-drop-prod__wrapper">
                        <a class="cart-drop-prod__name" href="single_product_page.html">{{ cartDropProd.name }}</a>
                        <span class="cart-drop-prod__stars">
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star-half-alt"></i>
                        </span>
                        <p class="cart-drop-prod__info">
                            <span class="cart-drop-prod__quantity">{{ ifIsNan(cartDropProd.quantity) }}</span>
                            &#160;&#215;&#8194;$
                            <span class="cart-drop-prod__price">
                            {{ this.$root.$refs.cartDropList.calcPrice(cartDropProd.quantity, cartDropProd.price) }}
                            </span>
                        </p>
                    </div>
                    <i @click="$emit('remove', cartDropProd)" class="fas fa-times-circle cart-drop-prod__del-btn"></i>
                </div>`
};  