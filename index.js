const fs = require("fs");
//console.log(process.argv);
const myarg = process.argv.slice(2);
//console.log(myarg);
const { createCanvas, loadImage } = require("Canvas");
const { layers, width, height } = require("./config.js");
const canvas = createCanvas(width, height);
const contex = canvas.getContext("2d");
const editionSize = myarg.length > 0 ? Number(myarg[0]) : 1;

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
const loadLayerImg = async (_layer) => {
    return new Promise(async (resolve) => {
        const image = await loadImage(`${_layer.location}/${element.fileName}`); //se consigue la imagen
        resolve({layer:_layer,loadedImage:image})
    })
    
	// let element =
	// 	_layer.elements[Math.floor(Math.random() * _layer.elements.length)]; // se elige un elemento al azar
	// console.log(image);
	// saveLayer(_edition);
};
    
const drawElement = (_element) => {
        
        contex.drawImage(
            image,
            _layer.position.x,
            _layer.position.y,
            _layer.size.width,
            _layer.size.height
            );
        addAttributes(_element);
}
  
        
const constructLayerToDna = (_dna,_layer) => {

};



const createDna = () => {
	let randomNum = Math.floor(1e13 + Math.random() * 9e13);
	//console.log(randomNum);
	return randomNum;
};

const writeMethaData = () => {
	fs.writeFileSync("./output/_metadata.json", JSON.stringify(metadata));
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
        if (isDnaUnique(dnaList, newDna) == true) {
            console.log(`se creo el numero ${newDna}`);
			 layers.forEach((layer) => {
			     drawLayer(layer, i);
			 });
			//  addMetadata(i);
			dnaList.push(newDna);
			editionCount++;
		} else {
			console.log("repeat dna");
		}
	}
};

startCreating();
-writeMethaData();
