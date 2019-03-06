"use strict";

window.addEventListener("DOMContentLoaded", init);

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

function showData(task) {
  console.log("showData");

  let myTemp = document.querySelector("template").content;
  let clone = myTemp.cloneNode(true);

  clone.querySelector("[data-field=title]").textContent = `Name: ${
    task.Description
  }`;
  clone.querySelector("[data-field=duedate]").textContent = `Origin: ${
    task.Due
  }`;
  clone.querySelector("[data-field=location]").textContent = `Signature Move: ${
    task.Where
  }`;
  clone.querySelector("[data-field=notes]").textContent = `Amount of kid: ${
    task.Notes
  }`;

  document.querySelector(".dataContainer").appendChild(clone);
}
