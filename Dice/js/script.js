var scene = new THREE.Scene();


// FUNCTION TO CONVERT DEGREES TO RADIANS, BECAUSE THREE USES RADIANS

var degreesToRadians = function (radians) {
	var degrees;
	degrees = (Math.PI/180)*radians;

	return degrees;
}




// ==================================================================================

// FUNCTION TO CREATE A CAMERA
var createCamera = function () {

	var camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight,1,1000);
	camera.position.z = 100;
	return camera;
	
}

// CALLING THE FUNCTION AND PUTTING THAT CREATED CAMERA INTO THIS VARIABLE
var camera = createCamera();

// ===================================================================================


// FUNCTION TO CREATE RENDERER
var createRenderer = function () {
	
	var renderer = new THREE.WebGLRenderer({alpha: true});
	renderer.setSize(window.innerWidth, window.innerHeight);
	return renderer;
}

// CALLING THE FUNCTION AND PUTTING THAT CREATED RENDERER INTO THIS VARIABLE

var renderer = createRenderer();

// ===================================================================================

// FUNCTION TO CREATE LIGHT
var createLight = function () {
	var light = new THREE.PointLight(0xffffff, 0.8 );
	light.position.set(0,0,60);
	return light;

}

// CALLING THE FUNCTION AND PUTTING THAT CREATED RENDERER INTO THIS VARIABLE
var light = createLight();

// ===================================================================================


// FUNCTION TO CREATE A CUBE
var createCube = function () {

	var textureLoader = new THREE.TextureLoader(); 

	var texture1 = textureLoader.load('img/1.jpg');
	var texture2 = textureLoader.load('img/2.jpg');
	var texture3 = textureLoader.load('img/3.jpg');
	var texture4 = textureLoader.load('img/4.jpg');
	var texture5 = textureLoader.load('img/5.jpg');
	var texture6 = textureLoader.load('img/6.jpg');

	var materials = [
	new THREE.MeshLambertMaterial({map: texture1}),
	new THREE.MeshLambertMaterial({map: texture2}),
	new THREE.MeshLambertMaterial({map: texture3}),
	new THREE.MeshLambertMaterial({map: texture4}),
	new THREE.MeshLambertMaterial({map: texture5}),
	new THREE.MeshLambertMaterial({map: texture6}),
	];



	var geometry = new THREE.BoxGeometry(30,30,30),
	material = new THREE.MultiMaterial(materials),
	mesh = new THREE.Mesh(geometry, material);

	return mesh;

}
var cube = createCube();

// ===================================================================================

var draw = function (scene,camera,cube) {
	window.requestAnimationFrame(function () {
		TWEEN.update();
		renderer.render(scene,camera);
		draw(scene,camera,cube);

	});
}


// ===================================================================================


// FUNCTION TO GENERATE A RANDOM NUMBER

var generateResult = function () {
	return Math.floor(Math.random()*6+1);

}

// AN OBJECT CONTAINING DICE POSITIONS
var dicePositions =  {
	1 :  {
		x : 0,
		y : degreesToRadians(270),
		z : 0
	},
	2 :  {
		x : 0,
		y : degreesToRadians(90),
		z : 0
	},
	3 :  {
		x : degreesToRadians(90),
		y : 0,
		z : 0
	},
	4 :  {
		x : degreesToRadians(270),
		y : 0,
		z : 0
	},
	5 :  {
		x : 0,
		y : 0,
		z : 0
	},
	6 :  {
		x : degreesToRadians(180),
		y : 0,
		z : 0
	}
};

// FUNCTION TO ROLL THE DICE ON CLICK
var rollDice = function () {
	var randomno = generateResult(),
	tweens = [];

	var myTween = new TWEEN.Tween(cube.rotation).to( {
		x: dicePositions[randomno].x,
		y: dicePositions[randomno].y,
		z: dicePositions[randomno].z
	}, 500);

	for (var i = 0 ; i < 4  ; i++) {
		

		tweens.push(new TWEEN.Tween(cube.rotation).to( {
			x: generateResult(),
			y: generateResult(),
			z: generateResult()
		}, 300));


		if (i>0) {
			tweens[i-1].chain(tweens[i]);
		}
	}

	tweens[0].start();

	tweens[3].chain(myTween);



}



document.addEventListener( 'click', rollDice);



scene.add(light);
scene.add(camera);
scene.add(cube);


document.getElementById('container').appendChild(renderer.domElement);

renderer.render(scene,camera);


draw(scene,camera,cube);


