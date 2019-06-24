const ProductsSinglePg = {
    data() {
        return {
            catalogUrl: '../json/products_page.json',
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

    template: `<section class="may-like__products">
                    <product-item-ctlg
                    v-for="product of receivedProducts"
                    :key="product.id"              
                    :product-item-ctlg="product"
                    ></product-item-ctlg>
                </section>`
};