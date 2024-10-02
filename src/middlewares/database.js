import fs from 'node:fs/promises'
import { title } from 'node:process'
import { deserialize } from 'node:v8'

const databasePath = new URL('../db.json', import.meta.url)

export class Database {
    #database = {}

    constructor(){
        fs.readFile(databasePath, 'utf8')
        .then( data => {
            this.#database = JSON.parse(data)
        })
        .catch(()=>{
            this.#persist()
        })
    }

    #persist(){
        fs.writeFile(databasePath, JSON.stringify(this.#database))
    }

    select( table, search ){
        let data = this.#database[table] ?? []

        if (search) {
            data = data.filter( row => {
                return Object.entries(search).some(([ key, value]) => {
                    return row[key].toLowerCase().includes(value.toLowerCase())
                })
            })
        }

        return data
    }

    insert( table, data ){

        if(Array.isArray(this.#database[table])){
            this.#database[table].push(data)
            this.#persist()
        } else {
            this.#database[table] = [data]
            this.#persist()
        }
    }

    update(table, id, title, description, updated_at){
        const rowIndex = this.#database[table].findIndex( row => row.id === id)

        if (rowIndex >-1){
            this.#database[table][rowIndex].title = title
            this.#database[table][rowIndex].description = description
            this.#database[table][rowIndex].updated_at = updated_at
           

            this.#persist()
        }
    }

    patch(table, id){
        const rowIndex = this.#database[table].findIndex( row => row.id === id)

        if ( rowIndex > -1 ){
            this.#database[table][rowIndex].completed_at = 'sim'
            
            this.#persist()
        }

    }

    delete(table, id){
        const rowIndex = this.#database[table].findIndex(row => row.id === id)

        if (rowIndex > -1){
            this.#database[table].splice(rowIndex, 1)
            this.#persist()
        }
    }
}