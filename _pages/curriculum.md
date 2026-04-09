---
title: "Curriculum Vitae"
layout: gridlay
description: "Your CV — education, work experience, publications, awards, and technical skills."
permalink: /curriculum/
---

<div class="section-prompt">
  <span class="dollar">$</span> <span class="cmd">cat cv.json | jq .</span>
</div>

<p style="color: var(--text-secondary);">Full CV available as <a href="your-cv.pdf" target="_blank">PDF</a> — place your PDF in <code>curriculum/</code></p>

<!-- Education -->
<h2 style="color: var(--green); margin-top: 1.5rem;">education/</h2>

<div class="tree stagger-children">
{% for edu in site.data.cv.education %}
<div class="tree-item">
<span class="tree-branch">{% if forloop.last %}└──{% else %}├──{% endif %}</span>
<span class="tree-date">{{ edu.start }}–{{ edu.end }}</span>
<span class="tree-label"><strong style="color: var(--text-primary);">{{ edu.degree }}</strong>, {{ edu.institution }}{% if edu.grade %} <span class="tag tag-amber">{{ edu.grade }}</span>{% endif %}</span>
</div>
{% endfor %}
</div>

<!-- Software Projects -->
<h2 style="color: var(--green); margin-top: 2rem;">software-projects/</h2>

<div class="tree stagger-children">
{% for exp in site.data.cv.experience.compiler_related %}
<div class="tree-item">
<span class="tree-branch">{% if forloop.last %}└──{% else %}├──{% endif %}</span>
<span class="tree-date">{{ exp.start }}–{% if exp.end %}{{ exp.end }}{% else %}Present{% endif %}</span>
<span class="tree-label">{% if exp.link %}<a href="{{ exp.link }}" target="_blank"><strong style="color: var(--text-primary);">{{ exp.project }}</strong></a>{% else %}<strong style="color: var(--text-primary);">{{ exp.project }}</strong>{% endif %} — {{ exp.title }}{% if exp.description %}<br><span style="color: var(--text-muted); font-size: 0.9rem;">{{ exp.description }}</span>{% endif %}</span>
</div>
{% endfor %}
</div>

<!-- Certifications & Awards -->
<h2 style="color: var(--green); margin-top: 2rem;">awards/</h2>

<div class="tree stagger-children">
{% for award in site.data.cv.certifications_awards %}
<div class="tree-item">
<span class="tree-branch">{% if forloop.last %}└──{% else %}├──{% endif %}</span>
<span class="tree-date">{{ award.date }}</span>
<span class="tree-label"><strong style="color: var(--text-primary);">{{ award.title }}</strong>{% if award.award %} — {{ award.award }}{% endif %}{% if award.description %}<br><span style="color: var(--text-muted); font-size: 0.9rem;">{{ award.description }}</span>{% endif %}</span>
</div>
{% endfor %}
</div>

<!-- Work Experience -->
<h2 style="color: var(--green); margin-top: 2rem;">work-experience/</h2>

<div class="tree stagger-children">
{% for job in site.data.cv.work_experience %}
<div class="tree-item">
<span class="tree-branch">{% if forloop.last %}└──{% else %}├──{% endif %}</span>
<span class="tree-date">{{ job.start }}–{% if job.end %}{{ job.end }}{% else %}Present{% endif %}</span>
<span class="tree-label"><strong style="color: var(--text-primary);">{{ job.title }}</strong>, {{ job.company }}{% if job.description %}<br><span style="color: var(--text-muted); font-size: 0.9rem;">{{ job.description }}</span>{% endif %}</span>
</div>
{% endfor %}
</div>

<!-- Publications -->
<h2 style="color: var(--green); margin-top: 2rem;">publications/</h2>

<div class="tree stagger-children">
{% for pub in site.data.cv.publications %}
<div class="tree-item">
<span class="tree-branch">{% if forloop.last %}└──{% else %}├──{% endif %}</span>
<span class="tree-date">{{ pub.date }}</span>
<span class="tree-label"><strong style="color: var(--text-primary);">{{ pub.title }}</strong><br><span style="color: var(--text-muted); font-size: 0.9rem;">{{ pub.authors }}{% if pub.event %} — {{ pub.event }}{% endif %}{% if pub.status %} ({{ pub.status }}){% endif %}</span></span>
</div>
{% endfor %}
</div>

<!-- Languages -->
<h2 style="color: var(--green); margin-top: 2rem;">languages/</h2>

<div style="margin-bottom: 1.5rem;" markdown="0">
<div class="skill-bar"><span class="skill-name">🇺🇸 English</span><div class="skill-track"><div class="skill-fill" style="width: 100%;"></div></div><span class="skill-pct">Native</span></div>
<div class="skill-bar"><span class="skill-name">🇪🇸 Spanish</span><div class="skill-track"><div class="skill-fill" style="width: 70%;"></div></div><span class="skill-pct">B2</span></div>
</div>

<!-- Coding Skills -->
<h2 style="color: var(--green); margin-top: 2rem;">coding-skills/</h2>

<div markdown="0">
<div class="skill-bar"><span class="skill-name">Python</span><div class="skill-track"><div class="skill-fill" style="width: 100%;"></div></div><span class="skill-pct">daily</span></div>
<div class="skill-bar"><span class="skill-name">JavaScript</span><div class="skill-track"><div class="skill-fill" style="width: 80%;"></div></div><span class="skill-pct">80%</span></div>
<div class="skill-bar"><span class="skill-name">Go</span><div class="skill-track"><div class="skill-fill" style="width: 60%;"></div></div><span class="skill-pct">60%</span></div>
</div>
