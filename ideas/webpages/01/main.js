var config_ = {
    fullSize: () => {
        var canvas = document.querySelector('canvas');
        console.log(canvas);
        canvas.width = window.innerWidth - 10;
        canvas.height = 300; //window.innerHeight-20;
        console.log(window.innerHeight)
    }
}

function renderBox(color, x, y) {
    var canvas = document.querySelector('canvas');
    var c = canvas.getContext('2d');

    var size = {
        width: 200,
        height: 300,
        shiftSkew: 100
    }

    console.log(size);

    c.beginPath();

    c.moveTo(x, y);
    c.lineTo(x + size.width, y);
    c.lineTo(x + size.width + size.shiftSkew, y + size.height);
    c.lineTo(x + size.shiftSkew, y + size.height);
    c.lineTo(x, y);
    c.fillStyle = color;
    c.fill();

}

function renderBoxWithImage(imageUrl, x, y) {
    var tempCanvas = document.createElement('canvas'); // Create a temporary canvas
    var tempCtx = tempCanvas.getContext('2d');

    var size = {
        width: 200,
        height: 300,
        shiftSkew: 100
    };

    // Create a clipping path for the box on the temporary canvas
    tempCtx.beginPath();
    tempCtx.moveTo(0, 0);
    tempCtx.lineTo(size.width, 0);
    tempCtx.lineTo(size.width + (size.shiftSkew * 2), size.height);
    tempCtx.lineTo((size.shiftSkew * 2), size.height);
    //tempCtx.lineTo(0, 0);
    tempCtx.clip(); // Set the clipping path

    // Load the image and render it within the clipping path on the temporary canvas
    var image = new Image();
    image.src = imageUrl;
    image.onload = function () {
        tempCtx.drawImage(image, 0, 0, size.width + size.shiftSkew, size.height);

        tempCtx.beginPath();
        tempCtx.moveTo(0, 0);
        tempCtx.lineTo(size.width, 0);
        tempCtx.lineTo(size.width + (size.shiftSkew * 2), size.height);
        tempCtx.lineTo((size.shiftSkew * 2), size.height);
        var gradient = tempCtx.createLinearGradient(0, 0, 0, size.height);
        gradient.addColorStop(0, 'rgba(0, 0, 0, 0)'); // Darker color at the top
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)'); // Transparent at the bottom
        //tempCtx.fill();
        tempCtx.fillStyle = gradient;

        // Now, draw the contents of the temporary canvas onto the main canvas
        var mainCanvas = document.querySelector('canvas');
        var mainCtx = mainCanvas.getContext('2d');
        mainCtx.drawImage(tempCanvas, x, y, size.width + size.shiftSkew, size.height);
    };
}




function go() {
    config_.fullSize();
    renderBox('rgba(0, 100, 100, 0.55)', -190, 0);
    //renderBoxWithImage('img/hero-bg.png',10,0);
    renderBox('rgba(255,255,0,0.55)', 10, 0);
    renderBox('rgba(0,255,0,0.55)', 210, 0);
    renderBoxWithImage('img/img-02.png', 10, 0);
    renderBoxWithImage('img/img-01.png', 210, 0);
}

go();