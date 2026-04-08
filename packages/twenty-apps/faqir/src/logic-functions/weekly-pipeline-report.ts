import { defineLogicFunction } from 'twenty-sdk';
import { CoreApiClient } from 'twenty-client-sdk/core';

// Runs every Monday at 08:00 — summarises the pipeline and logs it
// TODO: replace console.log with an email/Slack notification
const handler = async (): Promise<void> => {
  const client = new CoreApiClient();

  const result = await client.query({
    prospects: {
      status: true,
      name: true,
      __args: {
        filter: {
          status: { neq: 'LOST' },
        },
      },
    },
  });

  const prospects = (result.prospects as Array<{ status: string; name: string }>) ?? [];

  const grouped = prospects.reduce<Record<string, number>>((acc, prospect) => {
    acc[prospect.status] = (acc[prospect.status] ?? 0) + 1;
    return acc;
  }, {});

  console.log('=== Weekly Pipeline Report ===');
  for (const [status, count] of Object.entries(grouped)) {
    console.log(`  ${status}: ${count}`);
  }
  console.log(`  Total active: ${prospects.length}`);
};

export default defineLogicFunction({
  universalIdentifier: '3a0b2aac-9e49-48b7-85f7-45654daa97e4',
  name: 'weekly-pipeline-report',
  description: 'Runs every Monday at 08:00 and logs a pipeline summary',
  timeoutSeconds: 60,
  handler,
  cronTriggerSettings: {
    // Every Monday at 08:00
    pattern: '0 8 * * 1',
  },
});
