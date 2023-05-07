const process = require("process");
const fs = require('fs');
const path = require('path');
var writeStream = fs.createWriteStream(path.join(__dirname, '/file.txt'));

process.stdout.write("Hi! I'm Nastya.\n");

process.on('SIGINT', () =>
{
    console.log("Goodbye!");
    process.exit();
});

process.stdin.on("data", data=>
{
    if(data.toString().trim()=="exit") 
    {
        console.log("Goodbye!");
        process.exit();
    }
    else { writeStream.write(data); }
});