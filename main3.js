const { workerData } = require("worker_threads");
const { DynamicPool } = require("node-worker-threads-pool");
 
const pool = new DynamicPool(3);

function fib(n) {
  if (n < 2) {
    return n;
  }
  return fib(n - 1) + fib(n - 2);
}

function task1() {
  // something heavy.
	console.log('task1 data:',workerData)
//	const res = fib(workerData)
//	console.log('task1 res:', res)
  
}
 
function task2() {
  // something heavy too.
	console.log('task2 data:',workerData)
//	const res = fib(workerData)
//	console.log('task2 res:', res)
}
 
// execute task1
(async () => {
  const res = await pool.exec({
    task: task1,
    workerData: 20,
  });
  console.log(res);
})();
 
// execute task2
(async () => {
  const res = await pool.exec({
    workerData: 30,
    task: task2,
  });
  console.log(res);
})();
