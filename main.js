require('dotenv').config();
const path = require('path'),
express = require('express'),
cors = require('cors'),
compression = require('compression'),
cookieParser = require('cookie-parser'),
helmet = require('helmet'),
{Journal, Admin} = require('./src/router/index'),
PORT = process.env.PORT || 8000,
app = express();

app.use(helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false,
}));
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST']
}));
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', false);
    next();
});
app.use(cookieParser())
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}))
app.use(express.static('src/public'))
app.use('/', Journal)
app.use('/admin', Admin)
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '/src/views'));

app.listen( PORT, ()=>{
    console.log("Portfolio started on", PORT);
})