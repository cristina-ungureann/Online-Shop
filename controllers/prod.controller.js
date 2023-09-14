
function getProductsPage(req, res){
    res.render('customer/products/all-products')
};

module.exports = {
    getProductsPage: getProductsPage
}