/**
 * Created by s.neidig on 19/07/17.
 */

const sample = (array, exception) => {
    const temp = Object.assign([], array).filter(item => item !== exception);
    return temp[Math.floor(Math.random() * temp.length)];
}