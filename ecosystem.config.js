module.exports = {
  apps : [{
    name        : "app",
    script      : "./server.js",
    ignoreWatch: "peritext-generator-next",
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