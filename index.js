const  express = require('express')
const  mongoose = require('mongoose')
const  config =  require('config')
const cors  = require('cors')
const fileUpload = require('express-fileupload')
const path = require('path')
const filePathMiddleware = require('./middlewaree/filepath.middleware')

const app = express()

app.use(fileUpload({}))
app.use(cors({origin: '*'}))
app.use(filePathMiddleware(path.resolve(__dirname, 'uploads')))

app.use(express.json({extended: true}))
app.use(express.static('uploads'))
app.use(express.static('avatars'))
app.use(express.urlencoded({limit: '50mb', extended: true}))

app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/links', require('./routes/links.routes'))
app.use('/api/files/download', require('./routes/download.routes'))
app.use('/api/files', require('./routes/files.routes'))
app.use('/api/user', require('./routes/user.routes'))

const PORT = process.env.PORT || config.get('port') || 5000

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