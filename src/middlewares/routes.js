import { randomUUID } from 'node:crypto'
import { Database } from './database.js'
import { buildRoutePath } from './ultis/build-route-path.js'

const database = new Database()


export const routes = [
    {
        method: 'GET',
        path: buildRoutePath('/task'),
        handle: (req, res) => {

            return res.end(task)
        }
            
    },

    {
        method: 'POST',
        path:buildRoutePath('/task'),
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

            database.insert('tasks', task)

            return res.end(JSON.stringify(task))
        }

       
    },

    {
        method: 'PUT',
        path: buildRoutePath('/task/:id'),
        handle: ( req, res ) => {
            const {completed_at} = req.body
            const { id } = req.params
            database.update('tasks', id, {
                completed_at ,
                updated_at: String(new Date())
            })

            return res.writeHead(204).end()
        }


    },

    {
        method: 'DELETE',
        path: buildRoutePath('/task/:id'),
        handle: (req, res ) => {
            const { id } = req.params

            database.delete('tasks', id)

            return res.writeHead(204).end()
        }
    }
]