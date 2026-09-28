const params = new URLSearchParams(window.location.search);
const Selectedid = params.get("id");

console.log(Selectedid);

const detailURL = `https://kea-alt-del.dk/t7/api/products/${Selectedid}`;
console.log("detailURL", detailURL);

function localData(url) {
  fetch(url)
    .then((response) => response.json())
    .then((detail) => {
      showDetails(detail);
    });
}

function showDetails(detail) {
  console.log("detail", detail);

  document.querySelector("img").src = `https://kea-alt-del.dk/t7/images/webp/640/${Selectedid}.webp`;
  document.querySelector("img").alt = detail.productdisplayname;
  document.querySelector(".model").textContent = detail.productdisplayname;
  document.querySelector(".color").textContent = detail.basecolour;
  document.querySelector(".description").textContent = detail.description;
  document.querySelector(".name").textContent = detail.productdisplayname;
  document.querySelector(".brand").textContent = `${detail.brandname} - ${detail.category}`;
  document.querySelector(".price").textContent = `${detail.price} kr`;
}

localData(detailURL);
