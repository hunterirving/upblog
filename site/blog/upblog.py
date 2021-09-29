import os

#eventually include push to github and push to AWS

#markdown_filename = input('Markdown file name: ')
markdown_filename = 'the_new_hunterirving_dot_com.md'
markdown_file = open('markdown/' + markdown_filename, 'r')
markdown_lines = markdown_file.readlines()

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
for i in range(4, len(markdown_lines)):
	if(markdown_lines[i].startswith('<img ')):
		blog_guts += '\t\t\t\t' + markdown_lines[i]
	elif(markdown_lines[i].startswith('#')):
		blog_guts += '\t\t\t\t' + '<h2 class="blog_subheading">' + markdown_lines[i][1:-1] + '</h2>\n'
	else:
		if(markdown_lines[i] != '\n'):
			blog_guts += '\t\t\t\t<p>\n'
			while(markdown_lines[i] != '\n'):
				blog_guts += '\t\t\t\t\t' + markdown_lines[i]
				i += 1
			blog_guts += '\t\t\t\t' + '</p>\n'
			i += 1

#insert guts, date, and title into template
print('Injecting generated html into template...')
html_buffer = '''<!DOCTYPE html>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1" />
<html lang="en">
	<head>
		<!-- set page title !-->
		<title>''' + blog_title[:-1] + '''</title>
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
	<body onload="populate_nav_links();">
		<div id="page_container" class="centered noselect">
			<div id="breadcrumb_container">
				<h2 id="breadcrumbs"><a class="nodecor" href="../../">hi</a> / <a class="nodecor" href="../">blog</a> / ''' + blog_date[:-1] + '''</h2>
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
print('Writing html to \'' + directory_name + '/index.html\'...')
with open(directory_name + '/index.html', 'w') as outfile:
    outfile.write(html_buffer)

quit()

#serach for string <a href="./the_new_hunterirving_dot_com">
with open('index.html', 'r') as blog_homepage:
	if ('<a href="./' + directory_name + '">') in blog_homepage:
		print('Link to \'../blog/' + directory_name + '\' already exists in blog/index.html.')
		#if need to update title..? or desc, or date, do that and notify terminal
	else:
		print('Adding link to \'../blog/' + directory_name + '\' to blog/index.html...')
		for line in blog_homepage:
		    if '<div id="blog_feed">' in line:
		        line = line.replace(line,line + '')
		    print(line, end='')


quit()

#detect if link to post already exists?


#create and add (or update) link in /blog's index.html
