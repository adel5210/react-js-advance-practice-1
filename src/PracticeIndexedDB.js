

export default function PracticeIndexedDB(){
    let openDBRequest = indexedDB.open('testDB',1);

    openDBRequest.onupgradeneeded = function (event){
        console.log("Upgraded needed")
        let db = openDBRequest.result;
        switch (event.oldVersion){
            case 0:
                console.log('No existing db, creating new');
            case 1:
                console.log('Existing db');
        }
    }

    openDBRequest.onerror = function (){
        console.log("Error DB", openDBRequest.error)
    }

    openDBRequest.onsuccess = function (){
        let db = openDBRequest.result;
    }
}