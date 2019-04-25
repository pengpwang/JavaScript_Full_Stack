
// 1. 中文乱码问题
const StringDecoder = require('string_decoder').StringDecoder;
const decoder = new StringDecoder('utf8');

const buf = Buffer.from('中文字符串！');

for(let i = 0; i < buf.length; i+=5){
    const b = Buffer.allocUnsafe(5);
    buf.copy(b, 0, i);

    console.log(b.toString());
}


for(let i = 0; i < buf.length; i+=5){
    const b = Buffer.allocUnsafe(5);
    buf.copy(b, 0, i);

    console.log(decoder.write(b)); // 返回一个已解码的字符串，确保在返回的字符串不包含 Buffer、 TypedArray 或 DataView 末尾的任何不完整的多字节字符，并将其存储在内部缓冲区中，以便下次调用 stringDecoder.write() 或 stringDecoder.end()。
}

// 2. new StringDecoder([encoding]) // encoding 默认值为 utf8
// 创建一个StringDecoder实例

// 3. decoder.write(buf) <Buffer> <TypedArray> <DataView>
// decoder.end([<Buffer> | <TypedArray> | <DataView>])  以字符串形式返回存储在内部缓冲区中的任何剩余输入。
const decoder3 = new StringDecoder('utf8');
decoder3.write(Buffer.from([0xE2]));
decoder3.write(Buffer.from([0x82]));
console.log(decoder3.end(Buffer.from([0xAC]))); //如果提供了 buffer 参数，则在返回剩余的输入之前再最后一次调用 stringDecoder.write()

