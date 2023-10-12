import { HttpServerAdapter } from "./infrastructure/app.js";
import { config, logger } from "./infrastructure/config.js";
import { GitHubRepositoryAdapter } from "./infrastructure/adapters/GitHubService.js";
import { SlackControllerAdapter } from "./infrastructure/adapters/SlackController.js";
import { SystemControllerAdapter } from "./infrastructure/adapters/SystemController.js";
import { validateSlackMessageMiddleware } from "./infrastructure/middlewares/index.js";
import { MessageService } from "./application/services/Messages.js";
import { SlackRepositoryAdapter } from "./infrastructure/adapters/SlackRepositoryAdapter.js";

const server = HttpServerAdapter.getInstance();
const gitRepository = new GitHubRepositoryAdapter();
const communicatorRepository = new SlackRepositoryAdapter();
const messageService = new MessageService({
  gitRepository,
  communicatorRepository,
});
const slackController = new SlackControllerAdapter({ messageService });
const systemController = new SystemControllerAdapter();

server
  .configure({
    slackController,
    systemController,
    validateSlackMessageMiddleware,
  })
  .listen({ port: config.PORT }, () => {
    logger.info(`Server listening on port ${config.PORT}`);
  });
