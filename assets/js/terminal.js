/* Terminal effects for idriss.riouak.com */

document.addEventListener('DOMContentLoaded', function () {

  /* ---- Auto-calculate durations for tree-date elements ---- */
  document.querySelectorAll('.tree-date[data-start]').forEach(function (el) {
    var start = new Date(el.getAttribute('data-start'));
    var endAttr = el.getAttribute('data-end');
    var end = endAttr ? new Date(endAttr) : new Date();

    var totalMonths = (end.getFullYear() - start.getFullYear()) * 12
                    + (end.getMonth() - start.getMonth());
    var years = Math.floor(totalMonths / 12);
    var months = totalMonths % 12;

    var duration = '';
    if (years > 0 && months > 0) {
      duration = years + 'y ' + months + 'mo';
    } else if (years > 0) {
      duration = years + 'y';
    } else {
      duration = months + 'mo';
    }

    var badge = document.createElement('span');
    badge.className = 'tree-duration';
    badge.textContent = duration;
    el.parentNode.insertBefore(badge, el.nextSibling);
  });

  /* ---- Typing animation for command prompts ---- */
  var typedElements = new Set();
  
  function typeText(el) {
    if (typedElements.has(el)) return;
    typedElements.add(el);
    
    var text = el.getAttribute('data-text');
    if (!text) return;
    var speed = 45;
    el.textContent = '';
    el.classList.add('typing-active');
    var i = 0;
    
    function type() {
      if (i < text.length) {
        el.textContent += text.charAt(i);
        i++;
        setTimeout(type, speed + Math.random() * 30);
      } else {
        el.classList.remove('typing-active');
        el.classList.add('typing-done');
      }
    }
    type();
  }

  var cmdObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        typeText(entry.target);
        cmdObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.cmd').forEach(function (el) {
    el.setAttribute('data-text', el.textContent);
    el.textContent = '';
    cmdObserver.observe(el);
  });

  /* ---- File listing expand/collapse ---- */
  document.querySelectorAll('.file-entry[data-target]').forEach(function (entry) {
    entry.addEventListener('click', function () {
      var targetId = this.getAttribute('data-target');
      var content = document.getElementById(targetId);
      if (content) {
        var isOpen = content.classList.contains('show');
        document.querySelectorAll('.file-content.show').forEach(function (el) {
          el.classList.remove('show');
        });
        document.querySelectorAll('.file-entry.expanded').forEach(function (el) {
          el.classList.remove('expanded');
        });
        if (!isOpen) {
          content.classList.add('show');
          this.classList.add('expanded');
        }
      }
    });
  });

  /* ---- Mobile nav: close on link click ---- */
  document.querySelectorAll('.nav-tab').forEach(function (tab) {
    tab.addEventListener('click', function () {
      var list = document.querySelector('.nav-tabs-list');
      if (list && list.classList.contains('open')) {
        list.classList.remove('open');
      }
    });
  });

  /* ---- Content tab switching ---- */
  var placesMapInitialized = false;
  document.querySelectorAll('.terminal-content-tab').forEach(function (tab) {
    tab.addEventListener('click', function () {
      var bar = tab.closest('.terminal-tab-bar');
      var terminal = tab.closest('.terminal');
      bar.querySelectorAll('.terminal-content-tab').forEach(function (t) { t.classList.remove('active'); t.setAttribute('aria-selected', 'false'); });
      terminal.querySelectorAll('.content-tab-panel').forEach(function (p) { p.classList.remove('active'); });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');
      var panel = terminal.querySelector('#tab-' + tab.getAttribute('data-tab'));
      if (panel) panel.classList.add('active');
      // Initialize map when personal tab is first shown
      if (tab.getAttribute('data-tab') === 'personal' && !placesMapInitialized) {
        placesMapInitialized = true;
        loadLeafletAndInitMap();
      }
      // Resize map when switching back to personal tab
      if (tab.getAttribute('data-tab') === 'personal' && window._placesMap) {
        setTimeout(function() { window._placesMap.invalidateSize(); }, 100);
      }
    });
  });

  /* ---- Lazy-load Leaflet, then init map ---- */
  function loadLeafletAndInitMap() {
    if (typeof L !== 'undefined') {
      setTimeout(initPlacesMap, 200);
      return;
    }
    var css = document.createElement('link');
    css.rel = 'stylesheet';
    css.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
    document.head.appendChild(css);

    var js = document.createElement('script');
    js.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
    js.onload = function () { setTimeout(initPlacesMap, 200); };
    document.head.appendChild(js);
  }

  /* ---- Places map (Leaflet + dark tiles) ---- */
  function initPlacesMap() {
    var mapEl = document.getElementById('places-map');
    if (!mapEl || typeof L === 'undefined') return;

    var map = L.map('places-map', {
      center: [50, 12],
      zoom: 4,
      zoomControl: false,
      attributionControl: false,
      scrollWheelZoom: false
    });

    window._placesMap = map;

    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      maxZoom: 19,
      subdomains: 'abcd'
    }).addTo(map);

    // Minimal zoom control bottom-right
    L.control.zoom({ position: 'bottomright' }).addTo(map);

    var places = [
      { lat: 44.72, lon: 10.08, label: 'Noceto', age: '0–2', color: '#39d353' },
      { lat: 44.74, lon: 10.28, label: 'Panocchia', age: '2–12', color: '#39d353' },
      { lat: 44.93, lon: 10.37, label: 'Colorno', age: '12–22', color: '#39d353' },
      { lat: 46.06, lon: 13.24, label: 'Udine', age: '22–24', color: '#39d353' },
      { lat: 55.70, lon: 13.19, label: 'Lund', age: '24–25', color: '#58a6ff' },
      { lat: 55.61, lon: 13.00, label: 'Malmö', age: '25–29', color: '#58a6ff' },
      { lat: 55.73, lon: 9.11,  label: 'Billund', age: '29–31', color: '#f85149' },
      { lat: 55.71, lon: 9.54,  label: 'Vejle', age: '31–now', color: '#f85149' }
    ];

    // Draw path connecting all places
    var pathCoords = places.map(function(p) { return [p.lat, p.lon]; });
    L.polyline(pathCoords, {
      color: '#39d353',
      weight: 1.5,
      opacity: 0.4,
      dashArray: '6,8'
    }).addTo(map);

    // Add markers
    places.forEach(function (p) {
      var icon = L.divIcon({
        className: 'map-marker-terminal',
        html: '<div style="background:' + p.color + '; width:10px; height:10px; border-radius:50%; border:2px solid ' + p.color + '; box-shadow:0 0 8px ' + p.color + ';"></div>',
        iconSize: [14, 14],
        iconAnchor: [7, 7]
      });

      L.marker([p.lat, p.lon], { icon: icon })
        .bindTooltip(
          '<span style="font-family:JetBrains Mono,monospace; font-size:12px; color:#c9d1d9;">' +
          '<strong>' + p.label + '</strong>' +
          '<br><span style="color:#8b949e;">ages ' + p.age + '</span></span>',
          { direction: 'top', offset: [0, -8], className: 'terminal-tooltip' }
        )
        .addTo(map);
    });

    // Fit bounds to show all markers with padding
    var group = L.featureGroup(places.map(function(p) { return L.marker([p.lat, p.lon]); }));
    map.fitBounds(group.getBounds().pad(0.15));

    // Force tile reload after container becomes visible
    setTimeout(function() {
      map.invalidateSize();
      map.fitBounds(group.getBounds().pad(0.15));
    }, 300);
  }

  /* ---- Staggered fade-in on scroll (IntersectionObserver) ---- */
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.terminal').forEach(function (el) {
      observer.observe(el);
    });
  }

  /* ---- Lightbox gallery ---- */
  (function () {
    var overlay = document.getElementById('lightbox');
    var imgEl = document.getElementById('lightbox-img');
    var counterEl = document.getElementById('lightbox-counter');
    if (!overlay || !imgEl) return;

    var currentImages = [];
    var currentIndex = 0;

    function show(idx) {
      currentIndex = idx;
      imgEl.src = currentImages[idx];
      counterEl.textContent = (idx + 1) + ' / ' + currentImages.length;
    }

    function open(galleryEl, clickedImg) {
      // Collect all images from same gallery
      currentImages = [];
      var imgs = galleryEl.querySelectorAll('img');
      imgs.forEach(function (img, i) {
        currentImages.push(img.src);
        if (img === clickedImg) currentIndex = i;
      });
      show(currentIndex);
      overlay.classList.add('open');
      document.body.style.overflow = 'hidden';
    }

    function close() {
      overlay.classList.remove('open');
      document.body.style.overflow = '';
      imgEl.src = '';
    }

    // Click on gallery links
    document.querySelectorAll('.image-gallery a').forEach(function (a) {
      a.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var img = a.querySelector('img');
        if (!img) return;
        var gallery = a.closest('.image-gallery');
        open(gallery, img);
      });
    });

    // Controls
    document.getElementById('lightbox-close').addEventListener('click', close);
    document.getElementById('lightbox-prev').addEventListener('click', function () {
      show((currentIndex - 1 + currentImages.length) % currentImages.length);
    });
    document.getElementById('lightbox-next').addEventListener('click', function () {
      show((currentIndex + 1) % currentImages.length);
    });

    // Close on overlay background click
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) close();
    });

    // Keyboard navigation
    document.addEventListener('keydown', function (e) {
      if (!overlay.classList.contains('open')) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') show((currentIndex - 1 + currentImages.length) % currentImages.length);
      if (e.key === 'ArrowRight') show((currentIndex + 1) % currentImages.length);
    });
  })();
});
