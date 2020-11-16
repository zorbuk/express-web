const express = require('express');

// express app
const app = express();

require('./db/mongoose')
const Turtle = require('./models/turtle')
const turtleRouter = require('./routers/turtle')

const port = process.env.PORT || 3000

// listen for requests
app.listen(port, ()=>{
  console.log(`Server listening to port ${port}`)
});

// register view engine
app.set('view engine', 'ejs');

// middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(express.json()); // Parse JSON bodies

app.use((req, res, next) => {
  console.log('new request made:');
  console.log('host: ', req.hostname);
  console.log('path: ', req.path);
  console.log('method: ', req.method);
  next();
});


app.get('/', async (req, res) => {
  await Turtle.find({}).then((data) => {
        res.render('index', { title: 'Home', turtles: data })
    });
});

app.get('/imagenes', (req, res) => {
  await Turtle.find({}).then((data) => {
    res.render('imagenes', { title: 'Imagenes', turtles: data })
});
});

app.get('/contacto', (req, res) => {
  res.render('contacto', {title: 'Contacto'});
})

// routing
app.use('/api', turtleRouter);

// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});
