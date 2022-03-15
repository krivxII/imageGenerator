const fs = require("fs");
const { createCanvas, loadImage } = require("Canvas");
const {
	layers,
	width,
	height,
	description,
	baseImageUri,
	editionSize,
	startEditionFrom,
	endEditionAt,
	rarityWeights,
} = require("./config.js");
const canvas = createCanvas(width, height);
const ctx = canvas.getContext("2d");

let metadataList = []; //Se guarda la informacion de cada imagen
let atributesList = []; // se guarda la informacion de cada capa de una imagen
let dnaList = []; // arreglo donde se tienen guardados los adns

const signImage = (_sig) => {
	ctx.fillStyle = "#000000";
	ctx.font = "bold 30pt Courier";
	ctx.textBaseline = "top";
	ctx.textAlign = "left";
	ctx.fillText(_sig, 40, 40);
};

const genColor = () => {
	let hue = Math.floor(Math.random() * 360);
	let pastel = `hsl(${hue}, 100%, 85%)`;
	return pastel;
};

const drawBackground = () => {
	ctx.fillStyle = genColor();
	ctx.fillRect(0, 0, width, height);
};

const saveImage = (_editionCount) => {
	fs.writeFileSync(
		`./output/${_editionCount}.png`,
		canvas.toBuffer("image/png")
	);
};

//agrega la metadata a la lista
const addMetadata = (_dna, _edition) => {
	let dateTime = Date.now();
	let tempMetadata = {
		dna: _dna.join(""),
		name:`#${_edition}`,
		description: description,
		image: `${baseImageUri}/${_edition}`,
		edition: _edition,
		date: dateTime,
		attributes: atributesList,
	};
	metadataList.push(tempMetadata);

	atributesList = []; // se vacia la lista de atributos despues de guardarlos
};

//
const addAttributes = (_element) => {
	let selectedElement = _element.layer.selectedElement;
	atributesList.push({
		name: selectedElement.name,
		rarity: selectedElement.rarity,
	});
};

const loadLayerImg = async (_layer) => {
	return new Promise(async (resolve) => {
		const image = await loadImage(`${_layer.selectedElement.path}`); //se consigue la imagen
		resolve({ layer: _layer, loadedImage: image });
	});
};

const drawElement = (_element) => {
	ctx.drawImage(
		_element.loadedImage,
		_element.layer.position.x,
		_element.layer.position.y,
		_element.layer.size.width,
		_element.layer.size.height
	);
	addAttributes(_element);
};

const constructLayerToDna = (_dna = [], _layer = [],_rarity) => {

	let mappedDnaToLayers = _layer.map((layer, index) => {
		let selectedElement = layer.elements[_rarity][_dna[index]];
		return {
			location: layer.location,
			elements: layer.ºelements,
			position: layer.position,
			size: layer.size,
			selectedElement: selectedElement,
		};
	});
	return mappedDnaToLayers;
};

const createDna = (_layers,_rarity) => {
	let randomNum = [];
	_layers.forEach((layer) => {
		let num = Math.floor(Math.random() * layer.elements[_rarity].length);
		randomNum.push(num);
	});
	return randomNum;
};


const getRarity = (_editionCount) => {
	let rarity = "";
	rarityWeights.forEach((rarityWeight) => {
		if (
			_editionCount >= rarityWeight.from &&
			_editionCount <= rarityWeight.to
		) {
			rarity = rarityWeight.value;
		}
	});
	return rarity;
};

const writeMethaData = (_data) => {
	fs.writeFileSync("./output/_metadata.json", _data);
};

const isDnaUnique = (_DnaList = [], _dna = []) => {
	return _DnaList.find((x) => x.join("") === _dna.join("")) == undefined
		? true
		: false;
};

const startCreating = async () => {
	writeMethaData(""); //se vacia el archivo de metadata
	let editionCount = startEditionFrom; //se inicia el contador
	let newDna;
	while (editionCount <= endEditionAt) {
		console.log(editionCount);

		let rarity = getRarity(editionCount);
		console.log(rarity);

		newDna = createDna(layers,rarity);
		console.log(dnaList);


		if (isDnaUnique(dnaList, newDna)) {
		
			let result = constructLayerToDna(newDna,layers,rarity);
			let loadedElements = [];

			result.forEach((layer) => {
				loadedElements.push(loadLayerImg(layer)); //promise
			});
			await Promise.all(loadedElements).then((elementsArry) => {
				ctx.clearRect(0, 0, width, height);
				drawBackground();
				elementsArry.forEach((element) => {
					drawElement(element);
				});
				signImage(`#${editionCount}`);
				saveImage(editionCount);
				addMetadata(newDna, editionCount);
				console.log(`Created edition: ${editionCount} with DNA: ${newDna}`);
			});
			dnaList.push(newDna);
			editionCount++;
		} else {
			console.log("repeat dna");
		}
		writeMethaData(JSON.stringify(metadataList));
	}

	/* layers.forEach((layer) => {
		 drawLayer(layer, i);
	 });*/
};

startCreating();
