module.exports = {
  apps: [{
    name: 'currency-api',           // Consistent name – matches workflow
    script: './dist/main.js',       // Relative path – works because PM2 runs from ~/current
    instances: 1,
    exec_mode: 'cluster',           // Enables zero-downtime reload
    autorestart: true,
    watch: false,
    max_memory_restart: '500M',
    wait_ready: true,
    listen_timeout: 8000,
    kill_timeout: 3000,
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    },
    error_file: '/home/chiedozie/.pm2/logs/currency-api-error.log',
    out_file: '/home/chiedozie/.pm2/logs/currency-api-out.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    merge_logs: true,
    min_uptime: '10s',
    max_restarts: 10,
    restart_delay: 4000
  }]
};