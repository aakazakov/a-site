const app = new Vue({
    el: '#app',
    components: {
        'cart-items': CartItems,
        'cart-drop-list': CartDropList,
        'products-catalog': ProductsCatalog,
        'products-main': ProductsMain,
        'products-single-pg': ProductsSinglePg,
        'product-item-ctlg': ProductItemCtlg,
        'cart-product': CartProduct,
        'cart-drop-prod': CartDropProd
    },

    methods: {
        getJson(url) {
            return fetch(url)
                .then(result => result.json())
                .catch(error => alert(error));
        },
    }
});