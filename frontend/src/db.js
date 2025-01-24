
// IndexedDB setup ----------

// IndexedDB helper functions
const openDB = (dbName, storeName) => {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(dbName, 1);
  
      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        if (!db.objectStoreNames.contains(storeName)) {
          db.createObjectStore(storeName, { keyPath: "id" });
        }
      };
  
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  };
  
  const addToDB = async (dbName, storeName, data) => {
    const db = await openDB(dbName, storeName);
    const transaction = db.transaction(storeName, "readwrite");
    const store = transaction.objectStore(storeName);
    store.add(data);
    return transaction.complete;
  };
  
  // IndexedDB setup ----- x -----
  