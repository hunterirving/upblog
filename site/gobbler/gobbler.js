function flipGobble()
{
	var element = document.getElementById("gobbler_embed");
	if (element.style.transform === '')
	{
		element.style.transform = "rotate(0.5turn)";
	}
	else
	{
		turnAmount = parseFloat(element.style.transform.slice(7).slice(0, -5)) + 0.5;
		element.style.transform = `rotate(${turnAmount}turn)`;
	}
}

function incrementValue(element_id)
{
    var value = parseInt(document.getElementById(element_id).innerHTML, 10);
    value = isNaN(value) ? 0 : value;
    value++;
    document.getElementById(element_id).innerHTML = value;
}
