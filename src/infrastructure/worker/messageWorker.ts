import { Worker } from 'bullmq';
import { ChatApplicationService } from '../../application/service/ChatApplicationService';

import { ChatRepository } from '../repository/ChatRepository';
import { ChatDomainService } from '../../domain/service/ChatDomainService';
import { MessageDto } from '../../application/dto/MessageDto';
import { redisConecction } from '../config/redisConnection';
import { logger } from '../config/logger';

const repository = new ChatRepository();
const domainService = new ChatDomainService(repository);
const chatAppService = new ChatApplicationService(domainService);

export const messageWorker = new Worker(
  'message-queue',
  async job => {
    const { user, text } = job.data;
    logger.info(`Procesando mensaje de ${user}`);
    const message = new MessageDto(user, text);
    await chatAppService.createMessage(message);
  },
  { concurrency: 1,
    connection: {
      ...redisConecction,
      maxRetriesPerRequest: null,
    },
  } 
);

messageWorker.on('failed', (job, err) => {
  logger.error(`Job ${job?.id} falló con error: ${err.message}`, { stack: err.stack });
});
