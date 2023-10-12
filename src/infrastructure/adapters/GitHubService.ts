import { Octokit } from "octokit";
import { IGitRepositoryPort } from "../../domain/ports/GitServerice.js";
import { config } from "../config.js";

export class GitHubRepositoryAdapter implements IGitRepositoryPort {
  private octokit: Octokit;

  constructor() {
    this.octokit = new Octokit({ auth: config.GITHUB_TOKEN });
  }
  async findPullRequestByPullNumber(pullNumber: number) {
    return await this.octokit.request(
      "GET /repos/{owner}/{repo}/pulls/{pull_number}",
      {
        owner: config.REPO_OWNER,
        repo: config.REPO_NAME,
        pull_number: pullNumber,
        headers: {
          "X-GitHub-Api-Version": "2022-11-28",
        },
      }
    );
  }
}
