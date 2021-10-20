function one_or_two(caller) {
	upperOrLower = Math.round(Math.random());
	if(upperOrLower == 1)
	{
		caller.innerHTML = '1';
	}
	else if(upperOrLower == 0)
	{
		caller.innerHTML = '2';
	}
}

window.onload = function setup() {
	setInterval(function() {one_or_two(document.getElementById("first_one"));}, 300);
	setInterval(function() {one_or_two(document.getElementById("second_one"));}, 300);
	countdown_date = new Date('October 16, 2036');
	setInterval(function() {populate_countdown();}, 1000);
	document.addEventListener('scroll', haiku_event);
	populate_nav_links();
}

function populate_countdown() {
	document.getElementById("countdown").innerHTML = '<h1>Next Retrospective in:</h1><h2>' + countdown(countdown_date).toString() + '</h2>';
}

function haiku_event() {
  if (isInViewport(document.getElementById('dead_frame'))) {
		document.removeEventListener('scroll', haiku_event);
		typeWriter();
	}
}

var txt = "404 ERR0R.S0METHING USED T0 BE HERE... RIGHT?C0ULD THIS BE... THE END?";
var j = 0;
var hangtime = 65;

function typeWriter()
{
	if (j < 10) {
		document.getElementById("haiku1").innerHTML += txt.charAt(j);
	}
	else if (j < 45) {
		document.getElementById("haiku2").innerHTML += txt.charAt(j);
	}
	else if (j < 70) {
		document.getElementById("haiku3").innerHTML += txt.charAt(j);
	}
	j = j + 1;
	if (j == 10 | j == 45) {
		setTimeout(typeWriter, hangtime * 25);
	}
	else if ((j > 0) & (txt.charAt(j - 1) == '.' | txt.charAt(j - 1) == '?')) {
		setTimeout(typeWriter, hangtime * 6);
	}
	else {
		setTimeout(typeWriter, hangtime);
	}
}

function isInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}
