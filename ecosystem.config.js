module.exports = {
  apps: [{
    name: 'currency-converter',  // ← Keep this name
    script: './dist/main.js',
    instances: 1,
    exec_mode: 'fork',  // ← Important for 1GB RAM
    autorestart: true,
    watch: false,
    max_memory_restart: '500M',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    },
    error_file: '/home/chiedozie/.pm2/logs/currency-converter-error.log',
    out_file: '/home/chiedozie/.pm2/logs/currency-converter-out.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    merge_logs: true,
    min_uptime: '10s',
    max_restarts: 5,
    restart_delay: 4000
  }]
};