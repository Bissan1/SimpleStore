document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const product = urlParams.get('product');

    // Hide all product details
    const productDetails = document.getElementsByClassName('product-detail');
    for (let i = 0; i < productDetails.length; i++) {
        productDetails[i].style.display = 'none';
    }

    // Show the relevant product detail
    if (product) {
        const selectedProductDetail = document.getElementById(product);
        if (selectedProductDetail) {
            selectedProductDetail.style.display = 'block';
        }
    }
});
