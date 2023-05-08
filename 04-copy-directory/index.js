const path = require('path');
const promises = require("fs/promises");

const initialDirectory = path.join(__dirname,"files");
const copyDirectory = path.join(__dirname,"files-copy");

(async function copyDirectory(initialDirectory,copyDirectory) 
{
    await promises.mkdir(copyDirectory,{ recursive: true });
    
    for(let file of await promises.readdir(initialDirectory, {withFileTypes: true})) 
    {
        var initialPath = path.join(initialDirectory, file.name);
        var copyPath = path.join(copyDirectory, file.name);

        if(file.isDirectory()) { await copyDir(initialPath, copyPath); } 
        else { await promises.copyFile(initialPath, copyPath); }
    }
})(initialDirectory,copyDirectory)
