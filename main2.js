const { StaticPool } = require("node-worker-threads-pool");
 
const pool = new StaticPool({
  size: 4,
  task: function(n) {
    const num = this.workerData.num;
    for (let i = 0; i < num; i++) {
      n += i;
    }
    return n;
  },
  workerData: {
    num: 1 << 30,
  },
});
 
const main = async () => {

for (let i = 0; i < 20; i++) {
  (async () => {
    const res = await pool.exec(i);
    console.log(`result${i}:`, res);
  })()
	.then(r => console.log(r))
	.catch(err => console.error(err))
	.finally(() => 
  		pool.destroy() 
	)
}

}

main()
