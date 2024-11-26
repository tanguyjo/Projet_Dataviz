const div = document.querySelector('.feuille'); 
const h1 = document.querySelector('h1')
const boutton = document.getElementById('boutton')
const XMAX = 1075
const XMIN = 400
const YMAX = 450
const YMIN = 0

let addLeaf;
let timer;  
let date = new Date()
let hour = date.getHours()
let randomx = 0;
let randomy = 0;
let storageLeaf = [];
let counter = 0;

boutton.addEventListener('click', ()=>{ //ajout d'un ecouteur quand le boutton est cliqué
	sessionStorage.clear()    // efface la sessionStorage       
	div.innerHTML = ""         // efface le html     
	clearInterval(addLeaf) // arrete l'intervale'addLeaf'
} ) 

function startTimer () {        // recupere la date actuelle et l'affiche ds le html
	timer = setInterval(()=>{  
	date = new Date()
	let time = date.getHours() + ":" +(date.getMinutes() < 10 ? '0' : '') + date.getMinutes() + ":" +(date.getSeconds() < 10 ? '0' : '') + date.getSeconds();                                                
	h1.innerHTML =time;
   }, 1000);
}

function getRandomx() { // renvoie un 'x' alléatoire
	randomx = Math.random() * (XMAX - XMIN) + XMIN;
	return randomx
}
function getRandomy() {  // renvoie un 'y' alléatoire
	randomy = Math.random() * (YMAX - YMIN) + YMIN;
	return randomy
}

function addOneLeaf(x,y) // fx qui ajoute une feuille
{
	const img = document.createElement('img')
	img.style.position = "absolute"
	img.style.left = x + 'px'
	img.style.top = y + 'px'
	img.setAttribute("src", "leaf1.png")
	img.style.height = "75px";
	div.appendChild(img)
}

function addLeaves(){    // fx qui ajoute des feuilles à interval regulier et à des positions alléatoires
	 addLeaf = setInterval (()=> {
		getRandomx()
		getRandomy()
		storageLeaf.push({x : randomx, y : randomy})
		sessionStorage.setItem("key",JSON.stringify(storageLeaf));
		addOneLeaf(randomx,randomy);
		counter++;
		console.log(counter)
		if (counter == 50){
			clearInterval(addLeaf)
			console.log(storageLeaf)
		}
	
	}, 1000)
}

 
if (hour>16){
	//div.style.filter = "grayscale(0.8)"
	div.style.filter = "sepia(1) saturate(3)"
}

if (sessionStorage.getItem("key")) {
	 storageLeaf = JSON.parse(sessionStorage.getItem("key"))
	console.log(storageLeaf)
	for(i = 0; i < storageLeaf.length; i++){
		addOneLeaf(storageLeaf[i].x,storageLeaf[i].y)
		counter++;
		
		
	} if(counter<50){addLeaves()}
}else {
	addLeaves()
}

startTimer()