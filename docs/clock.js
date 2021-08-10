var flag = -1;
var animateTime = 3000;
var timeoutId;

function update(h, m, s) {
    var sec = 6 * s;
    var min = 6 * m + sec / 60;
    var hour = h * 30 + min / 12;
    var r = 34;
    var a = 7;
    var b = -a * Math.cos(min * Math.PI / 180);
    var l = -b + Math.sqrt(b*b - (a*a - r*r));
    l = l / 0.95 / ((1+Math.tan(20/180*Math.PI))*Math.SQRT2)
    $('.sec').css({'transform': `rotate(${sec - 45}deg) skew(11deg, 11deg)`});
    $('.hour').css({'transform': `translate(45%, -38%) rotate(${hour - 45}deg) skew(-20deg, -20deg) scale(15%)`});
    $('.min').css({'transform': `translate(45%, -38%) rotate(${min - 45}deg) skew(-20deg, -20deg) scale(${l}%)`});
}

function cb() {
    if(flag == 0){
        var time = new Date();
        update(time.getHours(), time.getMinutes(), time.getSeconds());
    }
    else if(flag == 1){
        $('.sub').css('transition', `transform ${animateTime}ms 0s ease`);
        $('.sec').css('transform', 'rotate(1125deg) skew(11deg, 11deg)');
        $('.min').css('transform', 'translate(45%, -38%) rotate(-1485deg) skew(-20deg, -20deg) scale(23%)');
        $('.hour').css('transform', 'translate(45%, -38%) rotate(-585deg) skew(-20deg, -20deg) scale(15%)');
    }
}

function displayTime(){
    var time = new Date();
    update(time.getHours(), time.getMinutes(), time.getSeconds() + animateTime/1000);
    timeoutId = setTimeout(function(){
        flag = 0;
        cb();
        $('.sub').css('transition', '');
    }, animateTime);
}

function init(){
    $('.clock').hover(
        function(){
            flag = 1;
            clearTimeout(timeoutId);
            cb();
        },
        function(){
            flag = -1;
            displayTime();
        }
    );
    $('.sub').css('transition', `transform ${animateTime}ms 0s ease`);
    displayTime();
    setInterval('cb()', 1000);
}

setTimeout('init()', 1000);

