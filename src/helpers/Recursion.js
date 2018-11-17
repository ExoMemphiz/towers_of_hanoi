
let A = [];
let B = [];
let C = [];

let ready = true;

let delayMS = 1000;
let stop = false;

export async function initAndSolve(numberOfCircles, delay = 1000, progressCallback, stopCallback) {
    delayMS = delay;
    stop = false;
    if (!ready) {
        return;
    }
    stopCallback(function() {
        stop = true;
    })
    ready = false;
    A = [];
    B = [];
    C = [];
    for (let i = numberOfCircles; i > 0; i--) {
        A.push(i);
    }
    progressCallback(A, B, C);
    await sleep(1000);
    await solveTowersRecursion(numberOfCircles, A, C, B, progressCallback);
    ready = true;
    progressCallback(ready);
}

async function solveTowersRecursion(numberOfCircles, source, target, auxiliary, progressCallback) {
    if (stop) {
        return;
    }
    if (numberOfCircles > 0) {
        //We first need to move the smaller circles out of the way, to the auxiliaryLocation
        await solveTowersRecursion(numberOfCircles - 1, source, auxiliary, target, progressCallback);
        if (stop) {
            return;
        }
        //We actually move the circles
        await sleep(delayMS);
        target.push(source.pop());
        //Give a progress report back to the caller, so we can update GUI
        progressCallback(A, B, C);

        //Handle async stop call
        if (stop) {
            return;
        }
        await solveTowersRecursion(numberOfCircles - 1, auxiliary, target, source, progressCallback);
    }
    //console.log(`${starting} | ${ending} | ${auxiliary}`)
}

function sleep(milliseconds) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(milliseconds);
        }, milliseconds);
        if (stop) {
            resolve(milliseconds);
        }
    })
}

