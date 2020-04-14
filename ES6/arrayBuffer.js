
// 1. 数据类型占据的字节数
console.log(
  Uint8Array.BYTES_PER_ELEMENT,
  Int8Array.BYTES_PER_ELEMENT,
  Uint8ClampedArray.BYTES_PER_ELEMENT,
  Int16Array.BYTES_PER_ELEMENT,
  Uint16Array.BYTES_PER_ELEMENT,
  Int32Array.BYTES_PER_ELEMENT,
  Uint32Array.BYTES_PER_ELEMENT,
  Float32Array.BYTES_PER_ELEMENT,
  Float64Array.BYTES_PER_ELEMENT
);
//TypedArray.prototype.BYTES_PER_ELEMENT   TypedArray实例上也能获取
console.log(
  (new Int8Array([1,2,3])).BYTES_PER_ELEMENT
);





