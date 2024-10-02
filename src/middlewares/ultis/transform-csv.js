import { parse } from "csv-parse";
import fs from 'node:fs/promises'

const records = []

fs.createReadStream('../../../tasks.csv')
.pipe(
    parse({
        
    })
)