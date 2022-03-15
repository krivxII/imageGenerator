const fs = require('fs');
const {createCanvas,loadImage}=require('Canvas');
const canvas = createCanvas(1080,1920);
const contex = canvas.getContext("2d");
const {layers,width,height} = require("./config2.js")
const edition = 20;

const saveLayer =  (_canvas,_edition) => {
   fs.writeFileSync(`./output2/${_edition}.png`,_canvas.toBuffer("image/png"))
}

const drawLayer = async (_layer,_edition) => {  
    let element =  
        _layer.elements[Math.floor(Math.random() * _layer.elements.length)];// se elige un elemento al azar
    const image = await loadImage(`${_layer.location}/${element.fileName}`);//se consigue la imagen
    console.log(image)
    contex.drawImage(image,
            _layer.position.x,
            _layer.position.y,
            _layer.size.width,
            _layer.size.height);
            saveLayer(canvas,_edition)
    console.log(`cree la capa ${_layer.name} con el elemento ${element.name}` )
};

for (let i = 0 ; i<edition ; i++){
    layers.forEach((layer)=>{
        drawLayer(layer,i);
    })
}