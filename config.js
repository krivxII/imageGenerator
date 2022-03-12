const fs = require("fs");
const dir = __dirname;
const width = 1000;
const height = 1000;

const rarity = [
	{ key: "", val: "original" },
	{ key: "_r", val: "rare" },
	{ key: "_sr", val: "super rare" },
];

const addRarity = (_str) => {
	let itemRarity;
	rarity.forEach((r) => {
		if (_str.includes(r.key)) {
			itemRarity = r.val;
		}
	});
	return itemRarity;
};

const cleanName = (_str) => {
	let name = _str.slice(0, -4);
	rarity.forEach((r) => {
		name = name.replace(r.key, "");
	});
	return name;
};

const getElements = (path) => {
	return fs
		.readdirSync(path) //devuelve un arreglo con los elementos
		.filter((item) => !/(^|\/)\.[^\/\.]/g.test(item)) //filtra los archivos no deseados
        //↓ devuelve un arreglo con los datos 
		.map((i, index) => {
			return {
				id: index + 1,
				name: cleanName(i),
				fileName: i,
				rarity: addRarity(i),
			};
		});
};

const layers = [
	{
	    id:1,
	    name:"background",
	    location:`${dir}/input/background`,
	    elements:getElements(`${dir}/input/background`),
	    position:{x:0,y:0},
	    size:{width:width,height:height},
	},
	{
		id: 2,
		name: "Eyeball",
		location: `${dir}/input/Eyeball`,
		elements: getElements(`${dir}/input/Eyeball`),
		position: { x: 0, y: 0 },
		size: { width: width, height: height },
	},
	{
	    id:3,
	    name:"Eye color",
	    location:`${dir}/input/Eye color`,
	    elements:getElements(`${dir}/input/Eye color`),
	    position:{x:0,y:0},
	    size:{width:width,height:height},

	},
	{
	    id:4,
	    name:"Iris",
	    location:`${dir}/input/Iris`,
	    elements:getElements(`${dir}/input/Iris`),
	    position:{x:0,y:0},
	    size:{width:width,height:height},

	},
	{
	    id:5,
	    name:"Shine",
	    location:`${dir}/input/Shine`,
	    elements:getElements(`${dir}/input/Shine`),
	    position:{x:0,y:0},
	    size:{width:width,height:height},

	},
	{
	    id:6,
	    name:"Bottom lid",
	    location:`${dir}/input/Bottom lid`,
	    elements:getElements(`${dir}/input/Bottom lid`),
	    position:{x:0,y:0},
	    size:{width:width,height:height},

	},
	{
	    id:7,
	    name:"Top lid",
	    location:`${dir}/input/Top lid`,
	    elements:getElements(`${dir}/input/Top lid`),
	    position:{x:0,y:0},
	    size:{width:width,height:height},
	 }
];

module.exports = { layers, width, height };
