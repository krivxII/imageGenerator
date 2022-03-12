const fs = require("fs");
//console.log(process.argv);
const myarg = process.argv.slice(2);
//console.log(myarg);
const { createCanvas, loadImage } = require("Canvas");
const { layers, width, height } = require("./config.js");
const canvas = createCanvas(width, height);
const contex = canvas.getContext("2d");
const editionSize = myarg.length > 0 ? Number(myarg[0]) : 1;

let metadataList = [];
let atributesList = [];
let dnaList = [];

const saveImage = (_editionCount) => {
	fs.writeFileSync(`./output/${_editionCount}.png`, canvas.toBuffer("image/png"));
};

const addMetadata = (_edition) => {
	let dateTime = Date.now();
	let tempMetadata = {
		dna: _dna,
		edition: _edition,
		date: dateTime,
		attributes: atributesList
	  };
	metadataList.push(tempMetadata);
	dnaList.push(tempMetadata);
	atributesList = [];
};

const addAttributes = (_element) => {
	let element = _element.selectedElement
	atributesList.push({
		name:selectedElement.name,
		rarity:selectedElement.rarity
	})
};
const loadLayerImg = async (_layer) => {
	return new Promise(async (resolve) => {
		const image = await loadImage(
			`${_layer.location}/${_layer.selectedElement.fileName}`
		); //se consigue la imagen
		resolve({ layer: _layer, loadedImage: image });
	});

	// let element =
	// 	_layer.elements[Math.floor(Math.random() * _layer.elements.length)]; // se elige un elemento al azar
	// console.log(image);
	// saveLayer(_edition);
};

const drawElement = (_element) => {
	contex.drawImage(
		_element. loadedImage,
		_element. layer.position.x,
		_element.layer.position.y,
		_element.layer.size.width,
		_element. layer.size.height
	);
	addAttributes(_element);
};

const constructLayerToDna = (_dna, _layer) => {
	let DnaSegment = _dna.toString().match(/.{1,2}/g);
	console.log("Este es es segmento ");
	console.log(DnaSegment);
	let mappedDnaToLayers = _layer.map((layer) => {
		let selectedElement =
			layer.elements[parseInt(DnaSegment) % layer.elements.length];
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

const createDna = () => {
	let randomNum = Math.floor(1e13 + Math.random() * 9e13);
	//console.log(randomNum);
	return randomNum;
};

const writeMethaData = (_data) => {
	fs.writeFileSync("./output/_metadata.json", _data);
};

const isDnaUnique = (_DnaList = [], _dna) => {
	return _DnaList.find((x) => x === _dna) == undefined ? true : false;
};

const startCreating = () => {
	let editionCount = 1;
	let newDna;
	while (editionCount <= editionSize) {
		console.log(dnaList);
		newDna = createDna(layers.length * 2 - 1);
		if (isDnaUnique(dnaList, newDna)) {
			console.log(`se creo el numero ${newDna}`);
			let result = constructLayerToDna(newDna, layers);
			console.log(result);
			let loadedElements = [];
			result.forEach((layer) => {
				loadedElements.push(loadLayerImg(layer)); //promise
			});
			Promise.all(loadedElements).then((elementsArry) => {
				elementsArry.forEach(element=>{
					drawElement(element)
				})
				saveImage(editionCount)
				addMetadata(newDna,editionCount);
				console.log(`Created edition: ${editionCount} with DNA: ${
					newDna}` );

			});
			dnaList.push(newDna);
			editionCount++;
		} else {
			console.log("repeat dna");
		}
	}

	/* layers.forEach((layer) => {
		 drawLayer(layer, i);
	 });*/
};

startCreating();
-writeMethaData();
