const express = require('express')
const fs = require('fs')
const path = require('path')

const app = express()

app.get('/files', function(req, res) {
    const fp = path.join(__dirname, 'files')

    fs.readdir(fp, function(err, data) {
        if (err) {
            return res.status(500).json({error: 'Failed to read files'})        
        }
        else {
            res.json(data)
        }
    })
})

app.get('/file/:filename', function(req, res) {
    const rfp = path.join(__dirname, 'files', req.params.filename)

    fs.readFile(rfp, 'utf-8', function(err, data) {
        if (err) {
            return res.status(404).send('File not found')
        }
        else {
            res.send(data)
        }
    })
})

// Fixed: Use '/*' instead of '*' for catch-all route
app.all('/*', function (req, res) {
    res.status(404).send('route is not valid')  
})

app.listen(3000, function() {
    console.log('Server running on port 3000')
})