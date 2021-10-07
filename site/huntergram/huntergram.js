function incrementLikes()
{
    var value = parseInt(document.getElementById('like_count_value').innerHTML, 10);

		if (isNaN(value)) {
			value = 1;
		}
		else {
			value ++;
		}
    document.getElementById('like_count_value').innerHTML = value;
}
