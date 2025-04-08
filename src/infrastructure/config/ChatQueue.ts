import { Queue } from 'bullmq';
import IORedis from 'ioredis';

const connection = new IORedis();

export const messageQueue = new Queue('message-queue', {
  connection,
});