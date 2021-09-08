/* Global Variables */
const key = ",&appid=625d60473226f0d5e63d8af80299bbdc&units=metric";
const base = "https://api.openweathermap.org/data/2.5/weather?zip=";

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
    getWithZipCode(base + userInputZip + key).then(function (data) {
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
  try {
    const responce = await axios(url);
    var res = responce;
    return res["data"]["main"]["temp"] + " C";
  } catch (err) {
    alert(
      `city not found with this zip code : ${(userInputZip =
        document.querySelector("#zip").value)} .. please try again .`
    );
  }
};

// our get and post methodes for our server ..
const getData = async (url) => {
  try {
    const data = await axios(url);
    const newData = data["data"];
    return newData;
  } catch (err) {
    console.log("Error:", err);
  }
};

const postData = async (url = "", data = {}) => {
  try {
    const response = await axios.post(url, data);
  } catch (err) {
    console.log("err:", err);
  }
};

// update UI function ..
const updateUI = async () => {
  const date = document.getElementById("date");
  const temp = document.getElementById("temp");
  const content = document.getElementById("content");

  try {
    const data = await axios.get("/all");
    const newData = data["data"];
    if (newData["temp"]) {
      date.innerHTML = "Date: " + newData["date"];
      temp.innerHTML = "Temp: " + newData["temp"];
      content.innerHTML = "User feeling: " + newData["content"];
    }
  } catch (err) {
    console.log("error:", err);
  }
};
