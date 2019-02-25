const { app, server } = require('./app');

app.set('port', process.env.PORT || 4000);
app.listen(app.get('port'), () =>
  console.log(
    `Server ready at http://localhost:${app.get('port')}${server.graphqlPath}`
  )
);
