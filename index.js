const  express = require('express')
const  mongoose = require('mongoose')
const  config =  require('config')

const app = express()

app.use('/api/auth', require('./routes/auth.routes'))

const PORT = config.get('port') || 5000

async function start() {

    try {
        
        await mongoose.connect(config.get('mongoUri'), {
            useNewUrlParser: true
        })

        app.listen(PORT, () => {
            console.log(`Server has been started in port ${PORT}`);
        })

    } catch (error) {
        console.log(error);
    }
}

start()