const div = document.querySelector('.feuille');

function addFeuille()
{
	let x = 450;
	let y = 300;
	const img = document.createElement('img')
	img.style.position = "absolute"
	img.style.left = x + 'px'
	img.style.top = y + 'px'
	img.setAttribute("src", "feuille.jpg")
	img.style.height = "75px";
	div.appendChild(img)
}

addFeuille()