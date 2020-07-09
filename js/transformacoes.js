canvas.addEventListener("click", getClickPosition, false);

var x = $(canvas).offset().left;
var y = $(canvas).offset().top;

function getClickPosition(e) {
    var xPosition = parseInt(e.clientX - x);
    var yPosition = parseInt(e.clientY - y);

    ctx.translate(xPosition, yPosition)

}