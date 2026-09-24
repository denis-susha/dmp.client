// Usage: pm2 start pm2.config.js --env <local|dev|prod> (defaults to prod).
const argEnvIndex = process.argv.indexOf("--env");
const argEnv = (argEnvIndex !== -1 && process.argv[argEnvIndex + 1]) || "";

const INSTANCES_BY_ENV = {
    local: 2,
    dev: 2,
    prod: 4,
};

const runEnv = argEnv in INSTANCES_BY_ENV ? argEnv : "prod";

module.exports = {
    apps: [
        {
            name: "dmp-client",
            script: "next",
            args: "start",
            instances: INSTANCES_BY_ENV[runEnv],
            exec_mode: "cluster",
            max_memory_restart: "2000M",
            env_local: {
                APP_ENV: "local",
            },
            env_dev: {
                APP_ENV: "dev",
            },
            env_prod: {
                APP_ENV: "prod",
            },
        },
    ],
};
