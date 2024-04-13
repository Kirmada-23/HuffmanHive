class Node {
  constructor(symbol, frequency) {
    this.symbol = symbol;
    this.frequency = frequency;
    this.left = null;
    this.right = null;
  }
}

function buildHuffmanTree(data) {
  let frequencyMap = {};
  for (let char of data) {
    frequencyMap[char] = (frequencyMap[char] || 0) + 1;
  }

  let priorityQueue = [];
  for (let symbol in frequencyMap) {
    priorityQueue.push(new Node(symbol, frequencyMap[symbol]));
  }

  while (priorityQueue.length > 1) {
    priorityQueue.sort((a, b) => a.frequency - b.frequency);
    let leftChild = priorityQueue.shift();
    let rightChild = priorityQueue.shift();
    let mergedNode = new Node(null, leftChild.frequency + rightChild.frequency);
    mergedNode.left = leftChild;
    mergedNode.right = rightChild;
    priorityQueue.push(mergedNode);
  }

  return priorityQueue[0];
}

function generateHuffmanCodes(root, code = "", codes = {}) {
  if (root.left === null && root.right === null) {
    codes[root.symbol] = code;
    return;
  }
  generateHuffmanCodes(root.left, code + "0", codes);
  generateHuffmanCodes(root.right, code + "1", codes);
}

function compress(data) {
  let root = buildHuffmanTree(data);
  let codes = {};
  generateHuffmanCodes(root, "", codes);
  let compressedData = "";
  for (let char of data) {
    compressedData += codes[char];
  }
  return { compressedData, codes };
}

function decompress(compressedData, codes) {
  let reversedCodes = {};
  for (let symbol in codes) {
    reversedCodes[codes[symbol]] = symbol;
  }
  let decodedData = "";
  let currentCode = "";
  for (let bit of compressedData) {
    currentCode += bit;
    if (reversedCodes[currentCode]) {
      decodedData += reversedCodes[currentCode];
      currentCode = "";
    }
  }
  return decodedData;
}

function compressArrayBuffer(buffer) {
  let decoder = new TextDecoder("utf-8");
  let data = decoder.decode(buffer);
  let { compressedData, codes } = compress(data);
  let encodedCodes = JSON.stringify(codes);
  let encodedBuffer = new ArrayBuffer(
    encodedCodes.length + compressedData.length + 8
  ); // 8 bytes for metadata
  let view = new DataView(encodedBuffer);
  view.setUint32(0, encodedCodes.length);
  view.setUint32(4, compressedData.length);
  let encoder = new TextEncoder("utf-8");
  let codesArray = encoder.encode(encodedCodes);
  let codesBuffer = codesArray.buffer;
  let codesView = new Uint8Array(codesBuffer);
  for (let i = 0; i < codesArray.length; i++) {
    view.setUint8(8 + i, codesView[i]);
  }
  let compressedArray = encoder.encode(compressedData);
  let compressedView = new Uint8Array(compressedArray.buffer);
  for (let i = 0; i < compressedArray.length; i++) {
    view.setUint8(8 + codesArray.length + i, compressedView[i]);
  }
  return encodedBuffer;
}

function decompressArrayBuffer(buffer) {
  let view = new DataView(buffer);
  let codesLength = view.getUint32(0);
  let compressedLength = view.getUint32(4);
  let codesArray = new Uint8Array(buffer, 8, codesLength);
  let compressedArray = new Uint8Array(
    buffer,
    8 + codesLength,
    compressedLength
  );
  let decoder = new TextDecoder("utf-8");
  let codesString = decoder.decode(codesArray);
  let codes = JSON.parse(codesString);
  let compressedData = "";
  for (let i = 0; i < compressedArray.length; i++) {
    compressedData += String.fromCharCode(compressedArray[i]);
  }
  return decompress(compressedData, codes);
}

// Example usage
let data = "abbcccddddeeeee";
let encoder = new TextEncoder("utf-8");
let arrayBuffer = encoder.encode(data).buffer;
let compressedBuffer = compressArrayBuffer(arrayBuffer);
console.log("Compressed ArrayBuffer:", compressedBuffer);
let decompressedData = decompressArrayBuffer(compressedBuffer);
console.log("Decompressed data:", decompressedData);
