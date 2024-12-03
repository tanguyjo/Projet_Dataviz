const div = document.querySelector('.feuille'); 
const h1 = document.querySelector('h1')
const button = document.getElementById('boutton')
const weatherImg = document.querySelector('.forecast');
const validate = document.querySelector('#valider');
const input = document.querySelector('input')
const city = document.querySelector('#city');

const XMAX = 65
const XMIN = 30
const YMAX = 60
const YMIN = 5
const MAXCOUNTER = 60

let leafColor;
let addLeaf;
let deadLeaf;
let timer;  
let date = new Date();
let randomx = 0;
let randomy = 0;
let storageLeaf = [];
let counter = 0;
let conditions;
let addTimerCity;
let imgcondition;

button.addEventListener('click', ()=>{ //ajout d'un ecouteur quand le boutton est cliqué
	clearAnimation()
	addLeaves()
	assignConditions("Lyon")
} )

validate.addEventListener("click", () => { // Ajout d'un ecouteur quand le bouton valider est clique
	clearAnimation()
	assignConditions(input.value)              // on recupere la ville donne  pour recuperer la conditions de la ville donne
	input.value = ""                            // vide la valeur de l'input
	addLeaves();
})

function clearAnimation()
{
	sessionStorage.clear()
	div.innerHTML = ""
	clearInterval(addLeaf)
	clearInterval(addTimerCity)
	counter = 0
	storageLeaf = []
	weatherImg.innerHTML = ""
}

async function weather(location) { // Fonction qui va recuperer les donnes de la meteo de la ville
	const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&key=RWQ5ZQX23WTSV4DU6GZ2BCA25&elements=conditions,temp,sunrise,sunset&contentType=json`)
	if (response.status == "400")  // condition que si la ville n'est pas trouver la fonction retourne False
	{
		return (false)
	}
	const forecast = await response.json()
	sessionStorage.setItem("forecasts",JSON.stringify(forecast))
	cityinfo(forecast)
	return (forecast.currentConditions.conditions)
}

function imgConditions(conditions)          //fonction qui affiche l'image correspondante a la meteo actuel
{
	 imgcondition = document.createElement('img')
	imgcondition.style.height = "200px"
	if (conditions.includes("Clear"))   // Si la condition contient le mot Clear ca va afficher un Soleil
	{
		console.log('clear');
		imgcondition.setAttribute('src', './Sun.gif')
		
	}
	else if (conditions.includes("Snow"))   // Si la condition contient le mot Snow ca va afficher  un bonhomme de neige
	{
		console.log('snow');
		imgcondition.setAttribute('src', './Snow.gif')
	}
	else if (conditions.includes("Rain"))  // Si la condition contient le mot Rain ca va afficher un Nuage et de la pluie
	{
		console.log('rain');
		imgcondition.setAttribute('src', './Rain.gif')
	}
	else if (conditions.includes("Overcast"))  // Si la condition contient le mot Overcast ca va afficher un Nuage gris
	{
		console.log('overcast');
		imgcondition.setAttribute('src', './Overcast.gif')
	}
	else if (conditions.includes("cloudy"))   // Si la condition contient le mot Cloudy ca va afficher un nuage
	{
		console.log('cloudy');
		imgcondition.setAttribute('src', './Cloudy.webp')
	}
	else                                         // Sinon on affiche un message qu'il y a pas de Forecast Disponible
	{
		weatherImg.innerHTML = "Forecast unavailable"
	}
	weatherImg.appendChild(imgcondition)
}

async function assignConditions(location)               //Fonction qui recupere nos donnees et les stock dans le session storage pour faciliter le rechargement de la page
{
	conditions = await weather(location)
	if (!conditions)   // Si on trouve pas de condition
	{
		weatherImg.innerHTML = `<h2>Forecast unavailable</h2>` // Affiche dans le html qu'il y a pas de Forecast Disponible
		sessionStorage.setItem('location', 'unavailable')   // et on met unavailable dans le sessionstorage
		sessionStorage.setItem('forecast', 'unavailable')
		return
	}
	imgConditions(conditions)                        
	sessionStorage.setItem('location', location)        // sinon on stock la Ville dans le sessionstorage
	sessionStorage.setItem('forecast', conditions)       // et aussi on stock la meteo de la ville dans le sessionstorage
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
	img.style.filter = leafColor
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
		storageLeaf.push({x : randomx, y : randomy}) // ajoute les coordonees x et y  dans le tableau storageLeaf pour chaque feuille
		sessionStorage.setItem("Leaves",JSON.stringify(storageLeaf)); // on envoie le tableau dans notre session storage
		addOneLeaf(randomx,randomy);                                  
		counter++;
		//console.log(counter)
		if (counter == MAXCOUNTER){                // Une fois on affiche toutes les feuilles on execute la fonction dead leaves
			clearInterval(addLeaf)
			console.log(storageLeaf)
			deadLeaves()
		}
	
	}, 1000)
}
//@TODO mettre des gouttes sur les feuilles
// function creerDesGouttes(){
// 	 const gouttes = document.createElement('div');
//     gouttes.classList.add(gte)
// }

function deadLeaves() // fonction qui fait descendre les feuilles
{
	let imgs = document.querySelectorAll('.feuille img');
	let i = 0;
	deadLeaf = setInterval(() => {
		imgs[i].style.top = 90 + "%"  // on fait descendre les feuilles au pieds de l'arbre
		//imgs[i].style.filter = "grayscale(0.8)" // on leur donne une couleur grise
		imgs[i].style.transform = "rotate(90deg)" // on fait coucher les feuilles
		i++;
		if (i >= imgs.length)  
		{
			clearInterval(deadLeaf)
			
		}

		

	}, 1000)
}

function changeLeafColor(color)
{
	let imgs = document.querySelectorAll('.feuille img');
	for (let i = 0; i < imgs.length; i++)
	{
		imgs[i].style.filter = color
	}
}


function cityinfo(forecast){
	let temp = forecast.currentConditions.temp;
	let emoji = '';

// Determine emoji based on temperature range
	if (temp <= 1) {
		emoji = '🥶';
		leafColor = "grayscale(0.9)"
		changeLeafColor(leafColor)
	} else if (temp <= 10) {
		emoji = '😬';
		leafColor = "grayscale(0.6)"
		changeLeafColor(leafColor)
	} else if (temp <= 20) {
		emoji = '😃';
		leafColor = "sepia(1) saturate(2)"
		changeLeafColor(leafColor)
	} else if (temp < 30) {
		emoji = '😍';
		leafColor = "sepia(1) saturate(5)"
		changeLeafColor(leafColor)
	} else if (temp >= 30) {
		emoji = '🤩';
		leafColor = "grayscale(0)"
	}
	addTimerCity = setInterval (()=> {

		let offset = parseInt(forecast.tzoffset.toString().split(".")[0])
		let GeneralHour = (date.getHours() -1);
		let seconds = date.getSeconds()
		let hour = GeneralHour + offset
		let minutesold;
		if(forecast.tzoffset.toString().split(".")[1]){
			minutesold = parseInt(forecast.tzoffset.toString().split(".")[1])
		}
		else {
			minutesold = 0
		}
		let minutes = date.getMinutes() + (minutesold > 10 ? minutesold * 0.6 : minutesold * 6 )
		if(minutes>59){
			minutes -= 60;
			hour++;}
		if(hour>23){
			hour -= 24;}
		if(hour<0){
			hour += 24;}
		if(hour>=forecast.currentConditions.sunset.substr(0, 2))
		{
			if ((hour == forecast.currentConditions.sunset.substr(0, 2) && minutes > forecast.currentConditions.sunset.substr(3, 2)) || hour > forecast.currentConditions.sunset.substr(0, 2) || (hour == forecast.currentConditions.sunset.substr(0, 2) && minutes == forecast.currentConditions.sunset.substr(3, 2) && seconds > forecast.currentConditions.sunset.substr(6, 2)))
			{
				document.body.style.backgroundColor = 'grey';
				if(forecast.currentConditions.conditions.includes("Clear")){
					imgcondition.setAttribute('src', 'https://media.tenor.com/DTIl6DWhrZwAAAAj/moon-spacedoodles.gif')
				}

			}
			else
			{
				document.body.style.backgroundColor = 'skyblue';
			}
		}
		else if (hour<=forecast.currentConditions.sunrise.substr(0, 2))
		{
			if ((hour == forecast.currentConditions.sunrise.substr(0, 2) && minutes < forecast.currentConditions.sunrise.substr(3, 2)) || hour < forecast.currentConditions.sunrise.substr(0, 2) || (hour == forecast.currentConditions.sunrise.substr(0, 2) && minutes == forecast.currentConditions.sunrise.substr(3, 2) && seconds < forecast.currentConditions.sunrise.substr(6, 2)))
			{
				document.body.style.backgroundColor = 'grey';
				if(forecast.currentConditions.conditions.includes("Clear")){
					imgcondition.setAttribute('src', 'https://media.tenor.com/DTIl6DWhrZwAAAAj/moon-spacedoodles.gif')
				}
			}
			else
			{
				document.body.style.backgroundColor = 'skyblue';
			}
		}
		else{
			document.body.style.backgroundColor = 'skyblue';
		}
		city.innerHTML = `${forecast.address.toUpperCase()} : ` +  (hour < 10 ? '0' : '') + hour + ":" + (minutes < 10 ? '0' : '') + minutes + ":" +(date.getSeconds() < 10 ? '0' : '') + date.getSeconds()  + "<br>"+ 'Temperature : '+forecast.currentConditions.temp +" °C" + emoji +"<br>" + "Sunrise:"+forecast.currentConditions.sunrise + "🌞"  +"<br>" + "Sunset:"+forecast.currentConditions.sunset + "🌃";              // Affiche dans l'Html le nom de la Ville
	},1000)
}


function start()                 // Fonction start qui execute le code au lancement de la page, qui gere le timer, le sessionstorage
{
	if (sessionStorage.getItem('location'))                            // Si on a une Ville dans le session storage
		{
			if (sessionStorage.getItem('location') == 'unavailable')       // si la ville est 'unavailable' on dit qu'il y a pas de Forecast Disponible
			{
				weatherImg.innerHTML = `<h2>Forecast unavailable</h2>`
			}
			else {                                                         // sinon on affiche le nom de la ville dans l'html
				city.innerHTML = sessionStorage.getItem('location')
			}
		}
	else{                                                // SI on a pas de ville on met Lyon comme de bases
		assignConditions("Lyon")
	}
	if (sessionStorage.getItem('forecast'))                   // Si on  a un forecast dans le session storage
	{
		if (sessionStorage.getItem('forecast') != 'unavailable')   // SI on a un forecast dans le session storage qui est different de 'unavailable'
		{
			imgConditions(sessionStorage.getItem('forecast'))       // On affiche le forecast 
		}
	}

	if (sessionStorage.getItem("Leaves")) {                // Si on a des feuilles dans le session storage
		storageLeaf = JSON.parse(sessionStorage.getItem("Leaves")) // on recupere les donneés des feuilles et on let met dans une variable
		console.log(storageLeaf)
		for(i = 0; i < storageLeaf.length; i++){             // 
			addOneLeaf(storageLeaf[i].x,storageLeaf[i].y)   // on affiche les feuilles
			counter++;
		} 
		if(counter<MAXCOUNTER)  // Si on a moins de feuilles que le max, on rajoute des feuilles pour remplir l'arbre
		{
			addLeaves()
		}
		if (storageLeaf.length >= MAXCOUNTER)  // Si on a afficher toutes nos feuilles
		{
			deadLeaves()                          // on les fait tomber
		}	
	}
	else {// Sinon on ajoute des feuilles
		addLeaves()
	}
	startTimer()

	let cityinfos = JSON.parse(sessionStorage.getItem('forecasts'))
	console.log(cityinfos);
	if(cityinfos)
	{
		cityinfo(cityinfos)
	}
	
}

start()