var opened = 0

function toggleNavLinks()
{
	const isHidden = nav_links.classList.contains('hidden');

	if (!isHidden)
	{
		plus.style.transform = 'rotate(0deg)';
		nav_links.style.opacity = "0%";
		nav_links.style.height = "0px";
		nav_links.classList.add('hidden');
	}
	else
	{
		plus.style.transform = 'rotate(-45deg)';
		nav_links.style.opacity = "100%";
		nav_links.style.height = "50px";
		nav_links.classList.remove('hidden');
	}
}
