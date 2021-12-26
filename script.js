// let gridSize = prompt(
// 	"Input the number of squares per side you want to work on."
// );
let gridSize;
//for the grid

let body = document.querySelector("body");
let footer = document.querySelector("footer");

let divContainer = document.createElement("div");
divContainer.id = "container";
body.insertBefore(divContainer, footer);
//modules
// prompt

let gridSizeBtn = document.querySelector("#grid-size");
gridSizeBtn.addEventListener("click", createGridSize);

let singleModuleClass;
let moduleDivClass;

function createGridSize() {
	if (moduleDivClass === undefined) {
		removeInsetClass();
		createModules();
	} else {
		removeInsetClass();
		removeModules();
		createModules();
	}
}

function createModules() {
	gridSize = prompt(
		"Input the number of squares per side you want to work on."
	);

	moduleDiv = document.createElement("div");
	moduleDiv.className = "modules";
	let moduleDivHeight = 760 / gridSize;
	moduleDiv.style.height = `${moduleDivHeight}px`;

	let modulesRow = document.createElement("div");
	modulesRow.className = "single-module";

	for (let counter = 0; counter < gridSize; counter++) {
		clnModulesRow = modulesRow.cloneNode(true);
		moduleDiv.appendChild(clnModulesRow);
	}

	for (let counter = 0; counter < gridSize; counter++) {
		clnModuleDiv = moduleDiv.cloneNode(true);
		divContainer.appendChild(clnModuleDiv);
	}
	singleModuleClass = document.querySelectorAll(".single-module");
	moduleDivClass = document.querySelectorAll(".modules");
}

function removeModules() {
	moduleDivClass.forEach((module) => {
		module.remove();
	});
}

//button for rainbowmodule
let rainbowBtn = document.querySelector("#rainbow");
rainbowBtn.addEventListener("click", mouseEnter);

//button for color picker
let pickerBtn = document.querySelector("#color-pick");
pickerBtn.addEventListener("click", mouseEnter);

//button for darken
let darkenBtn = document.querySelector("#darken");
darkenBtn.addEventListener("click", mouseEnter);

let insetBtnClass = document.querySelectorAll(".inset-button");

// remove inset class
function removeInsetClass() {
	insetBtnClass.forEach((item) => {
		item.classList.remove("inset-btn");
	});
}

//inset button
function toggleBorderStyle(e) {
	removeInsetClass();
	if (e.target.textContent === "Rainbow") {
		rainbowBtn.classList.add("inset-btn");
	} else if (e.target.textContent === "Color Picker") {
		pickerBtn.classList.add("inset-btn");
	} else if (e.target.textContent === "Increment Dark") {
		darkenBtn.classList.add("inset-btn");
	}
}

// if else event listener
function mouseEnter(e) {
	if (e.target.textContent === "Rainbow") {
		toggleBorderStyle(e);
		singleModuleClass.forEach((item) => {
			item.removeEventListener("mouseenter", hoverPickerModule);
		});
		singleModuleClass.forEach((item) => {
			item.addEventListener("mouseenter", hoverRainbowModule);
		});
		singleModuleClass.forEach((item) => {
			item.removeEventListener("mouseenter", hoverIncrementDarkModule);
		});
	} else if (e.target.textContent === "Color Picker") {
		toggleBorderStyle(e);
		singleModuleClass.forEach((item) => {
			item.removeEventListener("mouseenter", hoverRainbowModule);
		});
		singleModuleClass.forEach((item) => {
			item.addEventListener("mouseenter", hoverPickerModule);
		});
		singleModuleClass.forEach((item) => {
			item.removeEventListener("mouseenter", hoverIncrementDarkModule);
		});
	} else {
		toggleBorderStyle(e);
		singleModuleClass.forEach((item) => {
			item.removeEventListener("mouseenter", hoverRainbowModule);
		});
		singleModuleClass.forEach((item) => {
			item.removeEventListener("mouseenter", hoverPickerModule);
		});
		singleModuleClass.forEach((item) => {
			item.addEventListener("mouseenter", hoverIncrementDarkModule);
		});
	}
}

function hoverPickerModule(e) {
	let clrPicker = document.querySelector("#picker").value;
	e.target.style.backgroundColor = `${clrPicker}`;
}

function hoverRainbowModule(e) {
	red = Math.floor(Math.random() * 256);
	green = Math.floor(Math.random() * 256);
	blue = Math.floor(Math.random() * 256);
	e.target.style.backgroundColor = `rgb(${red},${green},${blue})`;
	colorStyle = e.target.style.backgroundColor;
	console.log(colorStyle);
}

function convertHextoRGB() {
	let clrPicker = document.querySelector("#picker").value;

	red = parseInt(clrPicker.slice(1, 3), 16);
	green = parseInt(clrPicker.slice(3, 5), 16);
	blue = parseInt(clrPicker.slice(5), 16);
}

function hoverIncrementDarkModule(e) {
	convertHextoRGB();
	let alpha = 0;
	alpha += 0.1;
	e.target.style.backgroundColor = `rgba(${red},${green},${blue},${alpha}`;
	console.log(alpha);
}

// reset button
let rstBtn = document.querySelector("#reset");
rstBtn.addEventListener("click", rstModule);

function rstModule() {
	singleModuleClass.forEach((module) => {
		module.style.removeProperty("background-color");
	});
}
