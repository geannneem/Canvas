var model = {
    context: {},
    cnv: {},
    angle: 0,
    width: 100,
    bgColor: "#ff0000"
};

$(document).ready(function(){
    //start the menu
    $( '#canvas' ).css( "background-color", "#000000" ).setUpCanvas();
});

jQuery.fn.setUpCanvas = function() {
    // setup canvas
    model.cnv = $(this)[0];
    model.context = model.cnv.getContext('2d');

    var cX, cY;
    var mX, mY = 0;
    var offX, offY;




    $(model.cnv).mousedown(function (event) {
        // calculate click angle minus the last angle
        var clickAngle = getAngle(cX + offX, cY + offY, event.clientX, event.clientY) - model.angle;
        $(model.cnv).bind("mousemove", clickAngle, function (event) {
            // calculate move angle minus the angle onclick
            model.angle = (getAngle(cX + offX, cY + offY, event.clientX, event.clientY) - clickAngle);
            updateRectangle(model.angle);
        });
    });

    $(model.cnv).mouseup(function () {
        $(model.cnv).unbind("mousemove");
    });

}
function getAngle( cX, cY, mX, mY ){
    var angle = Math.atan2(mY - cY, mX - cX);
    return angle;
}