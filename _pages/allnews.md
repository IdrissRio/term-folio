---
title: "News"
layout: gridlay
description: "All news and updates."
sitemap: true
permalink: /allnews.html
---

<div class="section-prompt">
<span class="dollar">$</span> <span class="cmd">journalctl --user you</span>
</div>

<div class="stagger-children">
{% for article in site.data.news %}
<div class="news-item" style="margin-bottom: 1.5rem; padding-left: 1rem; border-left: 2px solid var(--border);">
<span style="color: var(--amber); font-size: 0.85rem;">{{ article.date }}</span>
<p style="margin: 0.25rem 0 0;">{{ article.headline }}</p>
{% if article.images %}
<div class="image-gallery" style="display: flex; gap: 0.5rem; margin-top: 0.5rem; flex-wrap: wrap;">
{% for image in article.images %}
<a href="#" data-full="{{ site.url }}{{ site.baseurl }}/images/{{ image }}">
<img src="{{ site.url }}{{ site.baseurl }}/images/{{ image }}" alt="Photo" style="height: 80px; border-radius: 4px; border: 1px solid var(--border); cursor: pointer;">
</a>
{% endfor %}
</div>
{% endif %}
</div>
{% endfor %}
</div>
