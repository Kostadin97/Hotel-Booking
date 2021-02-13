const express = require('express');
const routes = require('./routes');
const app = express();
const port = process.env.PORT || 3000;

require('./config/express')(app);
require('./config/mongoose')(app);

app.use(routes);

app.listen(port, () => console.log(`Server is running on port ${port}...`));