var z = 0; //holds current highest z-index

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
		body: 'what\'s good homies??',
		datetime: '2021-08-24T15:34:10.654Z',
		comments: '2',
		regobbles: '3',
		likes: '4'
	},
	{
		body: 'just setting up my gobbler',
		datetime: '2021-08-23T15:34:10.654Z',
		comments: '2',
		regobbles: '4',
		likes: '42'
	},
	{
		body: 'absolutely gutted',
		datetime: '2021-08-23T15:34:10.654Z',
		comments: '2',
		regobbles: '4',
		likes: '42'
	},
	{
		body: 'i can\'t believe you\'ve done this',
		datetime: '2021-08-23T15:34:10.654Z',
		comments: '2',
		regobbles: '4',
		likes: '42'
	},
	{
		body: 'hello hullo hallo',
		datetime: '2021-08-23T15:34:10.654Z',
		comments: '2',
		regobbles: '4',
		likes: '42'
	},
	{
		body: 'yeah!',
		datetime: '2021-08-23T15:34:10.654Z',
		comments: '2',
		regobbles: '4',
		likes: '42'
	},
	{
		body: 'love that for you',
		datetime: '2021-08-23T15:34:10.654Z',
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
    instance.querySelector('.date').innerHTML = gobble.datetime;
		instance.querySelector('.comment_count').innerHTML = gobble.comments;
		instance.querySelector('.regobble_count').innerHTML = gobble.regobbles;
		instance.querySelector('.like_count').innerHTML = gobble.likes;

    // Append the instance ot the DOM
    gobble_container.appendChild(instance);
  });
}

function convertDatetime()
{

}
