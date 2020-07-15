var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var primitivas = [], objSelecionado = null;
var posX = 0, posY = 0;


function atualizarCanvas() {
    ctx.fillStyle = '#ebebeb';
    ctx.fillRect(0, 0, canvas.width, canvas.width);

    for (var i = 0; i < primitivas.length; i++) {

        if(primitivas[i].tipo === 'poligono'){
            ctx.fillStyle = primitivas[i].color;
            ctx.fillRect(primitivas[i].x, primitivas[i].y, primitivas[i].width, primitivas[i].height);
        }
        if(primitivas[i].tipo === 'ponto'){
            ctx.fillStyle = primitivas[i].color;
            ctx.arc(primitivas[i].x,  primitivas[i].y,  primitivas[i].width, primitivas[i].height, 2 * Math.PI);
            ctx.fill()
        }
        if(primitivas[i].tipo === 'reta'){
            ctx.beginPath()
            ctx.moveTo(primitivas[i].x, primitivas[i].y);
            ctx.lineTo(primitivas[i].width, primitivas[i].height);
            ctx.fillStyle = primitivas[i].color;
            ctx.stroke()
        }

    }
}

window.onload = function () {
    primitivas = [];

    primitivas.push({ tipo: 'poligono',
        x: 50, y: 120,
        width: 100, height: 200,
        color: 'orange'
    });

    primitivas.push({ tipo: 'ponto',
        x: 100, y: 100,
        width: 20, height: 0,
        color: 'green'
    });

    primitivas.push({ tipo: 'reta',
        x: 80, y: 20,
        width: 300, height: 300,
        color: 'pink'
    });



    atualizarCanvas();

    canvas.onmousedown = function (event) {
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
            else{
                ctx.translate( primitivas[i].x+primitivas[i].width/2, primitivas[i].y+primitivas[i].height/2 );
                ctx.rotate( Math.PI/4 );
                ctx.translate( -primitivas[i].x-primitivas[i].width/2, -primitivas[i].y-primitivas[i].height/2 );
                ctx.fillRect( primitivas[i].x, primitivas[i].y, primitivas[i].width, primitivas[i].height );
                break;
            }
        }

    }

    canvas.onmousemove = function (event) {
        if (objSelecionado != null) {
            objSelecionado.x = event.offsetX - posX;
            objSelecionado.y = event.offsetY - posY;
        }
        atualizarCanvas();
    }

    canvas.onmouseup = function (evet) {
        objSelecionado = null;
    }


}


