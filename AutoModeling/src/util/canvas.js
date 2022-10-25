let Cwidth = window.innerWidth, Cheight = window.innerHeight
let cxt = null;

export function getCanvas() {
    const c = document.getElementById("myCanvas");
    c.width = Cwidth;
    c.height = Cheight;
    cxt = c.getContext("2d");
    // cxt.translate(c.width / 2 , c.height / 2)
}
export function drawLine(points) {
    const len = points.length
    cxt.fillStyle = "#049ef4";
    cxt.lineWidth = 2;
    if (len === 1) {
        // cxt.moveTo(x, y)
        cxt.moveTo(points[0][0], points[0][1])
        cxt.beginPath();
        cxt.arc(points[0][0], points[0][1], 5, 0, Math.PI * 2, true);
        cxt.closePath();
        cxt.stroke();
    } else if (len > 1) {
        // for (let i = 1; i < points.length; i++) {
        //   cxt.lineTo(points[i][0], points[i][1]);
        // }
        cxt.lineTo(points[len - 1][0], points[len - 1][1]);
        cxt.stroke();
    }
}
export function clearCanvas(){
    cxt.clearRect(0,0,Cwidth,Cheight)
    cxt.beginPath();
}