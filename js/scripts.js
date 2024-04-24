function highQualityRandomBoolean() {
    var array = new Uint32Array(1);
    window.crypto.getRandomValues(array);
    return array[0] < 2**31;
}

function flipCoin() {
    // console.log("flipCoin() function is called");
    var coin = document.getElementById("coin");
    var randomSide = highQualityRandomBoolean() ? "dollarBack.png" : "dollarFront.png";

    // 检查硬币目前显示的是正面还是背面
    var currentSide = coin.src.includes("dollarFront.png") ? "dollarFront.png" : "dollarBack.png";
    
    // 添加动画效果
    coin.classList.remove("flip"); // 移除原有的动画类以触发重排
    void coin.offsetWidth; // 触发重排，以便重新开始动画
    coin.classList.add("flip");

    // 根据当前显示的是正面还是背面来安排图片切换序列
    if (currentSide === "dollarFront.png") {
        setTimeout(() => { coin.src = "images/dollarBack.png"; }, 300); // 如果开始是正面，在0.3秒时切换到背面
        setTimeout(() => { coin.src = "images/dollarFront.png"; }, 600); // 然后在0.6秒时切换回正面
        if ( randomSide !== currentSide ) {
            setTimeout(() => { coin.src = "images/dollarBack.png"; }, 900); // 最后在0.9秒时切换回背面
        }
        setTimeout(() => { coin.src = "images/" + randomSide; }, 1200); // 最后在1.2秒时切换到randomSide
    } else {
        setTimeout(() => { coin.src = "images/dollarFront.png"; }, 300); // 如果开始是背面，在0.3秒时切换到正面
        setTimeout(() => { coin.src = "images/dollarBack.png"; }, 600); // 然后在0.6秒时切换回背面
        if ( randomSide !== currentSide ) {
            setTimeout(() => { coin.src = "images/dollarFront.png"; }, 900); // 最后在0.9秒时切换回背面
        }
        setTimeout(() => { coin.src = "images/" + randomSide; }, 1200); // 最后在1.2秒时切换到randomSide    
    }

    coin.addEventListener('animationend', function() {
        // coin.src = "images/" + randomSide;
        coin.classList.remove("flip"); // 移除动画类，为下一次翻转做准备
    }, { once: true });
}

window.addEventListener('resize', function() {
    console.log("Screen width is now: " + window.innerWidth);
    var coin = document.getElementById("coin");
    if (window.innerWidth < 768) {
        // 假設硬幣和容器的尺寸在小屏幕上需要特別處理
        coin.style.width = "80px";
    } else {
        coin.style.width = "150px";
    }
});
