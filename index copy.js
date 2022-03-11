const fs = require("fs");
console.log(process.argv);
const myarg = process.argv.slice(2);
console.log(myarg);
const { createCanvas, loadImage } = require("Canvas");
const { layers, width, height } = require("./config.js");
const canvas = createCanvas(width, height);
const contex = canvas.getContext("2d");
const edition = myarg.length > 0 ? Number(myarg[0]) : 1;
let metadata = [];
let atributes = [];
let hash = [];
let decodehash = [];
let dnaList = [];

const saveLayer = (_edition) => {
	fs.writeFileSync(`./output/${_edition}.png`, canvas.toBuffer("image/png"));
};

const addMetadata = (_edition) => {
	let dateTime = Date.now();
	let tempMetadata = {
		hash: hash.join(""),
		decodehash: decodehash,
		edition: _edition,
		dateT: dateTime,
		atributes: atributes,
	};
	metadata.push(tempMetadata);
	atributes = [];
	hash = [];
	decodehash = [];
};

const addAttributes = (_element, _layer) => {
	let tempAttributes = {
		id: _element.id,
		layer: _layer.name,
		name: _element.name,
		raity: _element.raity,
	};
	atributes.push(tempAttributes);
	hash.push(_layer.id);
	hash.push(_element.id);
	decodehash.push({ [_layer.id]: _element.id });
};
const drawLayer = async (_layer, _edition) => {
	let element =
		_layer.elements[Math.floor(Math.random() * _layer.elements.length)]; // se elige un elemento al azar
	addAttributes(element, _layer);
	const image = await loadImage(`${_layer.location}/${element.fileName}`); //se consigue la imagen
	//console.log(image)
	contex.drawImage(
		image,
		_layer.position.x,
		_layer.position.y,
		_layer.size.width,
		_layer.size.height
	);
	saveLayer(_edition);
	console.log(`cree la capa ${_layer.name} con el elemento ${element.name}`);
};

const writeMethaData = () => {
    fs.writeFileSync("./output/_metadata.json", JSON.stringify(metadata));
}

const startCreating = () => {
	for (let i = 0; i < edition; i++) {
		layers.forEach((layer) => {
			drawLayer(layer, i);
		});
		addMetadata(i);
	}
};

startCreating();
writeMethaData();

