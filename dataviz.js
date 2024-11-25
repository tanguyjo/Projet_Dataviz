const div = document.querySelector('.feuille');

function addFeuille()
{
	const img = document.createElement('img')
	img.setAttribute("src", "feuille.jpg")
	img.style.height = "75px";
	div.appendChild(img)
}

addFeuille()