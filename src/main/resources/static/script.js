const form = document.getElementById("contactForm");
const tableBody = document.getElementById("contactTableBody");
let baseUrl = "/api/contacts";

function loadContacts() {
  fetch(baseUrl)
    .then(res => res.json())
    .then(data => {
      tableBody.innerHTML = "";
      data.forEach(contact => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${contact.name}</td>
          <td>${contact.email}</td>
          <td>${contact.phone}</td>
          <td>
            <button onclick="editContact(${contact.id}, '${contact.name}', '${contact.email}', '${contact.phone}')">Edit</button>
            <button onclick="deleteContact(${contact.id})">Delete</button>
          </td>
        `;
        tableBody.appendChild(row);
      });
    });
}

form.onsubmit = function (e) {
  e.preventDefault();
  const contact = {
    name: form.name.value,
    email: form.email.value,
    phone: form.phone.value
  };

  fetch(baseUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(contact)
  }).then(() => {
    form.reset();
    loadContacts();
  });
};

function deleteContact(id) {
  fetch(`${baseUrl}/${id}`, { method: "DELETE" })
    .then(() => loadContacts());
}

function editContact(id, name, email, phone) {
  form.name.value = name;
  form.email.value = email;
  form.phone.value = phone;

  form.onsubmit = function (e) {
    e.preventDefault();
    const updated = {
      name: form.name.value,
      email: form.email.value,
      phone: form.phone.value
    };
    fetch(`${baseUrl}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updated)
    }).then(() => {
      form.reset();
      loadContacts();
      form.onsubmit = defaultSubmit;
    });
  };
}

const defaultSubmit = form.onsubmit;
loadContacts();
