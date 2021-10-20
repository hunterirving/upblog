import os, glob, readline #pip install pyreadline (on windows)

#eventually include push to github and push to AWS

#markdown_filename = input('Markdown file name: ')

def complete(text, state):
    return (glob.glob(text+'*')+[None])[state]
readline.set_completer_delims(' \t\n;')
readline.parse_and_bind("tab: complete")
readline.set_completer(complete)
os.chdir('markdown')
markdown_filename = input('Select markdown file: ')
with open(markdown_filename, 'r') as markdown_file:
	markdown_lines = markdown_file.readlines()
os.chdir('..')

blog_title = markdown_lines[0]
blog_brief = markdown_lines[1]
blog_date = markdown_lines[2]

#ensure directory exists
directory_name = markdown_filename.split('.')[0]
try:
	os.mkdir(directory_name)
	print('Created new directory \'blog/' + directory_name + '\'.')
except FileExistsError:
	print('Directory \'blog/' + directory_name + '\' already exists. Continuing...')

#construct 'blog_guts' from markdown file
blog_guts = ''
print('Converting contents of \'' + markdown_filename + '\' to html...')

i = 4
while i < len(markdown_lines):
	if(markdown_lines[i].startswith('<img ')):
		blog_guts += '\t\t\t\t' + markdown_lines[i]
		i += 1
	elif(markdown_lines[i].startswith('#')):
		blog_guts += '\t\t\t\t' + '<h2 class="blog_subheading">' + markdown_lines[i][1:-1] + '</h2>\n'
		i += 1
	else:
		if(markdown_lines[i] != '\n'):
			blog_guts += '\t\t\t\t<p>\n'
			while i < len(markdown_lines) and markdown_lines[i] != '\n':
				blog_guts += '\t\t\t\t\t' + markdown_lines[i]
				i += 1
			blog_guts += '\t\t\t\t' + '</p>\n'
		i += 1

#insert guts, date, and title into template
print('Injecting html into template...')
html_buffer = '''<!DOCTYPE html>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1" />
<html lang="en">
	<head>
		<!-- set page title !-->
		<title>The New hunterirving.com!</title>
		<!-- set favicons !-->
		<link rel="apple-touch-icon" sizes="180x180" href="../../resources/favicons/apple-touch-icon.png">
		<link rel="icon" type="image/png" sizes="32x32" href="../../resources/favicons/favicon-32x32.png">
		<link rel="icon" type="image/png" sizes="16x16" href="../../resources/favicons/favicon-16x16.png">
		<link rel="manifest" href="../../resources/favicons/site.webmanifest">
		<link rel="mask-icon" href="../../resources/favicons/safari-pinned-tab.svg" color="#000000">
		<meta name="msapplication-TileColor" content="#000000">
		<meta name="theme-color" content="#000000">
		<!-- import css !-->
		<link rel="stylesheet" type="text/css" href="../../resources/main.css">
		<link rel="stylesheet" type="text/css" href="../blog.css">
		<!-- import js !-->
		<script type="text/javascript" src="../blog.js"></script>
		<script type="text/javascript" src="../../resources/main.js"></script>

		<!-- support browsers that don't use js !-->
		<noscript>
			<style>
					#plus_box {display:none;}
			</style>
		</noscript>
	</head>
	<body>
		<div id="page_container" class="centered">
			<div id="breadcrumb_container">
				<h2 id="breadcrumbs"><a class="nodecor" href="../../">hi</a> / <a class="nodecor" href="../">blog</a> / Oct 16, '21</h2>
				<div id="plus_box" onClick="toggleNavLinks()">
					<div id="plus"></div>
				</div>
			</div>
			<nav>
				<h3 id="nav_links" class="hidden">
					<!-- populated onload !-->
				</h3>
			</nav>
			<h1 id="blog_heading">''' + blog_title[:-1] + '''</h1>
			<div id="blog_content">''' + '\n' + blog_guts + '''\t\t\t</div>
		</div>
	</body>
</html>'''

#write to file, overwriting if exists
print('Writing to \'' + directory_name + '/index.html\'...')
with open(directory_name + '/index.html', 'w') as blog_post_html_file:
	blog_post_html_file.write(html_buffer)

#build chunk
chunk = '\t\t\t\t<a class="nodecor" href="./' + directory_name + '''">
					<span class="blog_post">
						<span class="blog_details">
							<h3 class="blog_title">''' + blog_title[:-1] + '''</h3>
							<time>''' + blog_date[:-1] + '''</time>
						</span>
						<span class="blog_brief">
							''' + blog_brief[:-1]  + '''
						</span>
					</span>
				</a>'''

#read from file
with open('index.html', 'r') as file:
    data = file.readlines()

#search for existing chunk
for i in range(len(data)):
	if ('href="./' + directory_name + '">') in data[i]:
		print('Found existing reference to \'blog/' + directory_name + '\' in blog/index.html.')
		data[i] = chunk
		for j in range(i+1, i+11):
			data[j] = ''
		data[i+11] = '\n\n'
		#overwrite chunk
		print('Writing to \'blog/index.html\'...')
		with open('./index.html', 'w') as file:
		    file.writelines(data)
		print('Exiting (no errors).')
		quit()

#chunk wasn't found, so create it
for i in range(len(data)):
	if '<div id="blog_feed">' in data[i]:
		print('No reference to \'blog/' + directory_name + '\' found in blog/index.html.')
		data.insert(i+1, '\n' + chunk + '\n')
		#insert chunk
		print('Updating \'blog/index.html\'...')
		with open('index.html', 'w') as file:
			file.writelines(data)
		print('Exiting (no errors).')
		quit()
