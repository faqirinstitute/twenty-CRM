import { defineLogicFunction } from 'twenty-sdk';

// Triggered every time a new Prospect record is created
// Extend this handler to: send a Slack notification, enrich data, assign a task, etc.
const handler = async (payload: {
  recordId: string;
  objectNameSingular: string;
}): Promise<void> => {
  console.log(
    `New prospect created: ${payload.recordId} (${payload.objectNameSingular})`,
  );

  // TODO: add enrichment, notifications, or task creation here
};

export default defineLogicFunction({
  universalIdentifier: '2abace74-829e-45ff-a1c3-632396e8fb40',
  name: 'prospect-created-notification',
  description: 'Runs when a new Prospect is created — hook for enrichment and notifications',
  timeoutSeconds: 30,
  handler,
  databaseEventTriggerSettings: {
    objectNameSingular: 'prospect',
    eventName: 'created',
  },
});
