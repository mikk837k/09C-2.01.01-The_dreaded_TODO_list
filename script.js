"use strict";

window.addEventListener("DOMContentLoaded", init);

const form = document.querySelector("form");

function init() {
  getJSONData();
}

function getJSONData() {
  console.log("getJSONData");
  fetch("https://thetodollst-b2b5.restdb.io/rest/tasks", {
    method: "get",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-apikey": "5c8019cdcac6621685acbc19",
      "cache-control": "no-cache"
    }
  })
    .then(res => res.json())
    .then(data => {
      console.table(data), data.forEach(showData);
    });
}

function post(payload) {
  fetch("https://thetodollst-b2b5.restdb.io/rest/tasks", {
    method: "post",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-apikey": "5c8019cdcac6621685acbc19",
      "cache-control": "no-cache"
    }
  })
    .then(res => res.json())
    .then(data => {
      form.elements.submit.disabled = false;
      form.reset();
      showData(data);
    });
}

function deletePost(id) {
  fetch("https://thetodollst-b2b5.restdb.io/rest/tasks/" + id, {
    method: "delete",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-apikey": "5c8019cdcac6621685acbc19",
      "cache-control": "no-cache"
    }
  })
    .then(res => res.json())
    .then(data => {
      console.log(data);
    });
}

function showData(task) {
  console.log("showData");
  console.table(task);

  let myTemp = document.querySelector("template").content;
  let clone = myTemp.cloneNode(true);

  clone.querySelector("[data-field=title]").textContent = task.Description;
  clone.querySelector("[data-field=duedate]").textContent = task.Due;
  clone.querySelector("[data-field=location]").textContent = task.Where;
  clone.querySelector("[data-field=notes]").textContent = task.Notes;
  clone.querySelector("button").dataset.id = task._id;

  const dest = document.querySelector(".dataContainer");

  dest.insertBefore(clone, dest.childNodes[0]);

  document.querySelector("button").addEventListener("click", e => {
    console.log(e.target.dataset.id);
    e.target.parentElement.remove();

    deletePost(e.target.dataset.id);
  });
}

form.addEventListener("submit", e => {
  form.elements.submit.disabled = true;
  e.preventDefault();
  console.log("submitted");
  const payload = {
    Description: form.elements.description.value,
    Due: form.elements.duedate.value,
    Where: form.elements.location.value,
    Notes: form.elements.notes.value
  };
  post(payload);
});

// TODO: use update on completed tasks instead of delete, Find a way to get the date to work as intended(ask Jonas)
