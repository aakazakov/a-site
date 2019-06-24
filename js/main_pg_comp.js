const ProductsMain = {
    data() {
        return {
            catalogUrl: '../json/products_main.json',
            receivedProducts: []
        }
    },

    components: {
        'ProductItemCtlg': ProductItemCtlg
    },

    mounted() {
        this.$parent.getJson(this.catalogUrl)
            .then(data => {
                for (let elem of data) {
                    this.receivedProducts.push(elem);
                }
            });
    },

    template: `<div class="products-main-page__products">
                    <product-item-ctlg
                    v-for="product of receivedProducts"
                    :key="product.id"              
                    :product-item-ctlg="product"
                    ></product-item-ctlg>
                </div>`
};