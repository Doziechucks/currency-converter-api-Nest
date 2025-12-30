module.exports = {
  apps: [{
    name: 'currency-converter',
    script: './dist/main.js',
    instances: 1,
    exec_mode: 'fork',
    autorestart: true,
    watch: false,
    max_memory_restart: '500M',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    },
    min_uptime: '10s',
    max_restarts: 10,
    restart_delay: 4000
  }]
};

