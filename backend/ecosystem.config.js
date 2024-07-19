module.exports = {
    apps: [
      {
        name: 'studentswap',
        script: 'server.js',
        env: {
          PORT: 5000,
          NODE_ENV: 'development',
          MONGO_URI: 'mongodb://localhost:27017/studentswap',
          JWT_SECRET: 'f1c4c1c99bc9e6da1815c6bdb161e764c752a0f74beb29c1a161a41f5b1c44d1'
        },
        env_production: {
          NODE_ENV: 'production'
        }
      }
    ]
  };
  