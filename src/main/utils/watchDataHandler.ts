import { reactiveDB } from "../database";

const subscriptions = new Map();
const callbacksForChannel = new Map();

export const watchDataHandler = async <T extends unknown[]>(
  event: Electron.IpcMainInvokeEvent,
  channelName: string,
  getData: () => Promise<T>
) => {
  const channel = `${channelName}-${Date.now()}-${Math.random()}`;

  const callback = async () => {
    const data = await getData();
    event.sender.send(channel, data);
  };

  // Connect to the database without sending initial data
  const unsubscribe = reactiveDB.watchData(callback, false);

  // Store for cleanup and for initial trigger
  subscriptions.set(channel, unsubscribe);
  callbacksForChannel.set(channel, callback);

  return { channel };
};

export const triggerInitialData = (channel: string) => {
  if (callbacksForChannel.has(channel)) {
    const callback = callbacksForChannel.get(channel);
    reactiveDB.triggerSubscriber(callback);
  }
};

export const cleanupSubscription = (channel: string) => {
  if (subscriptions.has(channel)) {
    const unsubPromise = subscriptions.get(channel);
    unsubPromise.then((unsubFunc) => {
      if (unsubFunc) {
        unsubFunc();
      }
    });
    subscriptions.delete(channel);
    callbacksForChannel.delete(channel);
  }
};

export const cleanupSubscriptions = () => {
  subscriptions.forEach((unsubPromise, channel) => {
    unsubPromise.then((unsubFunc) => {
      if (unsubFunc) {
        unsubFunc();
      }
    });
    subscriptions.delete(channel);
  });
  callbacksForChannel.clear();
};
