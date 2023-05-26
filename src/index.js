const express = require('express');
const path = require('path');
const morgan = require('morgan');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const { format } = require('timeago.js');
const methodOverride = require('method-override')

//init
const app = express();
require('./database');

//settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//middlewars
app.use(morgan('dev'));
app.use(methodOverride('_method'));
app.use(express.urlencoded({extended: false}));
const storage = multer.diskStorage({
    destination: path.join(__dirname, 'public/img/uploads'),
    filename: (req, file, cb, filename) => {
        cb(null, uuidv4() + path.extname(file.originalname));
    }
});
app.use(multer({storage: storage}).single('image'));

//global var
app.use((req,res,next)=>{
    app.locals.format = format;
    next();
})


//routes
app.use(require('./routes/index'));

//static files
app.use(express.static(path.join(__dirname,'public')));


//start server
app.listen(3000, () => {
    console.log('Server on port ',app.get('port'));
});