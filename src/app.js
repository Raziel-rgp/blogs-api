const express = require('express');
const { loginRoutes, userRoutes, categoryRoutes } = require('./routes');
// ...

const app = express();

app.use(express.json());

// não remova ou mova esse endpoint
app.get('/', (_request, response) => {
  response.send();
});

app.use('/login', loginRoutes);
app.use('/user', userRoutes);
app.use('/categories', categoryRoutes);

// ...

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
