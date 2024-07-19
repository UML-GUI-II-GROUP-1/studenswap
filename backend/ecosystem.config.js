module.exports = {
    apps: [
      {
        name: 'studentswap',
        script: 'server.js',
        env: {
          PORT: 5000,
          NODE_ENV: 'development',
          MONGO_URI: 'mongodb://localhost:27017/studentswap',
          JWT_SECRET: 'secret_key'
        },
        env_production: {
          NODE_ENV: 'production'
        }
      }
    ]
  };
  