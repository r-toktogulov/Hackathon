const API = "http://localhost:8000/kpi";
let searchValue = "";
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
addForm.on("submit", async (event) => {
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
  getContacts();
});

// ! READ

// Сделал Ислам

async function getContacts() {
  const response = await fetch(`${API}?q=${searchValue}`);
  const data = await response.json();

  let first = currentPage * postsPerPage - postsPerPage;
  let last = currentPage * postsPerPage;
  const currentContacts = data.slice(first, last);

  lastPage = Math.ceil(data.length / postsPerPage);
  if (currentPage === 1) {
    prevBtn.addClass("disabled");
  } else {
    prevBtn.removeClass("disabled");
  }

  if (lastPage === currentPage) {
    nextBtn.addClass("disabled");
  } else {
    nextBtn.removeClass("disabled");
  }

  contactList.html("");
  currentContacts.forEach((elem) => {
    contactList.append(`
      <tr>
      <td>${elem.name}</td>
      <td>${elem.surname}</td>
      <td>${elem.phone}</td>
      <td>${elem.week}</td>
      <td>${elem.month}</td>
      <td><button class="btn-delete" id="${elem.id}">
      <img src="https://cdn-icons.flaticon.com/png/512/3132/premium/3132919.png?token=exp=1648128711~hmac=22ccb6aa20aacb9917b0b610c88d6c10">
      </button>
      <button id="${elem.id}" class="btn-edit" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
      <img src="https://cdn-icons-png.flaticon.com/512/1827/1827951.png">
      </button></td>
      </tr>
    `);
  });
}
getContacts();

// ! delete
// Cделал Ислам
$(document).on("click", ".btn-delete", async (event) => {
  let id = event.currentTarget.id;
  await fetch(`${API}/${id}`, {
    method: "DELETE",
  });
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

// ! ПОИСК
let searchInp = $(".inp-search");

searchInp.on("input", (event) => {
  searchValue = event.target.value;
  currentPage = 1;
  getContacts();
});
// ! Update
let editName = $(".edit-name");
let editSurname = $(".edit-surname");
let editPhone = $(".edit-phone");
let editWeekKPI = $(".edit-weekKPI");
let editMonthKPI = $(".edit-monthKPI");
let editForm = $(".edit-form");
let editModal = $(".fade");

$(document).on("click", ".btn-edit", async (event) => {
  let id = event.currentTarget.id;
  editForm.attr("id", id);
  const response = await fetch(`${API}/${id}`);
  const data = await response.json();
  editName.val(data.name);
  editSurname.val(data.surname);
  editPhone.val(data.phone);
  editWeekKPI.val(data.week);
  editMonthKPI.val(data.month);
});

editForm.on("submit", async (event) => {
  event.preventDefault();
  let name = editName.val().trim();
  let surname = editSurname.val().trim();
  let phoneNumber = parseInt(editPhone.val().trim());
  let week = parseInt(editWeekKPI.val().trim());
  let month = parseInt(editMonthKPI.val().trim());

  let editedContacts = {
    name: name,
    surname: surname,
    phone: phoneNumber,
    week: week,
    month: month,
  };
  let id = event.currentTarget.id;
  await fetch(`${API}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(editedContacts),
  });
  getContacts();
  editModal.modal("hide");
});
let prevBtn = $(".prev-btn");
let nextBtn = $(".next-btn");
let postsPerPage = 5; //! Количество отображаемых элементов на одной странице
let currentPage = 1;
let lastPage = 1;

nextBtn.on("click", () => {
  if (lastPage === currentPage) {
    return;
  }
  currentPage++;
  getContacts();
  window.scrollTo(0, 0);
});

prevBtn.on("click", () => {
  if (currentPage === 1) {
    return;
  }
  currentPage--;
  getContacts();
  window.scrollTo(0, 0);
});
