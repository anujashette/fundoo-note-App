class RedisOperations {
   async setData(client,param) {
        console.log("set data in redis",param);
        for(let i=0;i<param.notes.length; i++){
        console.log("note  ===========>",'user'+JSON.stringify(param.userId));
        let id= param.notes[i].id
        let note = param.notes[i]
        client.hmset('user'+JSON.stringify(param.userId),JSON.stringify(id),JSON.stringify(note), redis.print)}
    }

   async getData(client,param){
       console.log("user id=================>>>>>>>",param.userId);
       return new Promise((resolve, reject) => {
        client.hgetall('user'+JSON.stringify(param.userId), (err, reply) => {
            if (err) {
                console.log("error getting in redis token-->", err);
                reject(err)
            }
            else {
                console.log("redis value is ==>", reply);
                resolve(reply)
            }
        })
    })
    //    let redisNotes = await  client.hgetall('user'+JSON.stringify(param.userId))
    //     console.log("get data in redis",redisNotes);
    // return redisNotes
    }
}

const redisObj = new RedisOperations()
module.exports = redisObj