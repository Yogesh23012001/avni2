window.onload = function() {
    startTypewriterEffect();
    startHeartFormation();
};

// Typewriter Effect
function startTypewriterEffect() {
    const text = "Welcome, My Love! ❤️";
    const typewriter = document.getElementById('typewriter');
    let index = 0;

    function type() {
        if (index < text.length) {
            typewriter.innerHTML += text[index];
            index++;
            setTimeout(type, 100);
        } else {
            document.querySelector('.text-box').classList.add('show-text');
        }
    }

    setTimeout(type, 1000);
}

// Heart Formation with Continuous Dashes
function startHeartFormation() {
    const canvas = document.getElementById('heartCanvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth / 2;
    canvas.height = window.innerHeight;

    let points = [];
    let progress = 0;
    const flowerImage = new Image();
    flowerImage.src = "images/Adobe Express - file.png"; // Path to your flower image

    function heartEquation(t) {
        let x = 16 * Math.pow(Math.sin(t), 3);
        let y = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
        return { x: x * 15, y: y * 15 };
    }

    function drawHeart() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < points.length; i++) {
            let p = points[i];
            ctx.drawImage(flowerImage, p.x + canvas.width / 2 - 10, p.y + canvas.height / 2 - 10, 20, 20);
        }

        let t = progress * 0.1;
        let newPoint = heartEquation(t);
        points.push(newPoint);
        progress++;

        if (progress > 100) {
            points.shift();
        }

        setTimeout(drawHeart, 150);
    }

    flowerImage.onload = drawHeart; // Start animation after image loads
}

/// Bouncing Balls with Mouse Interaction
function startBouncingBalls() {
    const canvas = document.getElementById('backgroundCanvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let balls = [];

    function createBall() {
        return {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 5 + 2,
            speedX: (Math.random() - 0.5) * 2,
            speedY: (Math.random() - 0.5) * 2,
            gravity: 0.05 + Math.random() * 0.05,
            bounce: 0.7 + Math.random() * 0.2,
            opacity: Math.random() * 0.5 + 0.5,
            settled: false // Track if ball has stopped bouncing
        };
    }

    for (let i = 0; i < 50; i++) {
        balls.push(createBall());
    }

    function drawBalls() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "rgba(255, 255, 255, 0.8)";

        balls.forEach(ball => {
            ctx.beginPath();
            ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
            ctx.fill();

            ball.speedY += ball.gravity;
            ball.x += ball.speedX;
            ball.y += ball.speedY;

            if (ball.x - ball.radius < 0 || ball.x + ball.radius > canvas.width) {
                ball.speedX *= -1;
            }

            if (ball.y + ball.radius > canvas.height) {
                ball.y = canvas.height - ball.radius;
                ball.speedY *= -ball.bounce;
                if (Math.abs(ball.speedY) < 0.1) {
                    ball.settled = true; // Mark as settled if it's barely moving
                }
            } else {
                ball.settled = false; // If it's still moving, mark as not settled
            }

            if (ball.y - ball.radius < 0) {
                ball.speedY *= -1;
            }
        });

        requestAnimationFrame(drawBalls);
    }

    function boostBalls() {
        balls.forEach(ball => {
            if (ball.settled) {
                ball.speedY = -Math.random() * 4 - 2; // Give it a bounce boost
                ball.speedX = (Math.random() - 0.5) * 2; // Slight random movement
                ball.settled = false; // Mark as moving again
            }
        });
    }

    canvas.addEventListener("mousemove", boostBalls); // Boost balls when mouse moves
    drawBalls();
}

startBouncingBalls();

