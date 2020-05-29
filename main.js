const { StaticPool } = require("node-worker-threads-pool");
const path = require('path');

const filePath = path.resolve('.', 'worker.js');

const pool = new StaticPool({
  size: 5,
  task: filePath,
  workerData: "workerData!",
});
 
for (let i = 0; i < 20; i++) {
  (async () => {
    const num = 40 + Math.trunc(10 * Math.random());
 
    // This will choose one idle worker in the pool
    // to execute your heavy task without blocking
    // the main thread!
    const res = await pool.exec(num);
 
    console.log(`Fibonacci(${num}) result:`, res);
  })();
}
