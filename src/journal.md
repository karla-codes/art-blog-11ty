---
title: 'Karla Walker | Journal'
layout: 'base.njk'
---

## Journal

<ul>
{% for post in collections.blogPosts %}
<li><a href="{{ post.url }}">{{ post.data.title }}</a></li>
{% endfor %}
</ul>
