const converter = require('swagger2openapi');
let options = {};
const glob = require("glob")
const fs = require('fs').promises;
const yaml = require('yaml');
const path = require('path');

async function convert() {

    try {
        //we first search for all the files that are in the directory and subdirectories
        //modify your pattern to match it your needs
        const listOfSwaggerFiles = glob.sync('integration/*.yml');

        listOfSwaggerFiles.forEach( async item => {
            //result has many properties, not only the result of conversion but also for example the input
            const extension = path.extname(item);
            const filename = path.basename(item, extension);
            const result = await converter.convertFile(item, options);
            //also available are asynchronous convertObj, convertUrl, convertStr and convertStream functions
            
            //get path where oryginal file is located
            const pathOryginal = item.substring(0, item.lastIndexOf("/"));

            //and put it where you want, here it is in the same location as oryginal file

            const newFileName = filename + '_30.yaml';
            const writeDestination = path.resolve('integration/Output', newFileName);
            await fs.writeFile(writeDestination, yaml.stringify(result.openapi));
        })
    } catch (error) {
        console.log(error)
    }
}

convert()