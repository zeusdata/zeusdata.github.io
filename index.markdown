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
<h4>Articles</h4>
<ul >
  {% for post in site.posts %}
    <li class='post'>
      <a href="{{ post.url }}" class='post_title'>{{ post.title }}</a>

  <!-- 
    {% for tag in post.tags %}
      <span class="tag">{{ tag }}</span>
    {% endfor %}
-->
  <span class="date">
        {{ post.date | date: "%Y-%m-%d" }}
      </span>
    </li>
  {% endfor %}
</ul>
</article>
</body>
</html>
