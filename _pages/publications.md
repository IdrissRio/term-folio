---
title: "Publications"
layout: gridlay
description: "Your academic publications."
sitemap: true
permalink: /publications
---

<div class="section-prompt">
<span class="dollar">$</span> <span class="cmd">ls -la ~/publications/</span>
</div>

<div style="color: var(--text-secondary); line-height: 1.6; max-width: 75ch; margin-bottom: 2rem;">

Your publications, powered by <a href="https://github.com/inukshuk/jekyll-scholar">jekyll-scholar</a>. Edit <code>assets/ref.bib</code> with your BibTeX entries.

</div>

<div class="section-prompt">
<span class="dollar">$</span> <span class="cmd">cat ~/publications/conferences.bib</span>
</div>

{% bibliography --query @inproceedings %}

<div class="section-prompt" style="margin-top:2rem">
<span class="dollar">$</span> <span class="cmd">cat ~/publications/journals.bib</span>
</div>

{% bibliography --query @article %}
