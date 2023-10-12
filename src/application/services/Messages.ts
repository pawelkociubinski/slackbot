import { ICommunicatorRepositoryPort } from "../../domain/ports/CommunicatorRepository.js";
import { IGitRepositoryPort } from "../../domain/ports/GitServerice.js";

interface IDependencies {
  gitRepository: IGitRepositoryPort;
  communicatorRepository: ICommunicatorRepositoryPort;
}

export class MessageService {
  constructor(private dependencies: IDependencies) {}

  async getReviewersNameByGitPullNumber(pullRequestNumber: number) {
    const { gitRepository } = this.dependencies;
    const pullRequest =
      await gitRepository.findPullRequestByPullNumber(pullRequestNumber);
  }
}
