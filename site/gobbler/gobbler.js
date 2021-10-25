var z = 0; //holds current highest z-index
var pageLoadTime = new Date();

window.addEventListener('DOMContentLoaded', (event) => {
	hidePrototypes();
	appendGobbles();
	showFollowButton();
});

function hidePrototypes()
{
	document.getElementById('prototype_container').style.display="none";
}

function showFollowButton()
{
	document.getElementById("follow_button").style.display = "block";
}

function flipGobble(event)
{
	var gobble = findAncestor(event.target, 'gobble');
	var return_to_top_icon = gobble.getElementsByClassName('return_to_top')[0];

	z ++;
	gobble.style.zIndex = z;

	if (gobble.style.transform === '')
	{
		gobble.style.transform = "rotate(0.5turn)";
		return_to_top_icon.style.transform = "rotate(-0.5turn)";
	}
	else
	{
		/* this is pretty hacky. if you can think of a better way to do this, please send me an e-mail. */
		var turnAmount = parseFloat(gobble.style.transform.slice(7).slice(0, -5)) + 0.5;
		gobble.style.transform = `rotate(${turnAmount}turn)`;
		return_to_top_icon.style.transform = `rotate(-${turnAmount}turn)`;
	}
}

function ellipses(event)
{
	var gobble_inner = findAncestor(event.target, 'gobble_inner');
	var gobble_inner_2 = gobble_inner.getElementsByClassName('gobble_inner_2')[0];
	for (i=0; i < gobble_inner_2.innerHTML.length; i++) {
		if (gobble_inner_2.innerHTML[i] != '.') {
			gobble_inner_2.innerHTML = '.';
			setTimeout(appendDot, 500, gobble_inner_2);
			setTimeout(appendDot, 1000, gobble_inner_2);
			return;
		}
	}
	appendDot(gobble_inner_2);
	setTimeout(appendDot, 500, gobble_inner_2);
	setTimeout(appendDot, 1000, gobble_inner_2);
}

function appendDot(object){
	object.innerHTML += '.';
}

function addNoHover(event)
{
	var green_hover = findAncestor(event.target, 'green_hover');
	green_hover.classList.add("no_hover");
}

function removeNoHover(event)
{
	var green_hover = findAncestor(event.target, 'green_hover');
	green_hover.classList.remove("no_hover");
}

function incrementActionCount(event)
{
	var action_area = findAncestor(event.target, 'action_area');
	var action_count = action_area.getElementsByClassName('action_count')[0];
	var value = parseInt(action_count.innerHTML, 10);
	value = isNaN(value) ? 0 : value;
	value++;
	action_count.innerHTML = value;
}

function findAncestor (el, cls)
{
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

function commentOnGobble(event)
{
	var ancestor = findAncestor(event.target, 'gobble_inner');
	var gobble_text = ancestor.getElementsByClassName('gobble_inner_2')[0].innerText;
	gobble_text = encodeURIComponent(gobble_text);
	var ml2 = rot("znv" + "yg" + "b:");
	var h = rot("uhagre");
	var s = rot("uha" + "gre" + "veivat");
	var ext = rot("p" + "bz");
	var at = rot("@");
	var su = rot("f" + "how" + "rpg");
	window.location.replace(ml2 + h + at + s + "." + ext + "?" + su + "=RE: \"" + gobble_text + "\"");
}

function rot(str) {
  var input     = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  var output    = 'NOPQRSTUVWXYZABCDEFGHIJKLMnopqrstuvwxyzabcdefghijklm';
  var index     = x => input.indexOf(x);
  var translate = x => index(x) > -1 ? output[index(x)] : x;
  return str.split('').map(translate).join('');
}

function appendGobbles() {
  const gobble_container = document.getElementById('gobble_container');
  const fragment = document.getElementById('gobble_template');

	//create an array of gobble_prototypes
	var prototypes = document.getElementById('prototype_container').getElementsByClassName('gobble_prototype');

	//loop over gobble_prototypes
	for(i=0; i < prototypes.length; i++) {
		//create an instance of the template
    const instance = document.importNode(fragment.content, true);
		//inject data from prototype
		instance.querySelector('.thick_text').innerHTML = 'hunter';
		instance.querySelector('.thin_text').innerHTML = '@hunter<span class="dot">·</span><span class="date"></span>';
		instance.querySelector('.gobble_inner_2').innerHTML = prototypes[i].querySelector('.gobble_proto_body').innerHTML;
		instance.querySelector('.date').innerHTML = datetimeToPlaceholder(prototypes[i].querySelector('.gobble_proto_date').innerHTML);
		instance.querySelector('.comment_count').innerHTML = prototypes[i].querySelector('.comments').innerHTML;
		instance.querySelector('.regobble_count').innerHTML = prototypes[i].querySelector('.regobbles').innerHTML;
		instance.querySelector('.like_count').innerHTML = prototypes[i].querySelector('.likes').innerHTML;
		//append the modified instance to the DOM
		gobble_container.appendChild(instance);
	}
}

function datetimeToPlaceholder(dateString) {
	var postTimeInLocalTime = new Date(dateString);
	var startOfTodayInLocalTime = postTimeInLocalTime.setHours(0,0,0,0);
	var difInMillis =  pageLoadTime - startOfTodayInLocalTime;

	/* today */
	if(difInMillis < 86400000) {
		return "Today";
	}
	/* yesterday */
	else if(difInMillis < 172800000) {
		return "Yesterday";
	}
	/* this week */
	else if(difInMillis < 604800000) {
		return "A Few Days Ago";
	}
	/* this year */
	else if(difInMillis < 31536000000) {
		return "A While Ago";
	}
	else return "Ages ago";
}
