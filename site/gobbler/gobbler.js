var z = 0; //holds current highest z-index
var pageLoadTime = Date.now();

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
		turnAmount = parseFloat(gobble.style.transform.slice(7).slice(0, -5)) + 0.5;
		gobble.style.transform = `rotate(${turnAmount}turn)`;
		return_to_top_icon.style.transform = `rotate(-${turnAmount}turn)`;
	}
	console.log(datetimeToPlaceholder('Tue, 14 Sep 2021 16:32:35 GMT'));
}

function addNoHover(event)
{
	green_hover = findAncestor(event.target, 'green_hover');
	green_hover.classList.add("no_hover");
}

function removeNoHover(event)
{
	green_hover = findAncestor(event.target, 'green_hover');
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

function sendMessage(event)
{
	var ancestor = findAncestor(event.target, 'gobble_inner');
	var gobble_text = ancestor.getElementsByClassName('gobble_inner_2')[0].innerText;
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

const gobbles = [
	{
		body: 'link: <a href="http://www.hunterirving.com">link</a>',
		datetime: 'Tue, 14 Sep 2021 16:32:35 GMT',
		comments: '2',
		regobbles: '3',
		likes: '4'
	},
	{
		body: 'absolutely gutted',
		datetime: 'Tue, 13 Sep 2021 16:32:35 GMT',
		comments: '2',
		regobbles: '4',
		likes: '42'
	},
	{
		body: 'what\'s good homies??',
		datetime: 'Tue, 15 Sep 2020 16:32:35 GMT',
		comments: '2',
		regobbles: '3',
		likes: '4'
	},
	{
		body: 'just setting up my gobbler',
		datetime: 'Tue, 14 Sep 2020 16:32:35 GMT',
		comments: '2',
		regobbles: '4',
		likes: '42'
	}
];

function appendGobbles() {
  const gobble_container = document.getElementById('gobble_container');
  const fragment = document.getElementById('gobble_template');

  // Loop over the gobbles and modify the given template
  gobbles.forEach(gobble => {
    // Create an instance of the template content
    const instance = document.importNode(fragment.content, true);
    // Add relevant content to the template
    instance.querySelector('.gobble_inner_2').innerHTML = gobble.body;
    instance.querySelector('.date').innerHTML = datetimeToPlaceholder(gobble.datetime);
		instance.querySelector('.comment_count').innerHTML = gobble.comments;
		instance.querySelector('.regobble_count').innerHTML = gobble.regobbles;
		instance.querySelector('.like_count').innerHTML = gobble.likes;

    // Append the instance to the DOM
    gobble_container.appendChild(instance);
  });
}

function datetimeToPlaceholder(dateString) {
	millisSincePost = pageLoadTime - Date.parse(dateString);
	if (millisSincePost > 31536000000){
		//more than one year ago
		return 'Ages ago';
	}
	else if (millisSincePost > 604800000){
		//more than one week ago
		return 'A while ago';
	}
	else if (millisSincePost > 86400000) {
		//more than one day ago
		return 'Recently';
	}
	else {
		//not more than one day ago
		return 'Today';
	}
}
