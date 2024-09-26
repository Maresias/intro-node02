export async function json (req, res){

    const buffers = []

    for await (const chunk of req){
        buffers.push(chunk)
    }

    try{

        req.body = JSON.stringify(Buffer.concat(buffers).toString())

    }catch{
        req.body = null
    }

    res.setHeader('content-type', 'application/json')

}