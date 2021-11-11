const  express = require('express')
const  mongoose = require('mongoose')
const  config =  require('config')
const cors  = require('cors')

const app = express()

app.use(cors({origin: '*'}))

app.use(express.json({extended: true}))
app.use(express.urlencoded({limit: '50mb', extended: true}))

app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/links', require('./routes/links.routes'))
app.use('/api/files', require('./routes/files.routes'))

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