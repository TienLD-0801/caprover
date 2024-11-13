const storeSetItem = async (
  nameStore: string,
  nameItem: string,
  data: any,
  timeCaching?: number
) => {
  try {
    const storage = useStorage(nameStore);
    const result = await storage.setItem(nameItem, data, { ttl: timeCaching });
    return result;
  } catch (error) {
    console.log(error);
  }
};

const storeGetItem = async (nameStore: string, nameItem: string) => {
  try {
    const storage = useStorage(nameStore);
    const result = await storage.getItem(nameItem);
    return result;
  } catch (error) {
    console.log(error);
  }
};

const storeDeleteItem = async (nameStore: string, nameItem: string) => {
  try {
    const storage = useStorage(nameStore);
    const result = await storage.removeItem(nameItem);
    return result;
  } catch (error) {
    console.log(error);
  }
};

const storeGetKeys = async (nameStore: string) => {
  try {
    const storage = useStorage(nameStore);
    const result = await storage.getKeys();
    return result;
  } catch (error) {
    console.log(error);
  }
};
export { storeSetItem, storeGetItem, storeDeleteItem, storeGetKeys };
