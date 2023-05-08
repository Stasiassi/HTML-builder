const path = require('path');
const promises = require("fs/promises");
const  fs = require('fs');

const initialDirectory = path.join(__dirname,"styles");
const newFile = path.join(path.join(__dirname,"project-dist"),"bundle.css");
const writeStream = fs.createWriteStream(newFile);

(async function mergeStyles()
{
    for (const file of await promises.readdir(initialDirectory, {withFileTypes:true}))
    {
        if(file.isFile())
        {
            if((path.extname(file.name).replace(".","")) == "css")
            {
                var readStream = fs.createReadStream(path.join(initialDirectory,file.name), {flags: 'r'});
                readStream.on("data", data => writeStream.write(data));
            }
        }
    }
})()