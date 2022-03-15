const fs = require("fs");
const dir = __dirname;
const width = 1000;
const height = 1000;
 const description = "This is an NFT made by the coolest generative code.";
const baseImageUri = "https://hashlips/nft"; 
const startEditionFrom = 1;
const endEditionAt = 10;
const editionSize = 10; 
const rarityWeights = [
	{
	  value: "super_rare",
	  from: 1,
	  to: 1,
	},
	{
	  value: "rare",
	  from: 2,
	  to: 5,
	},
	{
	  value: "original",
	  from: 5,
	  to: editionSize,
	},
  ];


const cleanName = (_str) => {
	let name = _str.slice(0, -4);
	
	return name;
};

//↓ devuelve los elementos de una carpeda en un arreglo
const getElements = (_path) => {
	return fs
		.readdirSync(_path) //devuelve un arreglo con los elementos
		.filter((fileName) => !/(^|\/)\.[^\/\.]/g.test(fileName)) //filtra los archivos no deseados
        //↓ devuelve un arreglo con los datos 
		.map((fileName) => {
			return {
				name: cleanName(fileName),
				path: `${_path}/${fileName}`,
			};
		});
};

//Configuracion de las capas 
const layers = [
	{
	  elements: {
		original: getElements(`${dir}/input/ball/original`),
		rare: getElements(`${dir}/input/ball/rare`),
		super_rare: getElements(`${dir}/input/ball/super_rare`),
	  },
	  position: { x: 0, y: 0 },
	  size: { width: width, height: height },
	},
	{
	  elements: {
		original: getElements(`${dir}/input/eye color/original`),
		rare: getElements(`${dir}/input/eye color/rare`),
		super_rare: getElements(`${dir}/input/eye color/super_rare`),
	  },
	  position: { x: 0, y: 0 },
	  size: { width: width, height: height },
	},
	{
	  elements: {
		original: getElements(`${dir}/input/iris/original`),
		rare: getElements(`${dir}/input/iris/rare`),
		super_rare: getElements(`${dir}/input/iris/super_rare`),
	  },
	  position: { x: 0, y: 0 },
	  size: { width: width, height: height },
	},
	{
	  elements: {
		original: getElements(`${dir}/input/shine/original`),
		rare: getElements(`${dir}/input/shine/rare`),
		super_rare: getElements(`${dir}/input/shine/super_rare`),
	  },
	  position: { x: 0, y: 0 },
	  size: { width: width, height: height },
	},
	{
	  elements: {
		original: getElements(`${dir}/input/bottom lid/original`),
		rare: getElements(`${dir}/input/bottom lid/rare`),
		super_rare: getElements(`${dir}/input/bottom lid/super_rare`),
	  },
	  position: { x: 0, y: 0 },
	  size: { width: width, height: height },
	},
	{
	  elements: {
		original: getElements(`${dir}/input/top lid/original`),
		rare: getElements(`${dir}/input/top lid/rare`),
		super_rare: getElements(`${dir}/input/top lid/super_rare`),
	  },
	  position: { x: 0, y: 0 },
	  size: { width: width, height: height },
	},
  ];


module.exports = { 
	layers,
    width,
	height,
	description,
	baseImageUri,
	editionSize,
	startEditionFrom,
	endEditionAt,
	rarityWeights,
  };