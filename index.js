const { app } = require('./app');

app.listen('8080', '0.0.0.0', () => {
  console.log('\nRunning server on port: 8080');
});
