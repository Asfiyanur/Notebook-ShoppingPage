const taxRAte = 0.18;
const shippingPrice = 20;
const shippingFreePrice = 500;

window.addEventListener("load", () => {
  localStorage.setItem("taxRate", taxRAte);
  localStorage.setItem("shippingPrice", shippingPrice);
  localStorage.setItem("shippingFreePrice", shippingFreePrice);

  sessionStorage.setItem("taxRate", taxRAte);
  sessionStorage.setItem("shippingPrice", shippingPrice);
  sessionStorage.setItem("shippingFreePrice", shippingFreePrice);
});

const productsDiv = document.querySelector(".products");

productsDiv.addEventListener("click", (event) => {
  if (event.target.className == "fa-solid fa-minus") {
    if (event.target.parentElement.querySelector(".quantity").innerText > 1) {
      event.target.nextElementSibling.innerText--;
      calculateProductPrice(event.target);
      calculateCardPrice();
    } else {
      if (
        confirm(
          `${
            event.target.closest(".product").querySelector("h2").innerText
          } ürününü kaldırmak istiyor musun ?  `
        )
      ) {
        if (confirm("emin misin?")) {
          event.target.closest(".product").remove();
          calculateCardPrice();
        }
      }
    }
  } else if (event.target.className == "fa-solid fa-plus") {
    event.target.previousElementSibling.innerText++;
    calculateProductPrice(event.target);
    calculateCardPrice();

    // else if(event.target.classList.contains == "fa-plus"
  } else if (event.target.className == "remove-product") {
    // event.target.parentElement.parentElement.parentElement.remove();
    event.target.closest(".product").remove();
    calculateCardPrice();
  } else {
    console.log("other elements are clicked");
  }
});

const calculateProductPrice = (btn) => {
  // tüm 3 işlem yapacak buttonununda 2. parent'ı olan infoya çıktığı için genel tanımlamayı böyle kurguluyoruz
  const productInfoDiv = btn.parentElement.parentElement;
  const price = productInfoDiv.querySelector("strong").innerText;
  const quantity = productInfoDiv.querySelector(".quantity").innerText;
  const productTotalDiv = productInfoDiv.querySelector(".product-line-price");

  productTotalDiv.innerText = (price * quantity).toFixed(2);
};
// bu fonksiyonun çalışması için yukarıdaki işlemlerin bulunduğu top ve çık old yerlere yerleştireceğiz.
// calculateProductPrice()

const calculateCardPrice = () => {
  const productTotalPricesDiv = document.querySelectorAll(
    ".product-line-price"
  );
  // className seçilse  ile arrayimsi oluyor ama seçilenlerinin üzerinde foreacc kullanılmıyor.
  // querySelector dense bunu saylayan il div i alıyor diğerlerini almıyor
  // querySelectorAll kullanılırsa array olarak saklıyor ve foreach kullnaılabiliyor.

  let subTotal = 0;
  // parseFloat küsüratları kesmeden sayıları alır,ondalıklı number a ceviriyor.
  productTotalPricesDiv.forEach((div) => {
    subTotal += parseFloat(div.innerText);
  });

  const taxPrice = subTotal * localStorage.getItem("taxRate");

  const shippingPrice = parseFloat(
    subTotal > 0 && subTotal < localStorage.getItem("shippingFreePrice")
      ? localStorage.getItem("shippingPrice")
      : 0
  );

  document.querySelector("#cart-subtotal").lastElementChild.innerText =
    subTotal.toFixed(2);

  document.querySelector("#cart-tax").lastElementChild.innerText =
    taxPrice.toFixed(2);

  document.querySelector("#cart-shipping").lastElementChild.innerText =
    shippingPrice.toFixed(2);

  document.querySelector("#cart-total").lastElementChild.innerText = (
    subTotal +
    taxPrice +
    shippingPrice
  ).toFixed(2);
};
