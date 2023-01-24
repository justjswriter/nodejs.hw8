
const productTable = document.querySelector("#product_table_body")
const productNameInput = document.querySelector("#product_name_input")
const productPriceInput = document.querySelector("#product_price_input")
const productCategorySelector = document.querySelector("#select_category")
const addNewProductBTN = document.querySelector("#add_new_product_btn")
const filterProductTableSelect = document.querySelector("#filter_product_table_select")
const filterProductTableBtn = document.querySelector("#filter_product_table_btn")
const clearProductTableBtn = document.querySelector("#clear_filter_table_btn")

const categoryNameInput = document.querySelector("#category_name_input")
const addNewCategoryBtn = document.querySelector("#add_new_category_btn")
const BASE_URL = "http://localhost:8080";

const loadProductData = async (productId) => {
  productTable.innerHTML = ""
  const properapi = productId === "all"?"/products":"/products/" + productId
  const responeProduct = await fetch(BASE_URL + properapi);
  const productsData = await responeProduct.json();

  for (const products of productsData) {

    productTable.innerHTML += `
    <tr>
      <td>${products.name}</td>
      <td>${products.price}</td>
      <td>${products.categoryId}</td>
    </tr>
    `;
  }
};


const loadCategoriesData = async () => {
  const responseCategories = await fetch(BASE_URL + "/categories");
  const dataCategories = await responseCategories.json();
  localStorage.setItem("Categories", JSON.stringify(dataCategories))
  productCategorySelector.innerHTML = ""
  for(categories of dataCategories){
    filterProductTableSelect.innerHTML += `
    <option value="${categories.id}">${categories.name}</option>
    `
    productCategorySelector.innerHTML += `
    <option value="${categories.id}">${categories.name}</option>
    `
  }
};

loadCategoriesData().then(loadProductData("all"));


addNewProductBTN.addEventListener("click", () => {
  let payload = {
    name: productNameInput.value,
    price: productPriceInput.value,
    categoryId: productCategorySelector.value,
  };

  fetch(BASE_URL + "/products", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(payload),
  })
    .then(() => alert("product added!"))
    .then(() => {
      loadProductData("all");
    })
    .catch(() => alert("product add error"));
});

addNewCategoryBtn.addEventListener("click", () => {
  let payload = {
    name: categoryNameInput.value,
  };

  fetch(BASE_URL + "/categories", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(payload),
  })
    .then(() => alert("Category added!"))
    .then(() => {
      loadCategoriesData();
    })
    .catch(() => alert("Category add error"));
});


filterProductTableBtn.addEventListener("click", () => loadProductData(filterProductTableSelect.value))
clearProductTableBtn.addEventListener("click", () => loadProductData("all"))


