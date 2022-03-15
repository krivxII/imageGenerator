const fs = require("fs");
const dir = __dirname;
const width = 1000;
const height = 1000;
 const description = "This is an NFT made by the coolest generative code.";
const baseImageUri = "https://hashlips/nft"; 
const startEditionFrom = 1;
const endEditionAt = 10;
const editionSize = 10; 

const raceWeights = [
	{
		value:"human",
		from: 1,
		to: editionSize,
	},
]




const races = {
	human:{
		name: "human",
		layers:[
			{
				name: "background",
				elements:[
					{
						id:0,
						name:"LightBlue",
						path:`${dir}/input/human/1-background/LightBlue.png`,
						weight:100
					},
					{
						id:1,
						name:"Orange",
						path:`${dir}/input/human/1-background/Orange.png`,
						weight:20
					},
				],
				position: { x: 0, y: 0 },
				size: { width: width, height: height },
				
			},
			{
				name: "suit",
				elements:[
					{
						id:0,
						name:"BackPack",
						path:`${dir}/input/human/2-suit/BackPack.png`,
						weight:100
					},
					{
						id:1,
						name:"Blue",
						path:`${dir}/input/human/2-suit/Blue.png`,
						weight:50
					}
				],
				position: { x: 0, y: 0 },
				size: { width: width, height: height },
				
			},
			{
				name: "shoulder",
				elements:[
					{
						id:0,
						name:"AlienPatch",
						path:`${dir}/input/human/3-shoulder/AlienPatch.png`,
						weight:100
					},
					{
						id:1,
						name:"Commet",
						path:`${dir}/input/human/3-shoulder/Commet.png`,
						weight:30
					},
					
				],
				position: { x: 0, y: 0 },
				size: { width: width, height: height },
				
			},
			{
				name: "pin",
				elements:[
					{
						id:0,
						name:"AlienPin",
						path:`${dir}/input/human/4-pin/AlienPin.png`,
						weight:100
					},
					{
						id:1,
						name:"CoinPin",
						path:`${dir}/input/human/4-pin/CoinPin.png`,
						weight:20
					},
					
				],
				position: { x: 0, y: 0 },
				size: { width: width, height: height },
				
			},
			{
				name: "skin",
				elements:[
					{
						id:0,
						name:"Alien",
						path:`${dir}/input/human/5-skin/Alien.png`,
						weight:100
					},
					{
						id:1,
						name:"Black",
						path:`${dir}/input/human/5-skin/Black.png`,
						weight:20
					},
					
				],
				position: { x: 0, y: 0 },
				size: { width: width, height: height },
				
			},
			{
				name: "facial-hair",
				elements:[
					{
						id:0,
						name:"AlienPin",
						path:`${dir}/input/human/6-facial-hair/Goatee.png`,
						weight:100
					},
					{
						id:1,
						name:"CoinPin",
						path:`${dir}/input/human/6-facial-hair/Mustache.png`,
						weight:20
					},
					
				],
				position: { x: 0, y: 0 },
				size: { width: width, height: height },
				
			},
			{
				name: "mask",
				elements:[
					{
						id:0,
						name:"Mask",
						path:`${dir}/input/human/7-mask/Mask.png`,
						weight:100
					},
					{
						id:1,
						name:"NoMask",
						path:`${dir}/input/human/7-mask/NoMask.png`,
						weight:20
					},
					
				],
				position: { x: 0, y: 0 },
				size: { width: width, height: height },
				
			},
			{
				name: "hair",
				elements:[
					{
						id:0,
						name:"BlondeBun",
						path:`${dir}/input/human/8-hair/BlondeBun.png`,
						weight:100
					},
					{
						id:1,
						name:"Brown",
						path:`${dir}/input/human/8-hair/Brown.png`,
						weight:20
					},
					
				],
				position: { x: 0, y: 0 },
				size: { width: width, height: height },
				
			},
			{
				name: "accessoriespin",
				elements:[
					{
						id:0,
						name:"NightVision",
						path:`${dir}/input/human/9-accessories/NightVision.png`,
						weight:100
					},
					{
						id:1,
						name:"Sunglasses",
						path:`${dir}/input/human/9-accessories/Sunglasses.png`,
						weight:20
					},
					
				],
				position: { x: 0, y: 0 },
				size: { width: width, height: height },
				
			},
			{
				name: "headwear",
				elements:[
					{
						id:0,
						name:"AlieGlassDomenPin",
						path:`${dir}/input/human/10-headwear/GlassDome.png`,
						weight:100
					},
					{
						id:1,
						name:"Headset",
						path:`${dir}/input/human/10-headwear/Headset.png`,
						weight:20
					},
					
				],
				position: { x: 0, y: 0 },
				size: { width: width, height: height },
			},

		],

	}
}


module.exports = { 
    width,
	height,
	description,
	baseImageUri,
	editionSize,
	startEditionFrom,
	endEditionAt,
	races,
	raceWeights
  };