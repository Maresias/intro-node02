import { randomUUID } from 'node:crypto'
import { Database } from './database.js'

const database = new Database()


export const routes = [
    {
        method: 'GET',
        path: '/task',
        handle: (req, res) => {
            
            return res.end()
        }
            
    },

    {
        method: 'POST',
        path: '/task',
        handle: ( req, res ) => {
            const { title, description, completed_at } =  req.body

            const task  = {
                id: randomUUID(),
                title,
                description,
                completed_at,
                created_at: String(new Date()),
                updated_at: "",

            }

            return res.end(JSON.stringify(task))
        }

       
    }
]