let canvas, canvasW, canvasH, ctx;
let midX, midY;

let backgroundColor = "#1e272e";
let clockRadius;
let hPointerRadius, mPointerRadius, sPointerRadius;
let hSlideRadius, mSlideRadius, sSlideRadius;
let pointerSize = 4;
let animationId;

$(document).ready(() => {
    canvas = $('#my-canvas')[0];
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    canvasW = canvas.width, midX = canvasW / 2;
    canvasH = canvas.height, midY = canvasH / 2;
    ctx = canvas.getContext("2d");

    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, canvasW, canvasH);
    setDrawRadius();
    draw();

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        canvasW = canvas.width, midX = canvasW / 2;
        canvasH = canvas.height, midY = canvasH / 2;

        ctx.fillStyle = backgroundColor;
        ctx.fillRect(0, 0, canvasW, canvasH);
        setDrawRadius();
        draw();
    });
});

function draw() {
    animationId = window.requestAnimationFrame(draw);
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, canvasW, canvasH);
    let timeNow = new Date();
    let h = timeNow.getHours(), m = timeNow.getMinutes(), s = timeNow.getSeconds(), ms = timeNow.getMilliseconds();
    
    ctx.font = '45px arial';
    ctx.textAlign = 'right';
    ctx.fillStyle = "#d2dae2";
    ctx.fillText(h.toString().padStart(2, '0') + ':' + m.toString().padStart(2, '0') + ':' + s.toString().padStart(2, '0'), canvasW - 15, canvasH - 15);
    
    s +=  ms / 1000;
    m += s / 60;
    h += m / 60;

    let hPointerAngle = (((h / 12) * 2) % 2 - 0.5);
    let mPointerAngle = (m / 60) * 2 - 0.5;
    let sPointerAngle = (s / 60) * 2 - 0.5;
    
    drawLine(midX, midY, getX(midX, sPointerRadius, Math.PI * sPointerAngle), getY(midY, sPointerRadius, Math.PI * sPointerAngle), pointerSize, "#ff9f1a");
    drawLine(midX, midY, getX(midX, mPointerRadius, Math.PI * mPointerAngle), getY(midY, mPointerRadius, Math.PI * mPointerAngle), pointerSize, "#7158e2");
    drawLine(midX, midY, getX(midX, hPointerRadius, Math.PI * hPointerAngle), getY(midY, hPointerRadius, Math.PI * hPointerAngle), pointerSize, "#ff3838");

    drawArc(midX, midY, sSlideRadius, -0.5, sPointerAngle, pointerSize, "#ff9f1a");
    drawArc(midX, midY, mSlideRadius, -0.5, mPointerAngle, pointerSize, "#7158e2");
    drawArc(midX, midY, hSlideRadius, -0.5, hPointerAngle, pointerSize, "#ff3838");

    ctx.beginPath();
    ctx.arc(midX, midY, 5, 0, Math.PI * 2);
    ctx.fillStyle = "#d2dae2";
    ctx.fill();
    ctx.closePath();
}

function drawLine(srcX, srcY, dstX, dstY, size, color) {
    ctx.beginPath();
    ctx.arc(srcX, srcY, size / 2, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.closePath();

    ctx.beginPath();
    ctx.moveTo(srcX, srcY);
    ctx.lineTo(dstX, dstY);
    ctx.lineWidth = size;
    ctx.strokeStyle = color;
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    ctx.arc(dstX, dstY, size / 2, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.closePath();
}

function drawArc(x, y, radius, startAngle, endAngle, size, color) {
    ctx.beginPath();
    ctx.arc(getX(x, radius, Math.PI * startAngle), getY(y, radius, Math.PI * startAngle), size / 2, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.closePath();

    ctx.beginPath();
    ctx.arc(x, y, radius, Math.PI * startAngle, Math.PI * endAngle);
    ctx.lineWidth = size;
    ctx.strokeStyle = color;
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    ctx.arc(getX(x, radius, Math.PI * endAngle), getY(y, radius, Math.PI * endAngle), size / 2, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.closePath();
}

function setDrawRadius() {
    if(canvasH < canvasW)
        clockRadius = canvasH * (1 / 3);
    else
        clockRadius = canvasW * (1 / 3);

    sPointerRadius = clockRadius * 0.9;
    mPointerRadius = clockRadius * 0.75;
    hPointerRadius = clockRadius * 0.5;

    hSlideRadius = clockRadius * 1.05;
    mSlideRadius = clockRadius * 1.1;
    sSlideRadius = clockRadius * 1.15;
}

function getX(x, radius, angle){
    return x + Math.cos(angle) * radius;
}

function getY(y, radius, angle){
    return y + Math.sin(angle) * radius;
}