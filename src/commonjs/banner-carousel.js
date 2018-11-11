let timer

let picNum = $('.movement ul').children().length;

$('.movement ul li:first').clone().appendTo('.movement ul');
var $carousel = $('.carousel ')
var $movement = $('.carousel .movement');
var $btnLeft = $('.carousel .btns .btnLeft');
var $btnRight = $('.carousel .btns .btnRight');

let circleStr = ""
for (var i = 0; i < picNum; i++) {
    circleStr += '<li></li>'
}
$('.carousel .circles ol').html(circleStr);
var $circles = $('.carousel .circles ol li');
 $circles.eq(0).addClass('cur');



var idx = 0;
function btnLeftClickhandler() {
    if ($movement.is(':animated')) return;
    idx--;
    if (idx < 0) {
        idx = picNum - 1;
        $movement.css('left', picNum * -1130);
    }
    $movement.animate({ 'left': idx * -1130 }, 500);
    changeCircles(idx);
}
function btnRightClickhandler() {
    if ($movement.is(':animated')) return;
    idx++;
    $movement.animate({ 'left': idx * -1130 }, 500, function () {
        if (idx > picNum - 1) {
            idx = 0;
            $movement.css('left', 0);
        }
        changeCircles(idx);
    })
}
function circleClickhandler() {
    if ($movement.is(':animated')) return;
    var idx = picNum = $(this).index();
    changeCircles(idx)
    $movement.css('left', -1130 * idx);
}
function changeCircles(n) {
    $circles.removeClass('cur');
    $circles.eq(n).addClass('cur');

}
$btnLeft.click(btnLeftClickhandler);
$btnRight.click(btnRightClickhandler);
$circles.click(circleClickhandler);

$carousel.mouseenter(function () {
    clearInterval(timer);
})
$carousel.mouseleave(function () {
    timer = setInterval(function () {
        btnRightClickhandler();
    }, 2000);
})


timer = setInterval(function () {
    btnRightClickhandler();
}, 2000);