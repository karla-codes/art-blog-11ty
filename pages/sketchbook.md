---
title: "Karla Walker | Digital Sketchbook"
permalink: "/"
layout: "base.njk"
templateEngineOverride: njk, md
---

<h2>Sketchbook</h2>
<ul class="art-container">
{% for post in collections.artPosts %}
<li><a href="{{ post.url }}"><img src="{{ post.data.imgUrl }}" /></a></li>
{% endfor %}
</ul>
