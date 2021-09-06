/* Global Variables */
const key = ",&appid=625d60473226f0d5e63d8af80299bbdc";
const base = "https://api.openweathermap.org/data/2.5/weather?zip=";

// we need to use proxy server to connect to the api from our client side code ..
const proxyServer = "https://cors-anywhere.herokuapp.com/";

// Create a new date instance dynamically with JS

let date = new Date();
let day = date.getDate();
let month = date.getMonth() + 1;
let year = date.getFullYear();

let fullDate = `${day}.${month}.${year}`;

// make event listner ..
const button = document.querySelector("#generate");

button.addEventListener("click", buttonClicked);

// function to run for the rvent 'click'
function buttonClicked(e) {
  let userInputZip = document.querySelector("#zip").value;
  let userInputContent = document.querySelector("#feelings").value;

  if (userInputZip && userInputContent) {
    getWithZipCode(proxyServer + base + userInputZip + key).then(function (
      data
    ) {
      postData("/postData", {
        date: fullDate,
        temp: data,
        content: userInputContent,
      }).then(updateUI());
    });
  } else {
    alert("cant generate with no zip code or no feelings ..");
  }
}

// get data from openweathermap.org api ..

const getWithZipCode = async (url) => {
  const responce = await fetch(url);
  try {
    const res = await responce.json();
    if (res["cod"] == "404" || res["cod"] == "400") {
      throw new Error(res["message"]);
    }
    return res["main"]["temp"] + " K";
  } catch (err) {
    alert(err + " .. please try again .");
  }
};

// our get and post methodes for our server ..
const getData = async (url) => {
  const data = await fetch(url);
  try {
    const newData = data.json();
    return newData;
  } catch (err) {
    console.log("Error:", err);
  }
};

const postData = async (url = "", data = {}) => {
  const response = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  try {
    const newData = await response.json();
    return newData;
  } catch (err) {
    console.log("err:", err);
  }
};

// update UI function ..
const updateUI = async () => {
  const data = await fetch("/all");
  const date = document.getElementById("date");
  const temp = document.getElementById("temp");
  const content = document.getElementById("content");

  try {
    const newData = await data.json();
    if (newData["temp"]) {
      date.innerText = "Date: " + newData["date"];
      temp.innerText = "Temp: " + newData["temp"];
      content.innerHTML = "User feeling: " + newData["content"];
    }
  } catch (err) {
    console.log("error:", err);
  }
};
