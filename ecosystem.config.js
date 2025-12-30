module.exports = {
  apps: [{
    name: 'currency-api',  // ← Change to this consistent name
    script: './dist/main.js',
    instances: 1,          // Or 'max' if you want to utilize cores (still low RAM usage possible)
    exec_mode: 'cluster',  // ← Enable for zero-downtime reloads
    autorestart: true,
    watch: false,
    max_memory_restart: '500M',
    wait_ready: true,      // Optional: Helps PM2 wait for app to be ready during reload
    listen_timeout: 3000,  // Optional: Gives app time to start listening
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    },
    error_file: '/home/chiedozie/.pm2/logs/currency-api-error.log',
    out_file: '/home/chiedozie/.pm2/logs/currency-api-out.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    merge_logs: true,
    min_uptime: '10s',
    max_restarts: 5,
    restart_delay: 4000
  }]
};