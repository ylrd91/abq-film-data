const callbackLists = {};

const eventHub = {
  broadcast(eventName, data) {
    const callbackList = callbackLists[eventName];
    if (!callbackList) {
      return;
    }
    for (let i = 0; i < callbackList.length; i += 1) {
      callbackList[i].callback(data);
    }
  },
  on(eventName, callback) {
    const callbackId = `_${Math.random().toString(36).substr(2, 9)}`;
    if (!callbackLists[eventName]) {
      callbackLists[eventName] = [];
    }
    callbackLists[eventName].push({
      id: callbackId,
      callback,
    });
    return callbackId;
  },
  unsubscribe(eventName, id) {
    const index = callbackLists[eventName].findIndex((cb) => cb.id === id);
    callbackLists[eventName].splice(index, 1);
  },
};

export default eventHub;
