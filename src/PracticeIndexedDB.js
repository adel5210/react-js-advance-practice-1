const testDB = 'testDB';
const storeNames = 'storage-0';

export default function PracticeIndexedDB() {
    // Open the database (it will be created if it doesn't exist)
    let openDBRequest = indexedDB.open(testDB, 1);

    openDBRequest.onupgradeneeded = function (event) {
        console.log("Upgrade needed");
        let db = openDBRequest.result;

        switch (event.oldVersion) {
            case 0:
                console.log('No existing db, creating new');
                break;
            case 1:
                console.log('Existing db');
                break;
        }

        // Create the object store if it doesn't exist
        if (!db.objectStoreNames.contains(storeNames)) {
            db.createObjectStore(storeNames, { keyPath: 'id' });
            console.log('Created store obj');
        }
    };

    openDBRequest.onerror = function () {
        console.log("Error opening DB", openDBRequest.error);
    };

    openDBRequest.onsuccess = function () {
        let db = openDBRequest.result;

        db.onversionchange = function () {
            db.close();
            console.log('DB outdated, reload page');
        };

        // Once the database is opened, perform a transaction
        let transaction = db.transaction(storeNames, 'readwrite');
        let stores = transaction.objectStore(storeNames);

        for (let i = 0; i < 100; i++) {
            const store = {
                id: i,
                name: 'test',
                created: new Date(),
            };

            const request = stores.put(store);
            request.onsuccess = function () {
                console.log('Added', request.result);
            };

            request.onerror = function () {
                console.log('Failed', request.error);
            };
        }

        console.log('Data 1', stores.get(1))
        console.log('Data All', stores.getAll())
        console.log('Count', stores.count())
        stores.delete(10)
        console.log('Count', stores.count())
        // stores.clear()

        let requestCursor = stores.openCursor();
        // let requestCursor = stores.openCursor(1); //similar to get(1)
        requestCursor.onsuccess = function (){
            let cursor = requestCursor.result;
            if(cursor){
                const key = cursor.key;
                const value = cursor.value;
                console.log(key, value)
                cursor.continue();
            }else{
                console.log('End of cursor')
            }
        }



    };
}
