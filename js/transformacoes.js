var cv = document.getElementById('canvas2');
var cntext = cv.getContext('2d');
var primitivas = [], objSelecionado = null;
var posX = 0, posY = 0;


var tipo_transformacao = $(".btn-transf").val();

function transformacoes(obj) {
    tipo_transformacao = obj.value;
    if (tipo_transformacao === 'rotacao') {
        document.getElementById('rotacao').disabled = true;
        document.getElementById('translacao').disabled = false;
        document.getElementById('escala').disabled = false;
        atualizarCanvas();

        cntext.translate(primitivas[0].x + primitivas[0].width / 2, primitivas[0].y + primitivas[0].height / 2);
        cntext.rotate(Math.PI / 4);
        cntext.translate(-primitivas[0].x - primitivas[0].width / 2, -primitivas[0].y - primitivas[0].height / 2);
        cntext.fillRect(primitivas[0].x, primitivas[0].y, primitivas[0].width, primitivas[0].height);
    }
    if (tipo_transformacao === 'translacao') {

        document.getElementById('rotacao').disabled = false;
        document.getElementById('translacao').disabled = true;
        document.getElementById('escala').disabled = false;

        atualizarCanvas();


        cv.onmousedown = function (event) {
            for (var i = 0; i < primitivas.length; i++) {
                if (primitivas[i].x < event.offsetX
                    && (primitivas[i].width + primitivas[i].x > event.clientX)
                    && primitivas[i].y < event.offsetY
                    && (primitivas[i].height + primitivas[i].y > event.clientY)
                ) {
                    objSelecionado = primitivas[i];
                    posX = event.offsetX - primitivas[i].x;
                    posY = event.offsetY - primitivas[i].y;


                    break;
                }
                // else {
                //     cntext.save();
                //     cntext.translate(primitivas[i].x + primitivas[i].width / 2, primitivas[i].y + primitivas[i].height / 2);
                //     cntext.rotate(Math.PI / 4);
                //     cntext.translate(-primitivas[i].x - primitivas[i].width / 2, -primitivas[i].y - primitivas[i].height / 2);
                //     cntext.fillRect(primitivas[i].x, primitivas[i].y, primitivas[i].width, primitivas[i].height);
                //     break;
                // }
            }

        }

        cv.onmousemove = function (event) {
            if (objSelecionado != null) {
                objSelecionado.x = event.offsetX - posX;
                objSelecionado.y = event.offsetY - posY;
            }
            atualizarCanvas();
        }

        cv.onmouseup = function (evet) {
            objSelecionado = null;
        }


    }

    if (tipo_transformacao === 'escala') {
        var tam_zoom = 0.1
        var escala = 1;

        var largura = 950 / escala;
        var altura = 200 / escala;


        setInterval(atualizarCanvas, 80);

        document.getElementById('rotacao').disabled = false;
        document.getElementById('translacao').disabled = false;
        document.getElementById('escala').disabled = true;
        cv.onwheel = function (evt) {
            evt.preventDefault();

            mousex = evt.clientX - canvas.offsetLeft;
            mousey = evt.clientY - canvas.offsetTop;

            var wheel = evt.deltaY < 0 ? 1 : -1;

            var zoom = Math.exp(wheel * tam_zoom);
            cntext.translate(px, py);
            px -= mousex / (escala * zoom) - mousex / escala;
            py -= mousey / (escala * zoom) - mousey / escala;

            cntext.scale(zoom, zoom);

            cntext.translate(-px, -py);


            escala = escala * zoom;
            largura = 950 / escala;
            altura = 200 / escala;

        }

    }

}


function atualizarCanvas() {
    cntext.fillStyle = '#ebebeb';
    cntext.fillRect(0, 0, cv.width, cv.width);

    for (var i = 0; i < primitivas.length; i++) {
        cntext.fillStyle = primitivas[i].color;
        cntext.fillRect(primitivas[i].x, primitivas[i].y, primitivas[i].width, primitivas[i].height);
    }
}


window.onload = function () {
    primitivas = [];

    primitivas.push({

        x: 500, y: 50,
        width: 100, height: 100,
        color: cor
    });


}


