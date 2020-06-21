const express = require('express');
const mongoose = require('mongoose');
const ShortURL = require('./models/shortURL');

const app = express();

mongoose.connect('mongodb://localhost/URLShortener', {
    useNewUrlParser: true, useUnifiedTopology: true
});

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));

app.get('/', async (req, res) => {
    try {
        const shortURLs = await ShortURL.find();
        res.render('index', { shortURLs: shortURLs });
    }
    catch(err) {
        res.sendStatus(404);
    }
});

app.get('/:shortURL', async (req, res) => {
    try{    
        const shortURL = await ShortURL.findOne({ shortURL: req.params.shortURL })

        shortURL.previousHourVisits++;
        shortURL.totalVisits++;
        await shortURL.save();

        res.redirect(shortURL.fullURL);
    }
    catch(err) {
        res.sendStatus(404);
    }
})

app.post('/shortURLs', async (req, res) => {
    try {
        const shortURL = await ShortURL.create({ fullURL: req.body.fullURL });

        res.redirect('/');
    }
    catch (err) {
        res.sendStatus(404);
    }
})

app.listen(process.env.PORT || 5000);