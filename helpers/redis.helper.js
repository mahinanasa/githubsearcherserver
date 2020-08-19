const asyncRedis = require("async-redis");
let env = process.env.NODE_ENV || 'development'
let config = require(`../config/${env}.js`)
const rClient = asyncRedis.createClient(
	config.redis_port ,
	config.redis_host,
);


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
