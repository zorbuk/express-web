const express = require('express');

// express app
const app = express();

require('./db/mongoose')
const taskRouter = require('./routers/task')
const taskTurtle = require('./routers/turtle')

const port = process.env.PORT || 3000

// listen for requests
app.listen(port, ()=>{
  console.log(`Server listening to port ${port}`)
});

// register view engine
app.set('view engine', 'ejs');

// middleware & static files
app.use(express.static('public'));

app.use((req, res, next) => {
  console.log('new request made:');
  console.log('host: ', req.hostname);
  console.log('path: ', req.path);
  console.log('method: ', req.method);
  next();
});


app.get('/', (req, res) => {
console.log('request: ', req, res)
  await Turtle.findAll()
    .then( (data) => {
        res.render('index', { title: 'Home', turtles: data })
    });
    //res.render('index', { title: 'Home', turtles: {} })
});

app.get('/imagenes', (req, res) => {
  res.render('imagenes', { title: 'Imagenes' });
});

app.get('/contacto', (req, res) => {
  res.render('contacto', {title: 'Contacto'});
})

// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});
