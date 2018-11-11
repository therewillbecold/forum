(function () {
    let $box3Refresh = $('.box3 .refresh')
    $box3Refresh.click(refreshAnimation)

    function refreshAnimation() {
        $box3Refresh.find('.line').css({ height: '60px' })
        $box3Refresh.find('.circle').css({ bottom: '-23px' })
        $box3Refresh.find('.circle em').css({ transform: 'rotateZ(720deg)' })
        setTimeout(function () {
            $box3Refresh.find('.line').css({ height: '46px' })
            $box3Refresh.find('.circle').css({ bottom: '-12px' })
            $box3Refresh.find('.circle em').css({ transform: 'rotateZ(0deg)' })
        }, 300)
    }

})()