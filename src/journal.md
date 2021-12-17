---
title: 'Karla Walker | Journal'
layout: 'base.njk'
---

## Journal

<ul>
{% for post in collections.blogPosts %}
<li><a href="{{ post.url }}"><span>{{ post.date | date: "%b %d, %Y" }}</span> {{ post.data.title }}</a></li>
{% endfor %}
</ul>
