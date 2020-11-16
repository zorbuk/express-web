const express = require('express');

// express app
const app = express();

require('./db/mongoose')
const taskRouter = require('./routers/task')
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

app.use((req, res, next) => {
  console.log('new request made:');
  console.log('host: ', req.hostname);
  console.log('path: ', req.path);
  console.log('method: ', req.method);
  next();
});


app.get('/', async (req, res) => {
  console.log('request: ', req, res)
  if(Object.keys(req.query).length > 0){
    if('url' in req.query) {
      app.locals.turtleRouter = req.query.url;
      res.render('index', { title: 'Home', turtles: data });
      return;
    }
  }

  res.render('index', { title: 'Home', turtles: '' })

  //await Turtle.find().then( (data) => {
        //res.render('index', { title: 'Home', turtles: data })
    //});
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
