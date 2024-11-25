const div = document.querySelector('.feuille');
const h1 = document.querySelector('h1')
const XMAX = 1075
const XMIN = 400
const YMAX = 450
const YMIN = 0

let timer;  
let date = new Date()
let heur = date.getHours()
let randomx = 0;
let randomy = 0;
let storagefeuille = [];
let compteur = 0;

function startTimer () {
	timer = setInterval(()=>{  
	date = new Date()
	let temps = date.getHours() + ":" +(date.getMinutes() < 10 ? '0' : '') + date.getMinutes() + ":" +(date.getSeconds() < 10 ? '0' : '') + date.getSeconds();                                                
	h1.innerHTML =temps;
   }, 1000);
}

function getRandomx() {
	randomx = Math.random() * (XMAX - XMIN) + XMIN;
	return randomx
}
function getRandomy() {
	randomy = Math.random() * (YMAX - YMIN) + YMIN;
	return randomy
}

function adduneFeuille(x,y)
{
	const img = document.createElement('img')
	img.style.position = "absolute"
	img.style.left = x + 'px'
	img.style.top = y + 'px'
	img.setAttribute("src", "leaf1.png")
	img.style.height = "75px";
	div.appendChild(img)
}

function addfeuilles(){
	let addfeuille = setInterval (()=> {
		getRandomx()
		getRandomy()
		storagefeuille.push({x : randomx, y : randomy})
		sessionStorage.setItem("key",JSON.stringify(storagefeuille));
		adduneFeuille(randomx,randomy);
		compteur++;
		console.log(compteur)
		if (compteur == 50){
			clearInterval(addfeuille)
			console.log(storagefeuille)
		}
	
	}, 100)
}

 // x min = 400  et 1075
 // y min = 0  et max  450

if (heur>16){
	div.style.filter = "grayscale(0.8)"
}

if (sessionStorage.getItem("key")) {
	let storagefeuille = JSON.parse(sessionStorage.getItem("key"))
	console.log(storagefeuille)
}
else {
	addfeuilles()
}

startTimer()