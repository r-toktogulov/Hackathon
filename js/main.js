const API = "http://localhost:8000/kpi";
//Ruslan: получаем input и присваиваем в их переменные
let inpName = $(".inp-name");
let inpSurname = $(".inp-surname");
let inpPhone = $(".inp-phone");
let inpWeekKPI = $(".inp-weekKPI");
let inpMonthKPI = $(".inp-monthKPI");
let addForm = $(".add-form");
let addModal = $(".modal");
let btnNewContact = $(".newContact");
let contactList = $("tbody");

// Ruslan: Создаю событие на кнопку добавить нового студента
addForm.on("click", async (event) => {
  event.preventDefault();
  // Ruslan: получаем данные с инпутов и помещаем в новые переменные
  let name = inpName.val().trim();
  let surname = inpSurname.val().trim();
  let phone = inpPhone.val().trim();
  let week = inpWeekKPI.val().trim();
  let month = inpMonthKPI.val().trim();
  // Ruslan:создаем объект для отправки в БД
  let newContact = {
    name: name,
    surname: surname,
    phone: phone,
    week: week,
    month: month,
  };

  for (let k in newContact) {
    if (!newContact[k]) {
      alert("Заполните все поля");
      return;
    }
  }

  const response = await fetch(API, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(newContact),
  });
  inpName.val("");
  inpSurname.val("");
  inpPhone.val("");
  inpWeekKPI.val("");
  inpMonthKPI.val("");
  addModal.modal("hide");
});

// ! READ

async function getContacts() {
  const response = await fetch(`${api}?q=${searchValue}`);
  const data = await response.json();
  let = contactBook.html("");
  currentContact.forEach((elem) => {
    contactBook.append(`
      <tr>
      <td>${item.name}</td>
      <td>${item.surname}</td>
      <td>${item.surname}</td>
      <td></td>
      <td></td>
      <td><button class="btn-delete" id="${item.id}">
      <img src="https://cdn-icons.flaticon.com/png/512/3132/premium/3132919.png?token=exp=1648128711~hmac=22ccb6aa20aacb9917b0b610c88d6c10">
      </button>
      <button id="${item.id}" class="btn-edit" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
      <img src="https://cdn-icons-png.flaticon.com/512/1827/1827951.png">
      </button></td>
      </tr>
    `);
  });
}
getContacts();

// ! delete
$(document).on("click", ".btn-delete", async (event) => {
  let id = event.currentTarget.id;
  await fetch(`${API}/${id}`),
    {
      method: "DELETE",
    };
  getContacts();
  Toastify({
    text: "Успешно удалено",
    duration: 3000,
    newWindow: true,
    close: true,
    gravity: "top", // `top` or `bottom`
    position: "right", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: "green",
    },
  }).showToast();
});
