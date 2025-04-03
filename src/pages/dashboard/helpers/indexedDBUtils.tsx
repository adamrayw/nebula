const DB_NAME = "fileDB";
const DB_VERSION = 1;
const STORE_NAME = "files";

// 🔹 Fungsi untuk membuka database dengan memastikan object store tersedia
const openDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: "id" });
        console.log("Object store 'files' created.");
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

// 🔹 Simpan File ke IndexedDB
export const saveFileToDB = async (file: File): Promise<boolean> => {
  try {
    const db = await openDB();
    const transaction = db.transaction(STORE_NAME, "readwrite");
    const store = transaction.objectStore(STORE_NAME);

    store.put({ id: "uploadFile", file });

    return new Promise((resolve, reject) => {
      transaction.oncomplete = () => resolve(true);
      transaction.onerror = () => reject(transaction.error);
    });
  } catch (error) {
    console.error("Failed to save file:", error);
    return false;
  }
};

// 🔹 Ambil File dari IndexedDB
export const getFileFromDB = async (): Promise<File | null> => {
  try {
    const db = await openDB();

    if (!db.objectStoreNames.contains(STORE_NAME)) {
      console.warn("Object store not found.");
      return null;
    }

    return new Promise((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, "readonly");
      const store = transaction.objectStore(STORE_NAME);
      const request = store.get("uploadFile");

      request.onsuccess = () => resolve(request.result ? request.result.file : null);
      request.onerror = () => reject(request.error);
    });
  } catch (error) {
    console.error("Failed to get file:", error);
    return null;
  }
};

// 🔹 Hapus File dari IndexedDB
export const deleteFileFromDB = async (): Promise<boolean> => {
  try {
    const db = await openDB();
    const transaction = db.transaction(STORE_NAME, "readwrite");
    const store = transaction.objectStore(STORE_NAME);
    store.delete("uploadFile");

    return new Promise((resolve, reject) => {
      transaction.oncomplete = () => resolve(true);
      transaction.onerror = () => reject(transaction.error);
    });
  } catch (error) {
    console.error("Failed to delete file:", error);
    return false;
  }
};
