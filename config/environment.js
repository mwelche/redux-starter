// config/environment.js

const environment = {
  // LOCALHOST
  // =========
  development: {
    isProduction: false,
    API_HOST: 'https://api-dev.example.com',
    GOOGLE_ANALYTICS_ID: 'UA-XXXXXXXX-02',
    REDIRECT_URI: 'http://localhost:3000/',
  },
  // DEPLOYMENT ENVS
  // ===============
  production: {
    isProduction: true,
    API_HOST: process.env.API_ENV === 'development'
      ? 'https://api-dev.example.com' // DEV
      : 'https://api.example.com', // PROD
    GOOGLE_ANALYTICS_ID: process.env.API_ENV === 'development'
      ? 'UA-XXXXXXXX-02' // DEV 
      : 'UA-XXXXXXXX-01', // PROD
    REDIRECT_URI: process.env.API_ENV === 'development'
      ? 'https://staging.example.com/' // DEV
      : 'https://example.com/', // PROD
  },
}[process.env.NODE_ENV || 'development'];

export default Object.assign({
  APP: {
    SITE_NAME: 'THE SITE',
  },
  host: process.env.HOST || 'localhost',
  port: process.env.PORT,
  apiHost: process.env.HOST || 'localhost',
  apiPort: process.env.PORT,
}, environment);
