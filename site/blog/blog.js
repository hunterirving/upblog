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
