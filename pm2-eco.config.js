module.exports = {
    apps: [
        {
            name: "ponpub-service-prod",
            cwd: "./ponpub-demo/service",
            script: "yarn start",
            watch: "build",
            env: {
                PORT: 5000,
                NODE_ENV: "production",
            },
        },
        // {
        //     name: "ponpub-console-prod",
        //     cwd: "./ponpub-demo/console",
        //     script: "yarn start",
        //     watch: ".next",
        //     env: {
        //         PORT: 5002,
        //         NODE_ENV: "production",
        //     },
        // },
    ],
};
