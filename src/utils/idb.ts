import { openDB, IDBPDatabase } from 'idb';
import Message from '../types/message';

const DB_NAME = 'chat';
const STORE_NAME = 'messages';
const VERSION = 1;
const LIMIT = 40;

let dbPromise: Promise<IDBPDatabase>;

const initDB = async (): Promise<IDBPDatabase> => {
    if (!dbPromise) {
        dbPromise = openDB(DB_NAME, VERSION, {
            upgrade(db) {
                if (!db.objectStoreNames.contains(STORE_NAME)) {
                    const store = db.createObjectStore(STORE_NAME, { keyPath: '_id' });
                    store.createIndex("friend_id", ["friend", "_id"]);
                    store.createIndex("messageStatus", "messageStatus")
                }
            },
        });
    }
    return dbPromise;
};

const addMessage = async (messages: Message[]) => {
    const db = await initDB();
    const tx = db.transaction('messages', 'readwrite');
    const store = tx.objectStore('messages');
    for (const message of messages) {
        await store.put(message);
    }
    await tx.done;
};

const updateMessage = async (id: string, messageStatus: string): Promise<void> => {
    const db = await initDB();
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);

    const existingMessage = await store.get(id);
    if (existingMessage) {
        existingMessage.messageStatus = messageStatus;
        await store.put(existingMessage);
    }

    await tx.done;
};

const deleteMessage = async (_id: string): Promise<void> => {
    const db = await initDB();
    await db.delete(STORE_NAME, _id);
};

const getUnreadMessages = async (): Promise<{ friendId: string, unreadMessages: number }[]> => {
    const result: Record<string, number> = {};

    const db = await initDB();
    const tr = db.transaction(STORE_NAME);
    const store = tr.objectStore(STORE_NAME);
    const index = store.index("messageStatus");

    let cursor = await index.openCursor(IDBKeyRange.only('delivere'));
    while (cursor) {
        const message = cursor.value as Message;
        const friendId = message.friend!;

        if (result[friendId]) {
            result[friendId]++;
        } else {
            result[friendId] = 1;
        }

        cursor = await cursor.continue();
    }

    return Object.entries(result).map(([friendId, unreadMessages]) => ({
        friendId,
        unreadMessages
    }));;
}

const getBeforeId = async (friendId: string, messageId?: string): Promise<Message[]> => {
    const messages: Message[] = [];
    const db = await initDB();
    const tr = db.transaction(STORE_NAME);
    const store = tr.objectStore(STORE_NAME);
    const index = store.index("friend_id");
    let range;

    if (!messageId)
        range = IDBKeyRange.bound(
            [friendId, ''],
            [friendId, '\uffff'],
            true,
            true
        )
    else
        range = IDBKeyRange.bound(
            [friendId, ''],
            [friendId, messageId],
            true,
            true
        );

    let cursor = await index.openCursor(range, 'prev');

    while (cursor && messages.length < LIMIT) {
        messages.push(cursor.value);
        cursor = await cursor.continue();
    }

    return messages.reverse();
}

const getAfterId = async (friendId: string, messageId: string): Promise<Message[]> => {
    const messages: Message[] = [];
    const db = await initDB();
    const tr = db.transaction(STORE_NAME);
    const store = tr.objectStore(STORE_NAME);
    const index = store.index("friend_id");
    let range;

    range = IDBKeyRange.bound(
        [friendId, messageId],
        [friendId, '\uffff'],
        true,
        false
    )

    let cursor = await index.openCursor(range, 'next');

    while (cursor && messages.length < LIMIT) {
        messages.push(cursor.value);
        cursor = await cursor.continue();
    }

    return messages;
}


export { addMessage, getUnreadMessages, updateMessage, deleteMessage, getBeforeId, getAfterId }