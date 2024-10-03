import assert from 'assert';
import { parse } from 'csv-parse';
import fs  from 'node:fs/promises' 


const fileData = '../../../tasks.csv'

var csvData=[]
fs.readFile(fileData).then()
    .parse({delimiter: ':'})
    .on('data', function(csvrow) {
        console.log(csvrow);
    
        csvData.push(csvrow);        
    })
    .on('end',function() {
      
      console.log(csvData);
    });

