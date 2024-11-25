const div = document.querySelector('.feuille');
const h1 = document.querySelector('h1')




 let timer;                                                                                                         
 let date = new Date()                                                          
function startTimer (){
                                                                  
   timer = setInterval(()=>{  
  date = new Date()
 let temps = date.getHours() + ":" +(date.getMinutes() < 10 ? '0' : '') + date.getMinutes() + ":" +(date.getSeconds() < 10 ? '0' : '') + date.getSeconds();      
 (date.getMinutes() < 10 ? '0' : '') + date.getMinutes()
 ;                                                     
	h1.innerHTML =temps;
   }, 1000);}                                                                             
 
let heur = date.getHours()
startTimer()

if(heur>16){

	 div.style.filter = "grayscale(0.8)"
}

   if(sessionStorage.getItem("key")){

	 let storagefeuille = JSON.parse(sessionStorage.getItem("key"))
	 console.log(storagefeuille)
	 

	
	
	 
   }
   else {
	
	addfeuilles()
   }


function adduneFeuille(x,y)
{
	// let x = 450;
	// let y = 300;
	const img = document.createElement('img')
	img.style.position = "absolute"
	img.style.left = x + 'px'
	img.style.top = y + 'px'
	img.setAttribute("src", "leaf1.png")
	img.style.height = "75px";
	div.appendChild(img)


}

let storagefeuille = [ ];
let compteur =0;
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
   
},100)}




 
var randomx = 0;
var randomy = 0;

function getRandomx() {
	
	randomx = Math.random() * (1075 - 400) + 400;
	return randomx
  }
  function getRandomy() {
	
	randomy = Math.random() * (450 - 0) + 0;
	return randomy
  }
 // x min = 400  et 1075
 // y min = 0  et max  450

console.log(randomx)