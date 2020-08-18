const asyncRedis = require("async-redis");

const rClient = asyncRedis.createClient({
	host: '127.0.0.1',
	port: '6379'
});


rClient.on("error", err => {
  // console.log("Redis error: ", err);
});

rClient.on("ready", function() {
  // console.log("Redis is ready");
});

const redisHelper = {
  get : async (key)=>{
  let cachedData = await rClient.get(key);
  return JSON.parse(cachedData)
},
set:async(key,value)=>{
  await rClient.setex(key, 7200, JSON.stringify(value));
},
flushAll:async (req,res)=>{

  await rClient.flushall();
 return res.json({message:'Done'})
}
}



module.exports = redisHelper;
