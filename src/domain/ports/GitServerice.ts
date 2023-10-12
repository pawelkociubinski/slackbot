export interface IGitRepositoryPort {
  findPullRequestByPullNumber(pullNumber: number): Promise<any>;
}
