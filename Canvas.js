function Canvas(a) {
    if (!a) {
        a = {
            width: window.innerWidth,
            height: window.innerHeight,
            parent: document.body
        }

    }
    var canvas = document.createElement("canvas");
    a.parent.appendChild(canvas)
    canvas.width = a.width;
    canvas.height = a.height;
    this.xlim = canvas.width;
    this.ylim = canvas.height;
    this.c = canvas.getContext("2d");
    this.clear = () => {
        this.c.clearRect(0, 0, xlim, ylim);
    }
    this.rect = (a) => {
        if (!a) {}
        this.c.beginPath();
        this.c.fillStyle = a.color;
        this.c.rect(a.x, a.y, a.w, a.h);
        if (a.style == 1) {
            tyhis.c.stroke();
        } else {
            this.c.fill();
        }
        this.c.closePath();
    }
    this.arc = (a) => {
        if (!a) {}
        this.c.beginPath();
        this.c.fillStyle = a.color;
        this.c.arc(a.x, a.y, a.r, 0, Math.PI * 2, false);
        this.c.fill();
        this.c.closePath();
    }
}
var canvas = new Canvas();
var c = canvas.c;

function Ball(a) {
    if (!a) {
        a = {
            pos: new Vector(100, 100),
            vel: new Vector(0, 0),
            acc: new Vector(0, 0),
            radius: 10,
            color: "black",
            mass: 1,
            bound: true,
            world: {
                pos: new Vector(100, 100),
                size: new Vector(200, 200)
            },
            no_move: true,
            friction: 1,
            img: undefined
        }
    }
    this.pos = a.pos || new Vector(100, 100);
    this.vel = a.vel || new Vector(0, 0);
    this.acc = a.acc || new Vector(0, 0);
    this.radius = a.radius || 10;
    this.color = a.color || "black";
    this.mass = a.mass || 1;
    this.bound = a.bound || false;
    this.no_move = (a.no_move) ? a.no_move : true;
    this.world = a.world || {
        pos: new Vector(100, 100),
        size: new Vector(200, 200)
    };
    this.friction = a.friction || 1;
    this.img = a.img || undefined;

    this.show = () => {
        if (this.img) {
            c.drawImage(this.img, this.pos.x, this.pos.y, this.radius * 2, this.radius * 2);
        } else {
            c.beginPath();
            c.fillStyle = this.color;
            c.arc(this.pos.x, this.pos.y, this.radius, 0, Math.PI * 2, false);
            c.fill();
            c.closePath();
        }
    }

    this.bound_ball = () => {
        if (!this.bound) { return; }
        if (!this.img) {

            if (this.pos.x < this.world.pos.x + this.radius) {
                this.pos.x = this.world.pos.x + this.radius;
                this.vel.x = -this.vel.x;
            }
            if (this.pos.x > (this.world.pos.x + this.world.size.x) - this.radius) {
                this.pos.x = this.world.pos.x + this.world.size.x - this.radius;
                this.vel.x = -this.vel.x;
            }
            if (this.pos.y < this.world.pos.y + this.radius) {
                this.pos.y = this.world.pos.y + this.radius;
                this.vel.y = -this.vel.y;
            }
            if (this.pos.y > this.world.pos.y + this.world.size.y - this.radius) {
                this.pos.y = this.world.pos.y + this.world.size.y - this.radius;
                this.vel.y = -this.vel.y;
            }
        } else {
            if (this.pos.x < this.world.pos.x) {
                this.pos.x = this.world.pos.x;
                this.vel.x = -this.vel.x;
            }
            if (this.pos.x > (this.world.pos.x + this.world.size.x) - this.radius * 2) {
                this.pos.x = this.world.pos.x + this.world.size.x - this.radius * 2;
                this.vel.x = -this.vel.x;
            }
            if (this.pos.y < this.world.pos.y + this.radius * 2) {
                this.pos.y = this.world.pos.y + this.radius * 2;
                this.vel.y = -this.vel.y;
            }
            if (this.pos.y > this.world.pos.y + this.world.size.y - this.radius * 2) {
                this.pos.y = this.world.pos.y + this.world.size.y - this.radius * 2;
                this.vel.y = -this.vel.y;
            }
        }
    }

    this.move = () => {
        if (!this.no_move) { return; }
        this.vel.add(this.acc);
        this.pos.add(this.vel);
        this.vel.scalar(this.friction);
    }
    this.addForce = (a) => {
        this.vel.add(a);
    }

    this.attach = (a) => {
        this.bound = false;
        this.no_move = false;
        this.pos = a;
    }
    this.detach = () => {
        this.bound = true;
        this.no_move = true;
    }

    this.attract = (a, b) => {
        var nVec = new Vector(this.pos.x - a.pos.x, this.pos.y - a.pos.y);
        if (b) {
            nVec.setMag(b);
        } else {
            nVec.setMag(1);
        }
        a.vel.add(nVec);
    }

    this.repel = (a, b) => {
        var nVec = new Vector(this.pos.x - a.pos.x, this.pos.y - a.pos.y);
        if (b) {
            nVec.setMag(b);
        } else {
            nVec.setMag(1);
        }
        a.vel.sub(nVec);
    }

    this.collide = (a) => {
        if (a.pos.dist(this.pos) <= a.radius + this.radius) {
            return (true);
        } else {
            return (false);
        }
    }

    this.update = () => {
        this.bound_ball();
        this.move();
    }


}