import * as umbral from '@nucypher/umbral-pre';

let enc = new TextEncoder();
let dec = new TextDecoder('utf-8');

// public/tmp/kfrags_a659ce6965d5049f664d728c5069f8ce

function chunk(s, maxBytes) {
  let buf = Buffer.from(s);
  const result = [];
  while (buf.length) {
    let i = buf.lastIndexOf(32, maxBytes + 1);
    // If no space found, try forward search
    if (i < 0) i = buf.indexOf(32, maxBytes);
    // If there's no space at all, take the whole string
    if (i < 0) i = buf.length;
    // This is a safe cut-off point; never half-way a multi-byte
    result.push(buf.slice(0, i).toString());
    buf = buf.slice(i + 1); // Skip space (if any)
  }
  return result;
}

function OpenKfrag() {
  var fs = require('fs');

  const testFolder = './';
  //   const fs = require('fs');

  //   fs.readdir(testFolder, (err, files) => {
  //     files.forEach((file) => {
  //       console.log(file);
  //     });
  //   });

  fs.createReadStream('demo.txt', function (err, capsule_contents) {
    console.log('12312312');
    capsule = umbral.Capsule.fromBytes(Buffer.from(capsule_contents));

    // fs.createReadStream(
    //   'tmp/kfrags_a659ce6965d5049f664d728c5069f8ce',
    //   function (err, contents) {
    //     // 260 * 20 bytes
    //     // console.log(Buffer.byteLength(contents));

    //     console.log(chunk(contents, 260)[0]);

    //     let cfrag0 = umbral.reencrypt(
    //       capsule,
    //       Buffer.from(chunk(contents, 260)[0])
    //     );
    //     console.log('123');
    //     console.log(cfrag0.toString());

    //     // console.log(cfrag0);
    //   }
    // );
  });

  return <div>101010</div>;
}

export default function Decrypt() {
  return (
    <div className="container">
      <OpenKfrag />
    </div>
  );
}
