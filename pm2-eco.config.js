module.exports = {
    apps: [
        {
            name: "ponpub-service-prod",
            cwd: "./service",
            script: "yarn start",
            watch: "build",
            env: {
                PORT: 5000,
                NODE_ENV: "production"
            }
        },
        {
            name: "ponpub-console-prod",
            cwd: "./console",
            script: "yarn start",
            watch: ".next",
            env: {
                PORT: 5002,
                NODE_ENV: "production"
            }
        }
    ]
};
