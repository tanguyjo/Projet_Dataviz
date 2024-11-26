const div = document.querySelector('.feuille'); 
const h1 = document.querySelector('h1')
const boutton = document.getElementById('boutton')
const weatherImg = document.querySelector('.forecast');
const validate = document.querySelector('#valider');
const input = document.querySelector('input')
const XMAX = 65
const XMIN = 30
const YMAX = 60
const YMIN = 5
const MAXCOUNTER = 60

let addLeaf;
let deadLeaf;
let timer;  
let date = new Date()
let randomx = 0;
let randomy = 0;
let storageLeaf = [];
let counter = 0;
let conditions

boutton.addEventListener('click', ()=>{ //ajout d'un ecouteur quand le boutton est cliqué
	sessionStorage.clear()    // efface la sessionStorage       
	div.innerHTML = ""         // efface le html     
	clearInterval(addLeaf) // arrete l'intervale'addLeaf'
	counter = 0
	storageLeaf = []
	addLeaves()
} ) 

valider.addEventListener("click", () => {
	weatherImg.innerHTML = ""
	assignConditions(input.value)
	input.value = ""
})

async function weather(location) {
	const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&key=RWQ5ZQX23WTSV4DU6GZ2BCA25&elements=conditions&contentType=json`)
	const forecast = await response.json()
	return (forecast.currentConditions.conditions)
}

async function assignConditions(location)
{
	conditions = await weather(location)
	const imgcondition = document.createElement('img')
	imgcondition.style.marginLeft = "75%"
	imgcondition.style.height = "200px"
	if (conditions.includes("Clear"))
	{
		console.log('clear');
		imgcondition.setAttribute('src', 'Sun.png')
	}
	else if (conditions.includes("Snow"))
	{
		console.log('snow');
		imgcondition.setAttribute('src', 'Snow.png')
	}
	else if (conditions.includes("Rain"))
	{
		console.log('rain');
		imgcondition.setAttribute('src', 'Rain.png')
	}
	else if (conditions.includes("Overcast"))
	{
		console.log('overcast');
		imgcondition.setAttribute('src', 'Overcast.png')
	}
	else if (conditions.includes("Cloudy"))
	{
		console.log('cloudy');
		imgcondition.setAttribute('src', 'Cloudy.png')
	}
	weatherImg.appendChild(imgcondition)
}

function startTimer () {        // recupere la date actuelle et l'affiche ds le html
	timer = setInterval(()=>{  
	date = new Date()
	let time = date.getHours() + ":" + (date.getMinutes() < 10 ? '0' : '') + date.getMinutes() + ":" +(date.getSeconds() < 10 ? '0' : '') + date.getSeconds();                                                
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
	img.style.left = x + '%'
	img.style.top = y + '%'
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
		if (counter == MAXCOUNTER){
			clearInterval(addLeaf)
			console.log(storageLeaf)
			deadLeaves()
		}
	
	}, 1000)
}

function deadLeaves()
{
	let imgs = document.querySelectorAll('.feuille img');
	let i = (imgs.length > MAXCOUNTER ? (imgs.length - counter) : 0)
	deadLeaf = setInterval(() => {
		imgs[i].style.top = 90 + "%"
		imgs[i].style.filter = "grayscale(0.8)"
		imgs[i].style.transform = "rotate(90deg)"
		i++
		if (i >= imgs.length)
		{
			clearInterval(deadLeaf)
			counter = 0
		}
	}, 1000)
	
}

if (sessionStorage.getItem("key")) {
	storageLeaf = JSON.parse(sessionStorage.getItem("key"))
	console.log(storageLeaf)
	for(i = 0; i < storageLeaf.length; i++){
		addOneLeaf(storageLeaf[i].x,storageLeaf[i].y)
		counter++;
	} 
	if(counter<MAXCOUNTER)
	{
		addLeaves()
	}
	if (storageLeaf.length >= MAXCOUNTER)
	{
		deadLeaves()
	}
}
else {
	addLeaves()
}

startTimer()
assignConditions("Lyon")