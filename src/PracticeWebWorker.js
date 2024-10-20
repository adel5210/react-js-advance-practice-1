import {useEffect} from "react";
import {spawn, Thread, Worker} from'threads'

export default function PracticeWebWorker(){

    const jobs = Array.from({length:100}, () => 1e9)

    function chunkify(arr, n){
        let chunks = [];
        for (let i = n; i > 0 ; i--) {
            chunks.push(arr.splice(0, Math.ceil(arr.length / i)));
        }
        return chunks
    }

    async function run(jobz, concurrentWorkers){
        const chunks = chunkify(jobz, concurrentWorkers);

        for (const chunkData of chunks) {
            const i = chunks.indexOf(chunkData);
            const worker = new Worker('./workers/test_worker')
            const spawner = await spawn(worker)
            const onWorkerReturn = await spawner.onWorkerHandler(chunkData)

            console.log(onWorkerReturn)

            await Thread.terminate(spawner)
        }
    }
    useEffect(( ) => {
        run(jobs, 4).catch(console.error)
    },[])

}