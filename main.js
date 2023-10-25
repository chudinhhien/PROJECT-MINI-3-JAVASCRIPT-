import { fetchApi } from "./helper/fetchApi.js";

fetchApi("https://dummyjson.com/products")
    .then(data => {
        let htmls = "";
        const setCategory = new Set();
        data.products.forEach(item => {
            setCategory.add(item.category);
        })
        setCategory.forEach(item => {
            htmls += `
                <div class="item-product">${item}</div>
            `;
        })
        const divItemProduct = document.querySelector(".category #product");
        divItemProduct.innerHTML = htmls;
    })

