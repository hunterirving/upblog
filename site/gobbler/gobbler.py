import fileinput, datetime
from random import randint

gobble_body = input('Post to Gobbler: ').replace('<br>', '&nbsp<br>').replace('&nbsp<br>&nbsp<br>', '&nbsp<br><br>')

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
with open('index.html', 'r') as file:
    data = file.readlines()

#insert newGobble at top of prototype_container
for i in range(len(data)):
	if ('<div id="prototype_container">') in data[i]:
		data[i] = data[i] + newGobble

#write to file
with open('index.html', 'w') as file:
	file.writelines(data)
