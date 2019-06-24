const app = new Vue({
    el: '#app',
    components: {
        'CartItems': CartItems,
        'CartDropList': CartDropList,
        'ProductsCatalog': ProductsCatalog,
        'ProductsMain': ProductsMain,
        'ProductsSinglePg': ProductsSinglePg,
        'ProductItemCtlg': ProductItemCtlg,
        'CartProduct': CartProduct,
        'CartDropProd': CartDropProd
    },
    methods: {
        getJson(url) {
            return fetch(url)
                .then(result => result.json())
                .catch(error => alert(error));
        }
    }
});