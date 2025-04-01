

/**
 * 
 * @param {Object[]} array 
 * @param {number} i 
 * @param {number} j 
 */
function swap(array, i, j) {
    let t = array[i];
    array[i] = array[j];
    array[j] = t
}

/**
 * Shuffle a range inside an array the indices shuffled
 * fit in the range [x, y).
 * 
 * @param {Object[]} array to be shuffled inplace
 * @param {number} start integer number from where to start shuffeling
 * @param {number} stop  integer number 
 */
function shuffleRange(array, start, stop) {

    if (start > stop | start < 0 | stop > array.length) {
        throw Error("Invalid indices pass to shuffle Range")
    }

    if (!Array.isArray(array)) {
        throw Error("Oops arrays isn't a Array")
    }

    let n = stop - start;
    while (n) {
        const r = Math.floor(Math.random() * n)
        swap(array, start + r, start + n -1)
        n--;
    }
}
