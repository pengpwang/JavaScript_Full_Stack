const v8 = require('v8');

// 1, v8.cachedDataVersionTag() 版本标记; 返回整数。
// console.log(
//   v8.cachedDataVersionTag()
// );

// 2, v8.getHeapSpaceStatistics() 返回有关v8堆空间的统计信息，即组成v8堆的片段
// console.log(
//   v8.getHeapSpaceStatistics()
// );

// 3, v8.getHeapSnapshot() 返回: <stream.Readable> 包含 V8 堆快照的可读流
// const stream = v8.getHeapSnapshot();
// stream.pipe(process.stdout);

// 4. v8.getHeapStatistics()  返回: <Object>
// console.log(
//   v8.getHeapStatistics()
// );
// {
//   total_heap_size: 4734976,
//   total_heap_size_executable: 524288,
//   total_physical_size: 3558784,
//   total_available_size: 2194562016,
//   used_heap_size: 2519624,
//   heap_size_limit: 2197815296,
//   malloced_memory: 8192,
//   peak_malloced_memory: 127176,
//   does_zap_garbage: 0,
//   number_of_native_contexts: 1,
//   number_of_detached_contexts: 0
// }

// 5, v8.getHeapCodeStatistics() 返回: <Object>
// console.log(
//   v8.getHeapCodeStatistics()
// );
// {
//   code_and_metadata_size: 216352,
//   bytecode_and_metadata_size: 185048,
//   external_script_source_size: 877911
// }


// 6. v8.writeHeapSnapshot([filename]) 返回: <string> 保存快照的文件名
const {
  Worker,
  isMainThread,
  parentPort
} = require('worker_threads');

if(isMainThread){
  const worker = new Worker(__filename);

  worker.once('message', (filename) => {
    console.log(`工作线程的堆转储: ${filename}`);
    console.log(`主线程的堆转储: ${v8.writeHeapSnapshot()}`);
  });

  worker.postMessage('heapdump');
}else{
  parentPort.once('message', (message) => {
    if(message === 'heapdump'){
      parentPort.postMessage(v8.writeHeapSnapshot());
    }
  })
}

// 备注：TODO
// v8模块：用于做性能状况分析；需要了解v8相关知识  