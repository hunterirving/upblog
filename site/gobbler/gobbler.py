import fileinput, datetime
from random import randint

gobble_body = input('Post to Gobbler: ')

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

for line in fileinput.FileInput("index.html",inplace=1):
    if '<div id="prototype_container">' in line:
        line=line.replace(line,line + newGobble)
    print(line, end='')
