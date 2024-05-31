const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d', { willReadFrequently: true });
let lastImageData = null;
const historyList = document.getElementById('historyList');
const clearButton = document.getElementById('clearButton');
const toggleSidebarButton = document.getElementById('toggleSidebarButton');
const sidebarContent = document.getElementById('sidebarContent');
const clearHistoryButton = document.getElementById('clearHistoryButton');
const sidebarWrapper = document.getElementById('sidebarWrapper');

// 添加展開/收起側邊欄的點擊事件
toggleSidebarButton.addEventListener('click', function() {
    const isHidden = sidebarContent.style.display === 'none';
    sidebarContent.style.display = isHidden ? 'block' : 'none';
});

// 添加清除歷史紀錄按鈕的點擊事件
clearHistoryButton.addEventListener('click', function() {
    historyList.innerHTML = ''; // 清空歷史紀錄列表
});

function getVideoStream(callback) {
    navigator.mediaDevices.getUserMedia({ video: { width: 320, height: 240, frameRate: 30 } })
        .then(function(userStream) {
            callback(null, userStream);
        })
        .catch(function(err) {
            callback(err, null);
        });
}

let lastDetectionTime = null; // 紀錄上次檢測時間

function startMonitoring(callback) {
    let motionDetected = false; // 定義 motionDetected 變量

    getVideoStream(function(err, stream) {
        if (err) {
            callback(err, null);
            return;
        }

        const videoElement = document.createElement('video');
        videoElement.srcObject = stream;
        videoElement.play();

        videoElement.addEventListener('loadedmetadata', function() {
            canvas.width = videoElement.videoWidth;
            canvas.height = videoElement.videoHeight;

            setInterval(function() {
                if (videoElement.paused || videoElement.ended) {
                    return;
                }

                ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
                const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

                if (lastImageData && lastImageData.data) {
                    motionDetected = detectMotionAndWater(imageData); // 設置 motionDetected 變量
                    if (motionDetected && shouldSendNotification()) {
                        const timeString = detectMotionAndWater(imageData); // 獲取時間串
                        if (timeString) {
                            showWaterNotification(timeString, function(err) {
                                if (err) {
                                    console.error('An error occurred: ' + err);
                                    return;
                                }
                                lastImageData = null;
                            });
                        }
                    }
                }

                lastImageData = imageData;
            }, 1000 / 30); // 每秒 30 幀
        });
    });
}

function shouldSendNotification() {
    const currentTime = new Date();
    if (!lastDetectionTime || (currentTime - lastDetectionTime) >= 1000) {
        lastDetectionTime = currentTime; // 更新上次檢測時間
        return true; // 返回 true 表示應該發送通知
    }
    return false; // 返回 false 表示不應該發送通知
}


function detectMotionAndWater(imageData) {
    if (!imageData || !imageData.data) {
        console.error('Error: imageData is undefined or does not contain data property');
        return false;
    }

    if (!lastImageData || !lastImageData.data) {
        console.error('Error: lastImageData is null or does not contain data property');
        return false;
    }
    
    const data = imageData.data;
    const motionThreshold = 30;
    let motionCount = 0;

    for (let i = 0; i < data.length; i += 4) {
        const currentR = data[i];
        const currentG = data[i + 1];
        const currentB = data[i + 2];

        const lastR = lastImageData.data[i];
        const lastG = lastImageData.data[i + 1];
        const lastB = lastImageData.data[i + 2];

        const rDiff = Math.abs(currentR - lastR);
        const gDiff = Math.abs(currentG - lastG);
        const bDiff = Math.abs(currentB - lastB);

        if (rDiff > motionThreshold || gDiff > motionThreshold || bDiff > motionThreshold) {
            motionCount++;
        }
    }

    if (motionCount > 8000) {
        const currentTime = new Date();
        const hours = ('0' + currentTime.getHours()).slice(-2); // 使用 slice(-2) 保留最後兩位
        const minutes = ('0' + currentTime.getMinutes()).slice(-2); // 使用 slice(-2) 保留最後兩位
        const seconds = ('0' + currentTime.getSeconds()).slice(-2); // 使用 slice(-2) 保留最後兩位
        
        const timeString = `${hours}:${minutes}:${seconds}`;
        

        return timeString; // 如果檢測到運動，就返回表示當前時間數字的字符串 timeString
    } else {
        return false;
    }
}

function showWaterNotification(timeString, callback) {
    const notification = document.createElement('div');
    notification.textContent = `在${timeString}偵測到玩水`;
    notification.style.cssText = 
    'width: 300px; height: 10px; background-color: #96b6c5; position: fixed; top: 7px; left: 650px; padding: 60px; display: flex; justify-content: center; align-items: center; font-size: 1.9rem;font-weight: 700;border-radius: 10px;';
    document.body.appendChild(notification);
    // 添加歷史紀5
    const historyItem = document.createElement('li');
    historyItem.textContent = `在${timeString}偵測到玩水`;
    historyList.appendChild(historyItem);

    setTimeout(function() {
        notification.remove();
        callback(null);
    }, 1000);
}

startMonitoring(function(err) {
    if (err) {
        console.error('An error occurred: ' + err);
        return;
    }
});