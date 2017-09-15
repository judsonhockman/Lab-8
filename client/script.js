//Input boxes
var inputSquareSide = document.getElementById('input-square-side');
var inputRectangleWidth = document.getElementById('input-rectangle-width');
var inputRectangleHeight = document.getElementById('input-rectangle-height');
var inputTriangleHeight = document.getElementById('input-triangle-height');
var inputCircleRadius = document.getElementById('input-circle-radius');

//span labels
var shapeNameLabel = document.getElementById('shape-name');
var shapeWidthLabel = document.getElementById('shape-width');
var shapeHeightLabel = document.getElementById('shape-height');
var shapeRadiusLabel = document.getElementById('shape-radius');
var shapeAreaLabel = document.getElementById('shape-area');
var shapePerimeterLabel = document.getElementById('shape-perimeter');

var canvas = document.getElementById('canvas');

// Click listeners
document.getElementById('circle-button').addEventListener('click', createCircle);
document.getElementById("triangle-button").addEventListener("click", createTriangle);
document.getElementById("rectangle-button").addEventListener("click", createRectangle);
document.getElementById("square-button").addEventListener("click", createSquare);


function createCircle() {
    var inputRadius = inputCircleRadius.value;
    new Circle(inputRadius);
}

function createTriangle() {
    var inputTriHeight = inputTriangleHeight.value;
    new Triangle(inputTriHeight);
}

function createRectangle() {
    var inputWidth = inputRectangleWidth.value;
    var inputHeight = inputRectangleHeight.value;
    new Rectangle(inputWidth, inputHeight);
}

function createSquare() {
    var inputSide = inputSquareSide.value;
    new Square(inputSide);
}

function Shape(width, height) {
    this.width = width;
    this.height = height;
}
Shape.prototype.draw = function () {
    this.div = document.createElement('div');
    this.div.className = 'shape ' + this.cssClass;

    var x = Math.floor(Math.random() * (600 - this.width));
    var y = Math.floor(Math.random() * (600 - this.height));

    this.div.style.top = y + 'px';
    this.div.style.left = x + 'px';
    this.div.style.width = this.width + 'px';
    this.div.style.height = this.height + 'px';

    this.div.addEventListener('click', this.describe.bind(this));
    this.div.addEventListener('dblclick', function () {
        this.div.remove();
    }.bind(this));

    canvas.appendChild(this.div);
}
Shape.prototype.describe = function () {
    shapeNameLabel.innerText = this.constructor.name;
    shapeWidthLabel.innerText = this.width;
    shapeHeightLabel.innerText = this.height;
    shapeRadiusLabel.innerText = this.radius;
    shapeAreaLabel.innerText = this.area();
    shapePerimeterLabel.innerText = this.perimeter();
}

function Circle(radius) {
    Shape.call(this, 2 * radius, 2 * radius);
    this.radius = radius;
    this.cssClass = 'circle';
    this.draw();
}
Circle.prototype = Object.create(Shape.prototype);
Circle.prototype.constructor = Circle;

Circle.prototype.area = function () {
    return Math.PI * Math.pow(this.radius, 2);
}

Circle.prototype.perimeter = function () {
    return 2 * Math.PI * this.radius;
}

function Triangle(height) {
    Shape.call(this, height, height);
    this.cssClass = "triangle-bottomleft";
    this.draw();
    this.div.style.width = "0";
    this.div.style.height = "0";
    this.div.style.borderRightWidth = this.height + "px";
    this.div.style.borderBottomWidth = this.height + "px";    
}

Triangle.prototype = Object.create(Shape.prototype);
Triangle.prototype.constructor = Triangle;

Triangle.prototype.area = function () {
    return 0.5 * this.height;
}

Triangle.prototype.perimeter = function () {
    // return 2 * height + Math.PI// square root of 2 times height //
    return 2 * this.height + Math.sqrt(2 * this.height);
}

function Rectangle(width, height) {
    Shape.call(this, width, height);
    this.width = width;
    this.height = height;
    this.cssClass = "rectangle";
    this.draw();
}
Rectangle.prototype = Object.create(Shape.prototype);
Rectangle.prototype.constructor = Rectangle;

Rectangle.prototype.area = function () {
    return this.width * this.height;
}

Rectangle.prototype.perimeter = function () {
    return 2 * this.width + 2 * this.height;
}

function Square(sideLength) {
    Shape.call(this, sideLength, sideLength);
    this.sideLength = sideLength;
    this.sideLength = sideLength;
    this.cssClass = "square";
    this.draw();
}
Square.prototype = Object.create(Rectangle.prototype);
Square.prototype.constructor = Square;

Square.prototype.area = function () {
    return this.sideLength * this.sideLength;
}
Square.prototype.perimeter = function () {
    return this.sideLength * 4;
}