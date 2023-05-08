const fs = require("fs");
const promises = require("fs/promises");
const path = require('path');
const folderPath = path.join(__dirname, "secret-folder");

const getSize = (folderPath, fileSize) => {
    fs.stat(folderPath, (error, stats) => {
        if (error) { console.log(err); return; }
        fileSize(stats.size * 0.001+" kb")
    })
}

(async function readDirectory()
{
    for (const file of await promises.readdir(folderPath, {withFileTypes:true}))
    {
        if(file.isFile())
        {
            getSize(folderPath + "/" + file.name, (fileSize) => 
            {
                var name = file.name.replace(path.extname(file.name),"");
                var extname = path.extname(file.name).replace(".","");
                console.log( name + " - "+  extname + " - "+ fileSize);
            })  
        } 
    }
})()