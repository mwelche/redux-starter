module.exports = {
  apps : [{
    name: 'redux-starter',
    script: 'index.js',
    exec_mode: 'cluster',
    instances: 'max',
    // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
    autorestart: true,
    watch: true,
    max_memory_restart: '1G',
    env: {
      "API_ENV": 'development',
      "NODE_ENV": 'production'
    },
    env_production: {
      "API_ENV": 'production',
      "NODE_ENV": 'production'
    }
  }],

  deploy : {
    production : {
      user : 'node',
      host : '212.83.163.1',
      ref  : 'origin/master',
      repo : 'git@github.com:mwelche/redux-starter.git',
      path : '/var/www/production',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production --update-env'
    }
  }
};
