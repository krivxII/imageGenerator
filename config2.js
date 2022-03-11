const fs = require("fs");
const dir =__dirname;
const width=1080;
const height=1920;

const rarity = [
    { key: "", val: "original" },
    { key: "_r", val: "rare" },
    { key: "_sr", val: "super rare" },
];



const addRarity = (_str) => {
    let itemRarity;
    rarity.forEach((r) => {
        if (_str.includes(r.key)){
            itemRarity = r.val;
        }
    });
    return itemRarity;
};

const cleanName = (_str) => {
let name = _str.slice(0,-4)
rarity.forEach((r) => {
name = name.replace(r.key,"")
})
return name
};

const getElements = (path) => {
  return fs
            .readdirSync(path)
            .filter((item) =>  !/(^|\/)\.[^\/\.]/g.test(item))
            .map((i,index) => {
                return {
                    id:index+1,
                    name: cleanName(i),
                    fileName: i,
                    rarity: addRarity(i)
                }
            })
};

const layers = [{
    id:1,
    name:"fondo",
    location:`${dir}/input2/fondo`,
    elements:getElements(`${dir}/input2/fondo`),
    position:{x:0,y:0},
    size:{width:width,height:height},

},
{
    id:2,
    name:"cuerpo",
    location:`${dir}/input2/cuerpo`,
    elements:getElements(`${dir}/input2/cuerpo`),
    position:{x:0,y:0},
    size:{width:width,height:height},

},
{
    id:3,
    name:"frutas",
    location:`${dir}/input2/frutas`,
    elements:getElements(`${dir}/input2/frutas`),
    position:{x:0,y:0},
    size:{width:width,height:height},

},
{
    id:4,
    name:"cabeza",
    location:`${dir}/input2/cabeza`,
    elements:getElements(`${dir}/input2/cabeza`),
    position:{x:0,y:0},
    size:{width:width,height:height},

},
{
    id:5,
    name:"boca",
    location:`${dir}/input2/boca`,
    elements:getElements(`${dir}/input2/boca`),
    position:{x:0,y:0},
    size:{width:width,height:height},

},
{
    id:6,
    name:"lentes",
    location:`${dir}/input2/lentes`,
    elements:getElements(`${dir}/input2/lentes`),
    position:{x:0,y:0},
    size:{width:width,height:height},

}]

module.exports = {layers,width,height};


