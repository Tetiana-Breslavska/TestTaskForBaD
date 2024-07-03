
async function fetchNumbers() {
    const response = await fetch('numbers.json');
    const numbers = await response.json();
    return numbers;
}

function findMax(numbers) {
    let max = numbers[0];
    for (const number of numbers) {
        if (number > max) {
            max = number;
        }
    }
    return max;
}

function findMin(numbers) {
    let min = numbers[0];
    for (const number of numbers) {
        if (number < min) {
            min = number;
        }
    }
    return min;
}

function findMean(numbers) {
    const sum = numbers.reduce((acc, num) => acc + num, 0);
    return sum / numbers.length;
}

function findMedian(numbers) {
    const sortedNumbers = [...numbers].sort((a, b) => a - b);
    const middleIndex = Math.floor(sortedNumbers.length / 2);

    if (sortedNumbers.length % 2 === 0) {
        return (sortedNumbers[middleIndex - 1] + sortedNumbers[middleIndex]) / 2;
    } else {
        return sortedNumbers[middleIndex];
    }
}

function findLongestIncreasingSequence(numbers) {
    let LongestIncreasingSequence = [];
    let buffer = [];
    for (let i = 0; i < numbers.length; i++) {
        if (buffer.length === 0) {
            buffer.push(numbers[i]);
        }
        if (numbers[i + 1] > numbers[i]) {
            buffer.push(numbers[i + 1]);
        }
        else {
            if (buffer.length > LongestIncreasingSequence.length) {
                LongestIncreasingSequence = [...buffer];
            }
            buffer = [];
        }
    }
    return LongestIncreasingSequence;
}

function findLongestDecreasingSequence(numbers) {
    let LongestDecreasingSequence = [];
    let buffer = [];
    for (let i = 0; i < numbers.length; i++) {
        if (buffer.length === 0) {
            buffer.push(numbers[i]);
        }
        if (numbers[i + 1] < numbers[i]) {
            buffer.push(numbers[i + 1]);
        }
        else {
            if (buffer.length > LongestDecreasingSequence.length) {
                LongestDecreasingSequence = [...buffer];
            }
            buffer = [];
        }
    }
    return LongestDecreasingSequence;
}

async function calculation() {
    const numbers = await fetchNumbers();
    // const tryNumbers = [1, 2, 3, 6, 7,9,10,11, -5, 34, 126, 56, 12, 22, 31, 44, 47, 49,50,51,52,55,56, -6, -10, -15, 54, 39];
    const maxNumber = findMax(numbers);
    const minNumber = findMin(numbers);
    const meanNumber = findMean(numbers);
    const medianNumber = findMedian(numbers);
    const incrSequence = findLongestIncreasingSequence(numbers);
    const decrSequence = findLongestDecreasingSequence(numbers);

    let max = document.querySelector('#maxNumber');
    max.innerHTML = `Максимальне число: ${maxNumber}`;
    let min = document.querySelector('#minNumber');
    min.innerHTML = `Мінімальне число: ${minNumber}`;
    let mean = document.querySelector('#meanNumber');
    mean.innerHTML = `Середнє арифметичне значення: ${meanNumber}`;
    let median = document.querySelector('#medianNumber');
    median.innerHTML = `Медіана: ${medianNumber}`;
    let increasingSequence = document.querySelector('#increasingSequence');
    increasingSequence.innerHTML = `Найбільша послідовність чисел (які ідуть один за одним), яка збільшується: ${incrSequence}`;
    let decreasingSequence = document.querySelector('#decreasingSequence');
    decreasingSequence.innerHTML = `Найбільша послідовність чисел (які ідуть один за одним), яка зменшується: ${decrSequence}`;
}

calculation();
