import * as core from '@actions/core';
import * as github from '@actions/github';

async function run() {
  const message = core.getInput('message');
  const branch = core.getInput('branch');

  if (!message) throw new Error("Required 'message' input");

  if (!branch) throw new Error("Required 'branch' input");

  if (!process.env.GITHUB_TOKEN)
    throw new Error('Required Github access token');

  const octokit = new github.GitHub(process.env.GITHUB_TOKEN);

  const { data: pullRequests } = await octokit.pulls.list({
    owner: github.context.repo.owner,
    repo: github.context.repo.repo,
  });

  const prAssociatedWithBranch = pullRequests.find(
    ({ head: { ref } }) => ref === branch,
  );

  if (prAssociatedWithBranch) {
    await octokit.issues.createComment({
      owner: prAssociatedWithBranch.head.repo.owner.login,
      repo: prAssociatedWithBranch.head.repo.name,
      // eslint-disable-next-line @typescript-eslint/camelcase
      issue_number: prAssociatedWithBranch.number,
      body: message,
    });
  }
}

try {
  run();
} catch (e) {
  core.setFailed(e.message);
  throw e;
}
