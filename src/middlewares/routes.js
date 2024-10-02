import { randomUUID } from 'node:crypto'
import { Database } from './database.js'
import { buildRoutePath } from './ultis/build-route-path.js'

const database = new Database()


export const routes = [
    {
        method: 'GET',
        path: buildRoutePath('/task'),
        handle: (req, res) => {
            const { search } =  req.query

            const task = database.select('tasks', search ? {
                title: search
            }: null)

            return res.end(JSON.stringify(task))
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
            const { title, description } = req.body
            const { id } = req.params

            const updated_at = String(new Date())

            database.update('tasks', id, 
                title,
                description,
                updated_at 
            )

            return res.writeHead(204).end()

        }
        
    },

    {
        method: 'PATCH',
        path: buildRoutePath('/task/:id/complete'),
        handle: ( req, res ) => {
            const { id } = req.params
            database.patch('tasks', id )

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