---
title: "Karla Walker | Journal"
permalink: "best-journal-ever"
layout: "base.njk"
---

<h2>Journal</h2>

<ul class="blog-container">
{% for post in collections.blogPosts %}
<li><a href="{{ post.url }}"><span>{{ post.date | date: "%b %d, %Y" }}</span> {{ post.data.title }} <span> -{{ post.data.description }}</span></a></li>
{% endfor %}
</ul>
