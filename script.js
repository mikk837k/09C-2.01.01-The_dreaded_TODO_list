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

function updatePost(id, payload) {
  console.log(id);
  fetch("https://thetodollst-b2b5.restdb.io/rest/tasks/" + id, {
    method: "put",
    body: JSON.stringify(payload),
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

  const newDateFormat = manipulateDateFormat(task);

  console.log(newDateFormat);

  clone.querySelector("[data-field=title]").textContent = task.Description;
  clone.querySelector("[data-field=duedate]").textContent = newDateFormat;
  clone.querySelector("[data-field=location]").textContent = task.Where;
  clone.querySelector("[data-field=notes]").textContent = task.Notes;
  clone.querySelector("[data-action=delete]").dataset.id = task._id;
  clone.querySelector("[data-action=done]").dataset.id = task._id;

  const dest = document.querySelector(".dataContainer");

  dest.insertBefore(clone, dest.childNodes[0]);

  document
    .querySelector("[data-action=delete]")
    .addEventListener("click", e => {
      console.log(e.target.dataset.id);
      e.target.parentElement.remove();

      deletePost(e.target.dataset.id);
    });
  document.querySelector("[data-action=done]").addEventListener("click", e => {
    console.log(e.target.dataset.id);

    const payload = {
      Done: true
    };

    e.target.parentElement.style.backgroundColor = "lightgreen";
    e.target.style.display = "none";
    updatePost(e.target.dataset.id, payload);
  });
}

// this function manipulates the date format recieved from det database into a format that the site should display.
// This is then returned to the function showdata();
function manipulateDateFormat(task) {
  const sliceDate = task.Due.slice(0, 10);
  const splitDate = sliceDate.split("-");
  const concatDateFormat = splitDate[2].concat(
    `-`,
    splitDate[1],
    `-`,
    splitDate[0]
  );

  return concatDateFormat;
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

  console.table(payload);
  post(payload);
});

// TODO:
//  - use update on completed tasks instead of delete,
//  DONE - Find a way to get the date to be shown in the format dd-mm-yyyy(ask Jonas)
//  - Find out how to control the format send to db
