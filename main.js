//! HTML'den gelenler
const addBtn = document.getElementById("add-btn");
const titleInp = document.getElementById("title-inp");
const priceInp = document.getElementById("price-inp");
const list = document.getElementById("list");
const checkBox = document.querySelector("#checked");
const totalSpan = document.querySelector("#price-info");
const select = document.querySelector("select");
const userInp = document.querySelector("#user-inp");

//!Olay izleyicileri

addBtn.addEventListener("click", addExpense);
list.addEventListener("click", handleUpdate);
select.addEventListener("change", handleFilter);
userInp.addEventListener("change", saveUser);
document.addEventListener("DOMContentLoaded", getUser);

//!Fonksiyonlar

// ?Toplam Fiyat Bilgisi
let totalPrice = 0;
//? hem toplam değişkenini hem arayüzü güncelleyen fonksiyon
function updateTotal(price) {
  //js'de tutulan değişkeni günceller
  totalPrice += price;
  // htmldeki toplam alanı günceller
  totalSpan.innerText = totalPrice;
}

//? Yeni harcama ekler
function addExpense(e) {
  //todo Sayfa yenilemeyi engeller
  e.preventDefault();

  //? inputların değerlerine erişme
  const title = titleInp.value;
  const price = priceInp.valueAsNumber;

  //! 1-inputlardan biri dahi boş ise: alert ver ve fonksiyonu durdur
  if (!title || !price) {
    alert("Lütfen formu doldurunuz");
    return;
  }
  //! 2-inputlar doluysa bir kart oluştur ve html'e gönder
  //?a- div oluşturma

  const expenseDiv = document.createElement("div");

  //? b- class ekleme
  expenseDiv.classList.add("expense");
  if (checkBox.checked) {
    expenseDiv.classList.add("paid");
  }

  //?c- div'in içeriğini belirleme
  expenseDiv.innerHTML = `
              <h2 id="title">${title}</h2>
              <h2 id="price">${price}</h2>
              <div class="btns">
                 <img id="update" src="./images/money.png" alt="money" />
                 <img id="delete" src="./images/delete.png" alt="delete" />
              </div>
`;

  //?d- oluşan kartı html'e gönderme
  list.appendChild(expenseDiv);
  //?e- toplamı güncelle
  updateTotal(price);
  //!3- Inputları temizleme
  titleInp.value = "";
  priceInp.value = "";
  checkBox.checked = false;
}

// ? Harcamayı siler/ günceller

function handleUpdate(event) {
  // tıklanılan elemanı değişkene atar
  const ele = event.target;

  // tıklanılan butonun kapsayıcısına/ kartına divine ulaşma
  const parent = ele.parentElement.parentElement;
  //tıklanılan elamanın idsi delete ise çalışır
  if (ele.id === "delete") {
    //sildiğimiz elemanın fiyatına erişme
    const price = Number(parent.children[1].innerText);
    // toplam'dan sildiğimiz fiyatı güncelle çıkartacağımız için -eksi koyduk başına
    updateTotal(-price);

    //elemanı html'den kaldırma
    parent.remove();
  }

  // tıklanılan eleman idsi update olan ise paid classı ekler paid varsa kaldırır(toggle)
  if (ele.id === "update") {
    parent.classList.toggle("paid");
  }
}

// ? Note'ları filtreler

function handleFilter(e) {
  const selected = e.target.value;
  const items = list.childNodes;

  //listedeki her bir eleman için switch ile yapacağımız sorgu elemanının gözüküp gözükmeyeceğine karar verir

  items.forEach((item) => {
    // Seçilen değere göre yapılacak işleme karar verme

    switch (selected) {
      case "all":
        // Hepsi gösterilecek
        item.style.display = "flex";
        break;
      case "paid":
        // classında paid olmayanlar gizlenecek
        if (item.classList.contains("paid")) {
          item.style.display = "flex";
        } else {
          item.style.display = "none";
        }
        break;
      case "not-paid":
        //classında paid olanlar gizlenecek
        if (!item.classList.contains("paid")) {
          item.style.display = "flex";
        } else {
          item.style.display = "none";
        }
        break;
    }
  });
}

//!Kullanıcıyı localStorage kaydeder

function saveUser(event) {
  localStorage.setItem("username", event.target.value);
}

//Kullanıcıyı localstoragedan alır inputa yazar
function getUser() {
  //localstoragedan ismi al
  const username = localStorage.getItem("username" || "");

  //kullanıcı ismini inputa aktar
  userInp.value = username;
}
