const params = new URLSearchParams(window.location.search);
const SelectedCategory = params.get("category");
console.log(SelectedCategory);

let productURL = "https://kea-alt-del.dk/t7/api/products";
if (SelectedCategory) {
  productURL = `https://kea-alt-del.dk/t7/api/products?category=${SelectedCategory}`;
}
const listContainer = document.querySelector(".product_list_container");

function getData(url) {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      showProducts(data);
    });
}

function getDiscountPrice(price, discount) {
  return price - (price / 100) * discount;
}

function showProducts(products) {
  listContainer.innerHTML = "";

  products.forEach((product) => {
    const discountedPrice = getDiscountPrice(product.price, product.discount);

    listContainer.innerHTML += `<article class="product ${product.soldout ? "soldout" : ""} ${product.discount ? "discount" : ""}">
          <img src="https://kea-alt-del.dk/t7/images/webp/640/${product.id}.webp" alt="${product.productdisplayname}" />
          <h3>${product.productdisplayname}</h3>
          <p>${product.brandname} - ${product.articletype}</p>
          <div>
            ${product.discount ? `<p>${discountedPrice} kr</p>` : ""}
            <p>${product.price} kr ${product.discount ? `<em class="discount_tag">- ${product.discount}%</em>` : ""}</p>
          </div>
          <p><a href="detailview.html?id=${product.id}">Read More</a></p>
          ${product.soldout ? "<p class='soldout_tag'>Sold Out</p>" : ""}
        </article>`;
  });
}

getData(productURL);
