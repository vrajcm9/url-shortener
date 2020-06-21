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

app.get('*', async (req, res) => {
    const shortURLs = await ShortURL.find()
    res.render('index', { shortURLs: shortURLs });
});

app.get('/:shortURL', async (req, res) => {
    const shortURL = await ShortURL.findOne({ shortURL: req.params.shortURL })
    if(shortURL == null) return  res.sendStatus(404)

    shortURL.previousHourVisits++;
    shortURL.totalVisits++;
    shortURL.save();

    res.redirect(shortURL.fullURL);
})

app.post('/shortURLs', async (req, res) => {
    const shortURL = await ShortURL.create({ fullURL: req.body.fullURL });

    res.redirect('/');
})

app.listen(process.env.PORT || 5000);