

export default function PracticeIndexedDB(){
    let openDBRequest = indexedDB.open('testDB',1);

    openDBRequest.onupgradeneeded = function (){
        console.log("Upgraded needed")
    }

    openDBRequest.onerror = function (){
        console.log("Error DB", openDBRequest.error)
    }

    openDBRequest.onsuccess = function (){
        let db = openDBRequest.result;
    }
}