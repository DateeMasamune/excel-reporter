import { reactiveDB } from "../database";

const subscriptions = new Map();

export const watchDataHandler = async <T extends unknown[]>(
  event: Electron.IpcMainInvokeEvent,
  channelName: string,
  getData: () => Promise<T>
) => {
  const channel = `${channelName}-${Date.now()}`;

  const callback = async () => {
    // Когда БД обновляется - отправляем данные через IPC
    const data = await getData();

    event.sender.send(channel, data);
  };

  // 🔥 ПОДКЛЮЧАЕМСЯ К БАЗЕ ДАННЫХ
  const unsubscribe = reactiveDB.watchData(callback);

  // Сохраняем для очистки
  subscriptions.set(channel, unsubscribe);

  return { channel };
};

export const cleanupSubscriptions = () => {
  subscriptions.forEach((unsubscribe, channel) => {
    unsubscribe();
    subscriptions.delete(channel);
  });
};
