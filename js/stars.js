$(document).ready(function(){
    var canvas = document.getElementById('starCanvas');
    var ctx = canvas.getContext('2d');
    var WIDTH = canvas.clientWidth;
    var HEIGHT = canvas.clientHeight;
    var shootingStars;
    var stars;
    var FPS = 30;

    function createStar() {
        this.x = Math.random() * WIDTH;
        this.y = Math.random() * HEIGHT;
        this.velX = (Math.random() < 0.5 ? -1 : 1) * Math.random() * 4;
        this.velY = (Math.random() < 0.5 ? -1 : 1) * Math.random() * 4;
        this.color = 'rgb(255,255,255)';
    }

    function populateShootingStars(shootingCnt) {
        shootingStars = [];
        for(var i = 0; i < shootingCnt; i++) {
            shootingStars.push(new createStar());
        }
    }

    function populateStaticStars(staticCount) {
        stars = [];
        for(var x = 0; x < staticCount; x++) {
            stars.push(new createStar());
        }
    }

    function setup() {
        WIDTH = canvas.clientWidth;
        HEIGHT = canvas.clientHeight;
        canvas.setAttribute('width', WIDTH);
        canvas.setAttribute('height', HEIGHT);
        populateShootingStars(shootingStars && shootingStars.length !== undefined ? shootingStars.length : 10);
        populateStaticStars(stars && stars.length !== undefined ? stars.length : 20);
    }

    function draw() {
        setTimeout(function() {
            requestAnimationFrame(draw);
            // Sky
            ctx.globalCompositeOperation = 'source-over';
            var grad = ctx.createLinearGradient(0, 0, 0, HEIGHT);
            grad.addColorStop(0, 'rgba(0,32,162,.3)');
            grad.addColorStop(1, 'rgba(122,235,247,.3)');
            ctx.fillStyle = grad;
            ctx.fillRect(0, 0, WIDTH, HEIGHT);
            ctx.globalCompositeOperation = 'lighter';

            // Shooting Stars
            shootingStars.forEach(function(curStar) {
                ctx.beginPath();
                ctx.fillStyle = curStar.color;
                ctx.arc(curStar.x, curStar.y, 1, Math.PI * 2, false);
                ctx.fill();

                curStar.x += curStar.velX;
                curStar.y += curStar.velY;

                if(curStar.x < -20) curStar.x = WIDTH + 20;
                if(curStar.y < -20) curStar.y = HEIGHT + 20;
                if(curStar.x > WIDTH + 20) curStar.x = -20;
                if(curStar.y > HEIGHT + 20) curStar.y = -20;
            });

            // Static Stars
            stars.forEach(function(curStar) {
                ctx.beginPath();
                ctx.fillStyle = curStar.color;
                ctx.arc(curStar.x, curStar.y, 1, Math.PI * 2, false);
                ctx.fill();
            });
        }, 1000 / FPS);
    }

    setup();
    draw();
    $(window).on('orientationchange', setup);
    $(window).resize(setup);

    $('.shooting').change(function() {
        var val = $(this).val();
        if (val.match(/[^\d]/) || val < 0 || val > 255) {
            val = shootingStars.length;
            $(this).val(val);
        } else {
            populateShootingStars(parseInt(val, 10));
        }
        $(this).blur();
    });

    $('.static').change(function() {
        var val = $(this).val();
        if (val.match(/[^\d]/) || val < 0 || val > 255) {
            val = stars.length;
            $(this).val(val);
        } else {
            populateStaticStars(parseInt(val, 10));
        }
        $(this).blur();
    });
});