const core = require('@actions/core');
const github = require('@actions/github');
const http = require('@actions/http-client');

const SERVER = "http://change.me:8080";

async function registerWithServer(url) {
        /* Extract input parameters */
        const payload = {
                duration: core.getInput('duration'),
                deadline: core.getInput('deadline'),
                depends: core.getInput('depends'),
                url: url,
        };

        console.log(`The job takes ${payload.duration} minutes`);
        console.log(`The job must be done before ${payload.deadline}`);
        console.log(`The job depends on ${payload.depends}`);
        console.log(`The Github url ${payload.url}`);

        /* Send job information to server */
/*         let client = new http.HttpClient();
        let response = await client.post(SERVER, JSON.stringify(payload));
        let body = await response.readBody();
        console.log(`Request: ${body}`); */

        core.setOutput("status", "The job is sheduled for XX:XX:XX");
        core.setFailed("Job is scheduled");
}

async function runOnGoodCarbon(job, whAction, whJobs) {
        /* Is the webhook meant for this action */
        if (whAction !== "ca-action") {
                return;
        }

        /* Was the job already executed the first time it run */
        if (!whJobs.includes(job)) {
                core.setOutput("status", "Job already run");
                core.setFailed("Job already run");
                return;
        }

        core.setOutput("status", "Job can run now at good carbon sitsuation");
}

async function main() {
        /* Check trigger of workflow. Is this triggered by normally or by the server. */
        if (github.context.eventName === "repository_dispatch") {
                const payload = github.context.payload;
                await runOnGoodCarbon(github.context.job, payload.action, payload.client_payload.jobs);
        } else {
                const url = `https://api.github.com/repos/${github.context.repo.owner}/${github.context.repo.repo}/dispatches`;
                await registerWithServer(url);
        }
}

main();
