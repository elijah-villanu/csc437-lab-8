import { toHtmlElement } from "./toHtmlElement.mjs";

const page2 = "page2.html";
const page2text = "Playlist";
const page3 = "page3.html";
const page3text = "Soundtrack";

//Global header
const headerString = `<header>
      <nav>
        <h1>Elijah Villanueva</h1>
        <ul class="page-list">
          <li><a style href="${page2}">${page2text}</a></li>
          <li><a style href="${page3}">${page3text}</a></li>
        </ul>
        <div class="buttons-container">
          <label>
            <input type="checkbox" autocomplete="off" />
            Dark mode
          </label>
          <div class="button-div">
            <button>Menu</button>
          </div>
        </div>
      </nav> 
    </header>`;

const headerHTML = toHtmlElement(headerString);
const bodyElement = document.body;
bodyElement.prepend(headerHTML);

//Check if dark mode is enabled from localstorage
if (localStorage.getItem("dark-mode") === "true") {
  bodyElement.classList.add("dark-mode");
  document.querySelector("nav input[type='checkbox']").checked = true;
}


//Menu button functionality
const btn = document.querySelector(".button-div button");
const pgLst = document.querySelector(".page-list");
const navBar = document.querySelector("nav");
btn.addEventListener("click", () => {
  const currDisp = pgLst.style.display;
  if (currDisp === "grid") {
    pgLst.style.display = "none";
    navBar.style.gridTemplateRows = "1fr";
  } else {
    pgLst.style.display = "grid";
    navBar.style.gridTemplateRows = "2fr 1fr";
  }
});

const header = document.querySelector("header");
bodyElement.addEventListener("click", function (event) {
  const clicked = event.target;

  //Check if click is outside of header
  if (!header.contains(clicked)) {
    pgLst.style.display = "none";
    navBar.style.gridTemplateRows = "1fr";
  }
});

//Dark Mode Toggle
const darkMode = document.querySelector("nav input[type='checkbox']");
darkMode.addEventListener("change", function (event) {
  const enabled = bodyElement.classList.toggle("dark-mode");

  //local storage can only hold strings not bools
  localStorage.setItem("dark-mode", enabled.toString());
});
