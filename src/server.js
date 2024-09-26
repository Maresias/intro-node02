import http from 'node:http'
import { json } from './middlewares/json.js'

const server = http.createServer( async ( req, res ) => {
    //const { method, url } = req
    await json(req, res)

    return res.writeHead(404).end("Not Found")
})
server.listen(3334) 