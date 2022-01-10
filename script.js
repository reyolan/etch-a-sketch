let singleModuleClass;
let moduleDivClass;

function initializeDom() {
	let body = document.querySelector("body");
	let footer = document.querySelector("footer");

	let divContainer = document.createElement("div");
	divContainer.id = "container";
	body.insertBefore(divContainer, footer);
}

function initializeEvents() {
	let gridSizeBtn = document.querySelector("#grid-size");
	gridSizeBtn.addEventListener("click", createGridSize);

	let rainbowBtn = document.querySelector("#rainbow");
	rainbowBtn.addEventListener("click", mouseEnter);

	let pickerBtn = document.querySelector("#color-pick");
	pickerBtn.addEventListener("click", mouseEnter);

	let darkenBtn = document.querySelector("#darken");
	darkenBtn.addEventListener("click", mouseEnter);

	let rstBtn = document.querySelector("#reset");
	rstBtn.addEventListener("click", rstModule);
}

function createGridSize() {
	if (moduleDivClass === undefined) {
		removeInsetInButton();
		createModules();
	} else {
		removeInsetInButton();
		removeModules();
		createModules();
	}
}

function setGridSize() {
	gridSize = prompt(
		"Input a whole number for the squares per side you want to work on. (5-100)"
	);
	if (gridSize === null) {
		return;
	} else {
		while (gridSize < 5 || gridSize > 100) {
			gridSize = prompt(
				"Invalid input! Please input whole number from 5 to 100 for the number of squares per side."
			);
			if (gridSize === null) {
				break;
			}
		}
	}
}

function createModules() {
	setGridSize();
	moduleDiv = document.createElement("div");
	moduleDiv.className = "modules";

	let divContainerSelector = document.querySelector("#container");
	let divContainerHeight = divContainerSelector.offsetHeight;
	let moduleDivHeight = divContainerHeight / gridSize;
	moduleDiv.style.height = `${moduleDivHeight}px`;

	let modulesRow = document.createElement("div");
	modulesRow.className = "single-module";

	for (let counter = 0; counter < gridSize; counter++) {
		clnModulesRow = modulesRow.cloneNode(true);
		moduleDiv.appendChild(clnModulesRow);
	}

	for (let counter = 0; counter < gridSize; counter++) {
		clnModuleDiv = moduleDiv.cloneNode(true);
		divContainerSelector.appendChild(clnModuleDiv);
	}
	singleModuleClass = document.querySelectorAll(".single-module");
	moduleDivClass = document.querySelectorAll(".modules");
}

function removeModules() {
	moduleDivClass.forEach((module) => {
		module.remove();
	});
}

function removeInsetInButton() {
	let insetBtnClass = document.querySelectorAll(".press-button");
	insetBtnClass.forEach((item) => {
		item.classList.remove("press-btn");
	});
}

function addInsetToButton(e) {
	removeInsetInButton();
	let rainbowBtn = document.querySelector("#rainbow");
	let pickerBtn = document.querySelector("#color-pick");
	let darkenBtn = document.querySelector("#darken");

	if (e.target.innerText === "Rainbow") {
		rainbowBtn.classList.add("press-btn");
	} else if (e.target.innerText === "Color Picker") {
		pickerBtn.classList.add("press-btn");
	} else if (e.target.innerText === "Increment Dark") {
		darkenBtn.classList.add("press-btn");
	}
}

function mouseEnter(e) {
	console.log(e);
	addInsetToButton(e);
	if (e.target.innerText === "Rainbow") {
		singleModuleClass.forEach((item) => {
			item.removeEventListener("mouseenter", hoverPickerModule);
		});
		singleModuleClass.forEach((item) => {
			item.addEventListener("mouseenter", hoverRainbowModule);
		});
		singleModuleClass.forEach((item) => {
			item.removeEventListener("mouseenter", hoverIncrementDarkModule);
		});
	} else if (e.target.innerText === "Color Picker") {
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
	rmOpacity(e);
	let clrPicker = document.querySelector("#picker").value;
	e.target.style.backgroundColor = `${clrPicker}`;
}

function hoverRainbowModule(e) {
	rmOpacity(e);
	red = Math.floor(Math.random() * 256);
	green = Math.floor(Math.random() * 256);
	blue = Math.floor(Math.random() * 256);
	e.target.style.backgroundColor = `rgb(${red},${green},${blue})`;
	colorStyle = e.target.style.backgroundColor;
	console.log(colorStyle);
	console.log(e);
}

function hoverIncrementDarkModule(e) {
	let opacity = +e.target.style.opacity;
	opacity += 0.1;
	e.target.style.opacity = `${opacity}`;
	let clrPicker = document.querySelector("#picker").value;
	e.target.style.backgroundColor = `${clrPicker}`;
}

function rstModule() {
	singleModuleClass.forEach((module) => {
		module.style.removeProperty("background-color");
	});
	singleModuleClass.forEach((module) => {
		module.style.removeProperty("opacity");
	});
}

function rmOpacity(e) {
	e.target.style.opacity = "";
}

initializeDom();
initializeEvents();
