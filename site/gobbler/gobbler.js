function flipGobble()
{
	var element = document.getElementById("gobbler_embed");
	if (element.style.transform === '')
	{
		element.style.transform = "rotate(0.5turn)";
	}
	else
	{
		//Get current rotation amount, add 0.5
		turnAmount = parseFloat(element.style.transform.slice(7).slice(0, -5)) + 0.5;
		element.style.transform = `rotate(${turnAmount}turn)`;
	}
}
