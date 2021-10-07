function populate_nav_links()
{
	fetch('../index.html' + '?v=' + Date.now())
			.then(response => {
					return response.text()
			})
			.then(data => {
				var parser = new DOMParser();
				var doc = parser.parseFromString(data, 'text/html');

				var li_elements = doc.querySelectorAll('li');
				for(i=0; i < li_elements.length - 1; i++) {
					nav_links.innerHTML += li_elements[i].innerHTML + ", ";
				}
				nav_links.innerHTML += li_elements[li_elements.length - 1].innerHTML;

			});
}

function toggleNavLinks()
{
	const isHidden = nav_links.classList.contains('hidden');

	if (!isHidden)
	{
		plus.style.transform = 'rotate(0deg)';
		nav_links.style.opacity = "0%";
		nav_links.style.maxHeight = "0px";
		//nav_links.style.paddingBottom = "35px";
		nav_links.classList.add('hidden');
	}
	else
	{
		plus.style.transform = 'rotate(-45deg)';
		nav_links.style.opacity = "100%";
		nav_links.style.maxHeight = "50px";
		//nav_links.style.paddingBottom = "50px";
		nav_links.classList.remove('hidden');
	}
}
