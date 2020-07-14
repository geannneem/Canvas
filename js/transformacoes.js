

primitivas.onmousedown = function (event) {
    let shiftX = event.clientX - primitivas.getBoundingClientRect().left;
    let shiftY = event.clientY - primitivas.getBoundingClientRect().top;

    moveAt(event.pageX, event.pageY);

    
    function moveAt(pageX, pageY) {
        primitivas.style.left = pageX - shiftX + 'px';
        primitivas.style.top = pageY - shiftY + 'px';
    }

    function onMouseMove(event) {
        moveAt(event.pageX, event.pageY);
    }

    document.addEventListener('mousemove', onMouseMove);


    primitivas.onmouseup = function() {
        document.removeEventListener('mousemove', onMouseMove);
        primitivas.onmouseup = null;
    };
}