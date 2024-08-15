let timer;
let isRunning = false;
let startTime;
let elapsedTime = 0;
let lapCount = 0;

function updateTime() {
    const currentTime = new Date().getTime();
    const timeDiff = elapsedTime + (currentTime - startTime);

    const hours = Math.floor(timeDiff / 3600000);
    const minutes = Math.floor((timeDiff % 3600000) / 60000);
    const seconds = Math.floor((timeDiff % 60000) / 1000);

    const formattedTime = 
        `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    
    document.getElementById('display').textContent = formattedTime;
}

function startStop() {
    if (isRunning) {
        clearInterval(timer);
        elapsedTime += new Date().getTime() - startTime;
        document.getElementById('startStopBtn').textContent = 'Start';
    } else {
        startTime = new Date().getTime();
        timer = setInterval(updateTime, 1000);
        document.getElementById('startStopBtn').textContent = 'Stop';
    }
    isRunning = !isRunning;
}

function reset() {
    clearInterval(timer);
    elapsedTime = 0;
    lapCount = 0;
    isRunning = false;
    document.getElementById('display').textContent = '00:00:00';
    document.getElementById('startStopBtn').textContent = 'Start';
    document.getElementById('laps').innerHTML = '';
}

function recordLap() {
    if (isRunning) {
        lapCount++;
        const lapTime = document.getElementById('display').textContent;
        const lapRecord = document.createElement('div');
        lapRecord.className = 'lap';
        lapRecord.textContent = `Lap ${lapCount}: ${lapTime}`;
        document.getElementById('laps').appendChild(lapRecord);
    }
}
