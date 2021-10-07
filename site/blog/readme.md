# upblog
upblog.py uses markdown files to construct html blog posts.<br>
for each new blog post, a directory is created and a link is added to index.html.<br>
existing posts can be updated by feeding upblog.py the same (modified) markdown file.<br>
markdown files are interpreted as such:<br>
filename: becomes the url extension (ex: example_blog_post.md -> hunterirving.com/blog/example_blog_post)<br>
line 1: blog title<br>
line 2: descriptive brief/teaser text<br>
line 3: date (set manually)<br>
line 4: blank
line 5 onward: interpreted and converted into html<br><br>
