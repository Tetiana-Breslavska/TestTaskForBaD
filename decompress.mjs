import fs from 'fs';
import bz2 from 'unbzip2-stream';
import { exec } from 'child_process';
import open from 'open';

function decompressBz2File(inputPath, outputPath, callback) {
    const inputStream = fs.createReadStream(inputPath);
    const outputStream = fs.createWriteStream(outputPath);
    const decompressor = bz2();
    inputStream.pipe(decompressor).pipe(outputStream);
    outputStream.on('finish', async () => {
        console.log('Decompression completed');
        const numbers = readNumbersFromFile(outputPath);
        callback(numbers);
        exec('http-server .', (error) => {
            if (error) {
                console.error(error);
                return;
            }
            open('http://localhost:8080/index.html');
        });
    });
    outputStream.on('error', (err) => {
        console.error(err);
    });
}

function readNumbersFromFile(filePath) {
    const data = fs.readFileSync(filePath, 'utf8');
    return data.split(/\s+/).map(Number).filter(n => !isNaN(n));
}

const inputPath = '10m.txt.bz2';
const outputPath = '10m.txt';
decompressBz2File(inputPath, outputPath, (numbers) => {
    const jsonNumbers = JSON.stringify(numbers);
    fs.writeFileSync('numbers.json', jsonNumbers);
    open('http://localhost:8080/index.html');
});