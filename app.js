const express = require('express');

// express app
const app = express();

require('./db/mongoose')
const taskRouter = require('./routers/task')

const port = process.env.PORT

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
console.log('request: ',req.url,req.method,req.path)
  const blogs = [
    {title: 'Pastel de zanahoria', snippet: 'Lorem ipsum dolor sit amet consectetur'},
    {title: 'Zhulien de champiñones', snippet: 'Lorem ipsum dolor sit amet consectetur'},
    {title: 'Shakshuka', snippet: 'Lorem ipsum dolor sit amet consectetur'},
  ];
  res.render('index', { title: 'Home', blogs });
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});

app.get('/novedades', (req, res) => {
  res.render('novedades', {title: 'Novedades'});
})

app.get('/numeros', (req, res) => {
  res.render('numeros', {title: 'Numeros'});
})

app.get('/limones', (req, res) => {
  res.render('limones', {title: 'Limones'});
})

app.get('/blogs/create', (req, res) => {
  res.render('create', { title: 'Create a new blog' });
});

app.get('/canciones', (req, res) => {
  res.render('canciones', { title: '' });
});

app.get('/cantos', (req, res) => {
  res.render('cantos', { title: '' });
});

app.get('/canticos', (req, res) => {
  res.render('canticos', { title: '' });
});

// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});
