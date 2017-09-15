const env = process.env.NODE_ENV || 'development';
const port = process.env.PORT || 5000;
const src = env === 'production' ? './build/server' : './src/server';

const app = require(src);
app.listen(port);
