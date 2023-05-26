const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1/proyecto_be', {
    useNewUrlParser: true
}).then(db => console.log('db is connected')).catch(err => console.error(err));

