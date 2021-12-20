---
title: 'Karla Walker | Journal'
layout: 'content.njk'
---

## Journal

<ul class="blog-container">
{% for post in collections.blogPosts %}
<li><a href="{{ post.url }}"><span>{{ post.date | date: "%b %d, %Y" }}</span> {{ post.data.title }}</a></li>
{% endfor %}
</ul>
