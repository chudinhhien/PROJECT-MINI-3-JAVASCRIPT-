import { fetchApi } from "./helper/fetchApi.js";

//Get Category
fetchApi("http://localhost:3000/categories")
    .then(data => {
        let htmls = "";
        data.forEach(item => {
            htmls += `
                <div class="item-product">${item}</div>
            `;
        })
        const divItemProduct = document.querySelector(".category #product");
        divItemProduct.innerHTML = htmls;
    })
//End Get Category

//Get Products
fetchApi("http://localhost:3000/products?_page=1&_limit=18")
    .then(data => {
        let htmls = "";
        data.forEach(item => {
            htmls += `
                <div class="box">
                    <img src="${item.thumbnail}" alt="">
                    <div class="inner-content">
                        <div class="title">${item.title}</div>
                        <div class="info">
                            <div class="price">${item.price}$</div>
                            <div class="stock">Còn lại: ${item.stock} sp</div>
                        </div>
                    </div>
                    <div class="discount">${item.discountPercentage}%</div>
                </div>
            `
        })
        const divBox = document.querySelector("#list-products");
        divBox.innerHTML = htmls;
    })
// End Products

//Previous
var currentPage = 1;
const buttonPrev = document.querySelector("#prev");
buttonPrev.addEventListener("click",() => {
    if(currentPage>1){
        --currentPage;
        let link = "http://localhost:3000/products?_page="+currentPage+"&_limit=18";
        console.log(link);
        fetchApi(link)
            .then(data => {
                let htmls = "";
                data.forEach(item => {
                    htmls += `
                        <div class="box">
                            <img src="${item.thumbnail}" alt="">
                            <div class="inner-content">
                                <div class="title">${item.title}</div>
                                <div class="info">
                                    <div class="price">${item.price}$</div>
                                    <div class="stock">Còn lại: ${item.stock} sp</div>
                                </div>
                            </div>
                            <div class="discount">${item.discountPercentage}%</div>
                        </div>
                    `
                })
                let divBox = document.querySelector("#list-products");
                divBox.innerHTML = htmls;
                let page = document.querySelector(".paginate #page");
                page.innerHTML = currentPage;
            })
    }
})
//End Previous

// Next
const buttonNext = document.querySelector("#next");
buttonNext.addEventListener("click",() => {
    if(currentPage<2){
        ++currentPage;
        let link = "http://localhost:3000/products?_page="+currentPage+"&_limit=18";
        fetchApi(link)
            .then(data => {
                let htmls = "";
                data.forEach(item => {
                    htmls += `
                        <div class="box">
                            <img src="${item.thumbnail}" alt="">
                            <div class="inner-content">
                                <div class="title">${item.title}</div>
                                <div class="info">
                                    <div class="price">${item.price}$</div>
                                    <div class="stock">Còn lại: ${item.stock} sp</div>
                                </div>
                            </div>
                            <div class="discount">${item.discountPercentage}%</div>
                        </div>
                    `
                })
                let divBox = document.querySelector("#list-products");
                divBox.innerHTML = htmls;
                let page = document.querySelector(".paginate #page");
                page.innerHTML = currentPage;
            })
    }
})
// End Next

//Filter
const searchProduct = document.querySelector(".search #search");
const searchBtn = document.querySelector(".search #search-btn");
searchBtn.addEventListener("click",() => {
    if(searchProduct.value!=""){
        let searchLink = "http://localhost:3000/products?title_like="+searchProduct.value;
        fetchApi(searchLink)
            .then(data => {
                let htmls = "";
                data.forEach(item => {
                    htmls += `
                        <div class="box">
                            <img src="${item.thumbnail}" alt="">
                            <div class="inner-content">
                                <div class="title">${item.title}</div>
                                <div class="info">
                                    <div class="price">${item.price}$</div>
                                    <div class="stock">Còn lại: ${item.stock} sp</div>
                                </div>
                            </div>
                            <div class="discount">${item.discountPercentage}%</div>
                        </div>
                    `
                })
                let divBox = document.querySelector("#list-products");
                divBox.innerHTML = htmls;
            })
    }
})
//End Filter

//Sort
const sortProducts = document.querySelector(".products #sort-product");
sortProducts.addEventListener("change",() => {
    let linkSort = "";
    let option = sortProducts.options;
    console.log(option);
    if(option.selectedIndex==1) linkSort = "http://localhost:3000/products?_sort=price&_order=asc";
    else if(option.selectedIndex==2) linkSort = "http://localhost:3000/products?_sort=price&_order=desc";
    else if(option.selectedIndex==3) linkSort = "http://localhost:3000/products?_sort=discountPercentage&_order=desc";
    else linkSort = "http://localhost:3000/products?_page=1&_limit=18";
    fetchApi(linkSort)
        .then(data => {
            let htmls = "";
            data.forEach(item => {
                htmls += `
                    <div class="box">
                        <img src="${item.thumbnail}" alt="">
                        <div class="inner-content">
                            <div class="title">${item.title}</div>
                            <div class="info">
                                <div class="price">${item.price}$</div>
                                <div class="stock">Còn lại: ${item.stock} sp</div>
                            </div>
                        </div>
                        <div class="discount">${item.discountPercentage}%</div>
                    </div>
                `
            })
            let divBox = document.querySelector("#list-products");
            divBox.innerHTML = htmls;
        })
})
//End Sort
