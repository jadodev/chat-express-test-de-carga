import { Queue } from 'bullmq';
import IORedis from 'ioredis';

const connection = new IORedis({
  host: 'redis',
  port: 6379,
});

export const messageQueue = new Queue('message-queue', {
  connection,
});