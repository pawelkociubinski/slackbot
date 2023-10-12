import { Request, Response } from "express";
import { ISlackControllerPort } from "../../domain/ports/SlackController.js";
import { getPullRequestNumberFromSentence } from "../../helpers/index.js";
import { MessageService } from "../../application/services/Messages.js";

interface IDependencies {
  messageService: MessageService;
}

export class SlackControllerAdapter implements ISlackControllerPort {
  constructor(private dependancies: IDependencies) {}

  async reactToMessageOnChannel(req: Request, res: Response) {
    const { messageService } = this.dependancies;
    const messageText = req.body.event.message.text;
    const pullRequestNumber = getPullRequestNumberFromSentence(messageText);

    await messageService.getReviewersNameByGitPullNumber(
      parseInt(pullRequestNumber)
    );
  }
}
