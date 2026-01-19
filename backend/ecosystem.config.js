module.exports = {
  apps: [
    {
      name: "app",           // Name in PM2
      script: "npm",           // Run npm itself
      args: "run start",       // The npm script to run
      cwd: __dirname,          // Make sure PM2 runs in your project root
      env: {
        PORT: 15558,           // Optional environment variable
        NODE_ENV: "production"
      }
    }
  ]
};
