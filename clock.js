var flag = -1;
var animateTime = 3000;
var timeoutId;

function update(h, m, s) {
    var sec = 6 * s;
    var min = 6 * m + sec / 60;
    var hour = h * 30 + min / 12;
    var r = 34;
    var a = 7;
    var b = -a * Math.cos((min * Math.PI) / 180);
    var l = -b + Math.sqrt(b * b - (a * a - r * r));
    l = l / 0.95 / ((1 + Math.tan((20 / 180) * Math.PI)) * Math.SQRT2);
    $("#sec").css({ transform: `rotate(${sec - 90}deg)` });
    $("#hour").css({ transform: `rotate(${hour - 180}deg)` });
    $("#min").css({ transform: `rotate(${min}deg) scale(${l / 23})` });
}

function cb() {
    var time = new Date();
    if (flag == 0) {
        update(time.getHours(), time.getMinutes(), time.getSeconds());
    } else if (flag == 1) {
        $(".sub").css("transition", `transform ${animateTime}ms 0s ease`);
        $("#sec").css("transform", "rotate(1080deg)");
        $("#min").css("transform", "rotate(-1080deg)");
        $("#hour").css("transform", "rotate(-720deg)");
    }
    $("#RealtimeClockArea").html(`${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`)
}

function displayTime() {
    var time = new Date();
    update(
        time.getHours(),
        time.getMinutes(),
        time.getSeconds() + animateTime / 1000
    );
    timeoutId = setTimeout(function() {
        flag = 0;
        cb();
        $(".sub").css("transition", "");
    }, animateTime);
}

function init() {
    // $(".clock").hover(
    //     function() {
    //         flag = 1;
    //         clearTimeout(timeoutId);
    //         cb();
    //     },
    //     function() {
    //         flag = -1;
    //         displayTime();
    //     }
    // );
    $(".clock").on('click',
        function(){
            if(flag != 1){
                flag = 1;
                clearTimeout(timeoutId)
                cb();
            }
            else{
                flag = -1;
                displayTime();
            }
        }
    )
    $("#min").css("transform-origin", "50% 57%");
    $("#hour").css("transform-origin", "50% 57%");
    $(".sub").css("transition", `transform ${animateTime}ms 0s ease`);
    displayTime();
    setInterval("cb()", 1000);
}

setTimeout("init()", 1000);
