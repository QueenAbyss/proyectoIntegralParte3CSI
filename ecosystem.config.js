module.exports = {
  apps: [
    {
      name: 'backend',
      script: 'server.js',
      cwd: './backend',
      env: {
        NODE_ENV: 'development',
        PORT: 3001
      },
      watch: true,
      ignore_watch: ['node_modules', 'logs']
    },
    {
      name: 'frontend',
      script: 'npm',
      args: 'run dev',
      cwd: './',
      env: {
        NODE_ENV: 'development',
        PORT: 3000
      },
      watch: false
    }
  ]
};
