const async = require('async')
// async.series({
//     1: function(callback) {
//       setTimeout(function() {
//         console.log('Task 1');
//         callback(null, 'one');
//       }, 200);
//     },
//     2: function(callback) {
//       setTimeout(function() {
//         console.log('Task 2');
//         callback(null, 'two');
//       }, 300);
//     },
//     3: function(callback) {
//       setTimeout(function() {
//         console.log('Task 3');
//         callback(null, 'three');
//       }, 100);
//     }
//   },
//   function(err, results) {
//     console.log(results);
//     console.log('error',err);
    
//     // results is now equal to: { 1: 'one', 2: 'two', 3:'three' }
//   });

  // async.series([
  //   function(callback) {
  //     console.log('one');
  //     callback(null, 1);
  //   },
  //   function(callback) {
  //     console.log('two');
  //     callback(null, 2);
  //   },
  //   function(callback) {
  //     console.log('three');
  //     callback(null, 3);
  //   }
  // ],
  // function(err, results) {
  //   console.log(results);
  //   // results is now equal to [1, 2, 3]
  // });


async.waterfall([
  function(callback) {
    callback(null, 'Task 1', 'Task 2');
  },
  function(arg1, arg2, callback) {
    // arg1 now equals 'Task 1' and arg2 now equals 'Task 2'
    let arg3 = arg1 + ' and ' + arg2;
    callback(null, arg3);
  },
  function(arg1, callback) {
    // arg1 now equals 'Task1 and Task2'
    arg1 += ' completed';
    callback(null, arg1);
  }
], function(err, result) {
  // result now equals to 'Task1 and Task2 completed'
  console.log(result);
});


//   Note.prototype.read = async (param, callback) => {
//     try {

//         let readData = []
//         console.log("param in read note", param);
//         if (param.latest) {
//             readData = await note.find(param.query).sort({ 'updatedAt': -1 }).limit(10).populate('notelabel')
//         }
//         else {
//             readData = await note.find(param.query).sort({ '_id': -1 }).populate('notelabel')
//         }
//         async.series([
            
//             function (cb) {
//                 redisObj.setData(client, readData)
//                 cb()
//             },
//             function (cb) {
//                 if (readData != '') {
//                     let data = { readData: readData }
//                     console.log("ALL NOTES==================>", data);
//                     // return data
//                     // cb(null, data)
//                     return callback(null, data);
//                 }
//                 else {
//                     let error = { error: 'Notes are not found to read' }
//                     // return error
//                     // cb(error)
//                     return callback(error);
//                 }
//             }

//         ], function(err, data) {
//             console.log('async parallel===>>>>>>>>>>',data);
//             // return callback(null, data)
//         })

//     }
//     catch (err) {
//         log.logger.error('Read Note error==>', err)
//         let error = { error: 'Note Id is not found to read' }
//         return error
//     }
// }

// noteModelObj.read(readParam,(error,readData)=>{
//   console.log('data read in service===>', readData)
//   if (error) {
//       readResponse.status = false
//       readResponse.error = error
//       return readResponse
//   }
//   readResponse.data = readData
//   // }
//   readResponse.status = true
//   readResponse.message = 'Note read successfully'

//   return readResponse
// })