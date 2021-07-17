var opened = 0

function rotatePlus()
{
	var element = document.getElementById("plus");
	if (opened == 0)
	{
		element.style.transform = 'rotate(-45deg)';
		opened = 1;
	}
	else
	{
		element.style.transform = 'rotate(0deg)';
		opened = 0;
	}

}
