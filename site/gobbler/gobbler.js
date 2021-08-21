var z = 0;

function flipGobble(event)
{
	var gobble = findAncestor(event.target, 'gobble');
	var return_to_top_icon = gobble.getElementsByClassName('return_to_top')[0]

	z ++;
	gobble.style.zIndex = z;

	if (gobble.style.transform === '')
	{
		gobble.style.transform = "rotate(0.5turn)";
		return_to_top_icon.style.transform = "rotate(-0.5turn)";
	}
	else
	{
		turnAmount = parseFloat(gobble.style.transform.slice(7).slice(0, -5)) + 0.5;
		gobble.style.transform = `rotate(${turnAmount}turn)`;
		return_to_top_icon.style.transform = `rotate(-${turnAmount}turn)`;
	}
}

function findAncestor (el, cls) {
    while ((el = el.parentElement) && !el.classList.contains(cls));
    return el;
}

function incrementValue(element_id)
{
    var value = parseInt(document.getElementById(element_id).innerHTML, 10);
    value = isNaN(value) ? 0 : value;
    value++;
    document.getElementById(element_id).innerHTML = value;
}
