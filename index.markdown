---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults

layout: default
title: zeusdata
---
<html lang='en'>
<head>
</head>
<body>
<article>
<!-- 
  {% for tag in post.tags %}
    <span class="tag">{{ tag }}</span>
  {% endfor %}
-->

<ul class='index-posts'>
  {% for post in site.posts %}
    <li>
      <a href="{{ post.url }}" class='post-title'>{{ post.title }}</a>
  
  <span class="post-date">
        {{ post.date | date: "%Y-%m-%d" }}
      </span>
    </li>
  {% endfor %}
</ul>
</article>
</body>
</html>
