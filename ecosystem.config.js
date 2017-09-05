module.exports = {
  apps : [{
    name        : "app",
    script      : "./server.js",
    watch       : true,
    env: {
      "NODE_ENV": "development",
    },
    env_production : {
       "NODE_ENV": "production"
    }
  },{
    name       : "cron",
    script     : "./cron.js"
  }]
}