import fileinput, datetime
from random import randint

#get input from commandline
gobble_body = input('Gobble: ')

#add &nbsp characters before <br> tags to ensure email subject lines include proper spacing
gobble_body = gobble_body.replace('<br>', '&nbsp<br>').replace('&nbsp<br>&nbsp<br>', '&nbsp<br><br>')

#wrap hashtags in <span class="hashtag"> tags
i = 0
while i < len(gobble_body):
	if gobble_body[i] == '#':
		gobble_body = gobble_body[:i] + '<span class="hashtag">' + gobble_body[i:]
		i += 22
		while i < len(gobble_body) and gobble_body[i] != ' ':
			i += 1
		gobble_body = gobble_body[:i] + '</span>' + gobble_body[i:]
	i += 1

newGobble = '''
				<div class="gobble_prototype">
					<hr>
					<div>
						@hunter
					</div>
					<div class="gobble_proto_body">
						''' + gobble_body + '''
					</div>
					<div class="gobble_proto_date">''' + datetime.datetime.now(datetime.timezone.utc).strftime("%a, %d %b %Y %H:%M:%S GMT") + '''
					</div>
					<div>
						<span class="comments">''' + str(randint(3,14)) + '''</span> comments,
						<span class="regobbles">''' + str(randint(3,13)) + '''</span> regobbles,
						<span class="likes">''' + str(randint(3,18)) + '''</span> likes
					</div>
				</div>
'''

#read from file
with open('index.html', 'r', encoding="utf") as file:
    data = file.readlines()

#insert newGobble into data[] after prototype_container div tag
for i in range(len(data)):
	if ('<div id="prototype_container">') in data[i]:
		data[i] = data[i] + newGobble

#write to file
with open('index.html', 'w', encoding="utf") as file:
	file.writelines(data)
