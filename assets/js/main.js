/* LAVAUX Academy — navigation, animations, formulaires */
(function () {
  document.documentElement.classList.remove('no-js');
  var page = document.body.getAttribute('data-page') || '';
  var CFG = window.LAVAUX_CONFIG || { forms: {} };

  /* ---------- En-tête et pied de page communs ---------- */
  var links = [
    ['index.html', 'Accueil', 'home'],
    ['programmes.html', 'Cours & niveaux', 'programmes'],
    ['tarifs.html', 'Tarifs & packs', 'tarifs'],
    ['femmes.html', 'Elles', 'femmes'],
    ['academie.html', 'L’académie', 'academie'],
    ['investir.html', 'Investir', 'investir']
  ];
  var nav = links.map(function (l) {
    return '<li><a href="' + l[0] + '"' + (page === l[2] ? ' aria-current="page"' : '') + '>' + l[1] + '</a></li>';
  }).join('');

  var header = document.getElementById('site-header');
  if (header) {
    header.className = 'site-header';
    header.innerHTML =
      '<div class="container nav">' +
        '<a class="brand" href="index.html" aria-label="LAVAUX Academy — accueil">' +
          '<img src="assets/img/logo-lavaux-ivory.svg" alt="LAVAUX Academy" width="119" height="44">' +
        '</a>' +
        '<button class="nav-toggle" aria-label="Ouvrir le menu" aria-expanded="false"><span></span><span></span><span></span></button>' +
        '<ul class="nav-links">' + nav +
          '<li class="nav-cta"><a class="btn btn-pink btn-sm" href="inscription.html">Je me pré-inscris</a></li>' +
        '</ul>' +
      '</div>';
    var toggle = header.querySelector('.nav-toggle');
    toggle.addEventListener('click', function () {
      var open = document.body.classList.toggle('nav-open');
      toggle.setAttribute('aria-expanded', open);
    });
  }

  var footer = document.getElementById('site-footer');
  if (footer) {
    footer.className = 'site-footer';
    footer.innerHTML =
      '<div class="container">' +
        '<div class="foot-grid">' +
          '<div>' +
            '<a class="brand" href="index.html" aria-label="LAVAUX Academy — accueil"><img src="assets/img/logo-lavaux-ivory.svg" alt="LAVAUX Academy" width="152" height="56"></a>' +
            '<p class="motto">Le respect nous unit.<br><em>La discipline nous fait grandir.</em></p>' +
            '<p>Muay Thaï &amp; arts martiaux<br>Cully, Lavaux (VD)</p>' +
          '</div>' +
          '<div><h4>S’entraîner</h4><ul>' +
            '<li><a href="programmes.html#enfants">Enfants &amp; ados</a></li>' +
            '<li><a href="programmes.html#adultes">Adultes</a></li>' +
            '<li><a href="femmes.html">Programme Elles</a></li>' +
            '<li><a href="tarifs.html">Tarifs &amp; packs famille</a></li>' +
          '</ul></div>' +
          '<div><h4>Le projet</h4><ul>' +
            '<li><a href="academie.html">L’académie &amp; le lieu</a></li>' +
            '<li><a href="academie.html#equipe">L’équipe</a></li>' +
            '<li><a href="investir.html">Investir</a></li>' +
            '<li><a href="confidentialite.html">Confidentialité</a></li>' +
          '</ul></div>' +
          '<div><h4>Contact</h4><ul>' +
            '<li><a href="mailto:' + CFG.contactEmail + '">' + CFG.contactEmail + '</a></li>' +
            '<li><a href="inscription.html">Questionnaire &amp; pré-inscription</a></li>' +
            '<li>Cully, Lavaux — adresse communiquée à l’ouverture</li>' +
          '</ul></div>' +
        '</div>' +
        '<div class="foot-bottom">' +
          '<span>© ' + new Date().getFullYear() + ' LAVAUX Academy — projet en étude de faisabilité. Tarifs et horaires indicatifs.</span>' +
          '<span>Photos : Unsplash (visuels d’inspiration, pas le lieu réel)</span>' +
        '</div>' +
      '</div>';
  }

  /* ---------- Apparition au défilement ---------- */
  var els = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    els.forEach(function (el) { io.observe(el); });
  } else { els.forEach(function (el) { el.classList.add('in'); }); }

  /* ---------- Onglets ---------- */
  document.querySelectorAll('[data-tabs]').forEach(function (wrap) {
    var btns = wrap.querySelectorAll('[role=tab]');
    btns.forEach(function (b) {
      b.addEventListener('click', function () {
        btns.forEach(function (x) {
          x.setAttribute('aria-selected', x === b);
          var p = document.getElementById(x.getAttribute('aria-controls'));
          if (p) p.hidden = x !== b;
        });
      });
    });
  });

  /* ---------- Curseur de montant ---------- */
  document.querySelectorAll('input[type=range][data-out]').forEach(function (r) {
    var out = document.getElementById(r.getAttribute('data-out'));
    var fmt = function () { out.textContent = Number(r.value).toLocaleString('fr-CH').replace(/ | /g, '’'); };
    r.addEventListener('input', fmt); fmt();
  });

  /* ---------- Formulaires multi-étapes ---------- */
  var params = new URLSearchParams(location.search);

  document.querySelectorAll('form[data-form]').forEach(function (form) {
    var steps = Array.prototype.slice.call(form.querySelectorAll('.fstep'));
    var bars = form.querySelectorAll('.form-progress i');
    var msg = form.querySelector('.form-msg');
    var cur = 0;

    // Préremplissage depuis l'URL (?interet=oui, ?pack=duo...)
    params.forEach(function (v, k) {
      form.querySelectorAll('[name="' + k + '"]').forEach(function (inp) {
        if ((inp.type === 'radio' || inp.type === 'checkbox') && inp.value === v) inp.checked = true;
        else if (inp.tagName === 'SELECT' || inp.type === 'text' || inp.type === 'hidden') inp.value = v;
      });
    });

    function branch() {
      var sel = form.querySelector('[data-branch-source]:checked');
      var val = sel ? sel.getAttribute('data-branch') : 'yes';
      form.querySelectorAll('[data-show-if]').forEach(function (blk) {
        var on = blk.getAttribute('data-show-if').split(' ').indexOf(val) > -1;
        blk.hidden = !on;
        blk.querySelectorAll('[data-req]').forEach(function (i) { i.required = on; });
      });
    }
    form.querySelectorAll('[data-branch-source]').forEach(function (r) { r.addEventListener('change', branch); });
    branch();

    function show(i) {
      steps.forEach(function (s, k) { s.hidden = k !== i; });
      bars.forEach(function (b, k) { b.classList.toggle('on', k <= i); });
      cur = i;
      var last = i === steps.length - 1;
      form.querySelectorAll('[data-next]').forEach(function (b) { b.hidden = last; });
      form.querySelectorAll('[type=submit]').forEach(function (b) { b.hidden = !last; });
      form.querySelectorAll('[data-prev]').forEach(function (b) { b.style.visibility = i === 0 ? 'hidden' : 'visible'; });
      if (msg) { msg.className = 'form-msg'; msg.textContent = ''; }
      var top = form.getBoundingClientRect().top + window.scrollY - 100;
      if (window.scrollY > top) window.scrollTo({ top: top, behavior: 'smooth' });
    }

    function valid(step) {
      var ok = true, first = null;
      step.querySelectorAll('input,select,textarea').forEach(function (i) {
        if (i.closest('[hidden]')) return;
        if (!i.checkValidity()) { ok = false; first = first || i; }
      });
      // groupes de cases à cocher obligatoires
      step.querySelectorAll('[data-need-one]').forEach(function (g) {
        if (g.closest('[hidden]')) return;
        if (!g.querySelector('input:checked')) { ok = false; first = first || g.querySelector('input'); }
      });
      if (!ok && msg) {
        msg.className = 'form-msg err';
        msg.textContent = 'Merci de compléter les champs obligatoires de cette étape.';
        if (first && first.focus) first.focus({ preventScroll: false });
      }
      return ok;
    }

    form.addEventListener('click', function (e) {
      var t = e.target.closest('[data-next],[data-prev]');
      if (!t) return;
      e.preventDefault();
      if (t.hasAttribute('data-next')) { if (valid(steps[cur])) show(Math.min(cur + 1, steps.length - 1)); }
      else show(Math.max(cur - 1, 0));
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!valid(steps[cur])) return;
      if (cur < steps.length - 1) { show(cur + 1); return; } // touche Entrée avant la dernière étape
      var data = {};
      Array.prototype.forEach.call(form.elements, function (el) {
        var k = el.name, v = el.value;
        if (!k || el.disabled || el.closest('[data-show-if][hidden]')) return; // champs de l'autre branche
        if ((el.type === 'checkbox' || el.type === 'radio') && !el.checked) return;
        if (v === '') return;
        if (data[k]) data[k] = [].concat(data[k], v); else data[k] = v;
      });
      Object.keys(data).forEach(function (k) { if (Array.isArray(data[k])) data[k] = data[k].join(', '); });
      data._source = location.pathname.split('/').pop() || 'index.html';
      data._date = new Date().toISOString();

      var kind = form.getAttribute('data-form');
      var endpoint = (CFG.forms || {})[kind];
      var btn = form.querySelector('[type=submit]');
      if (btn) { btn.disabled = true; btn.dataset.label = btn.innerHTML; btn.innerHTML = 'Envoi…'; }

      function done() {
        form.querySelectorAll('.fstep,.form-progress,.form-nav').forEach(function (x) { x.hidden = true; });
        var d = form.querySelector('.form-done');
        var yes = form.querySelector('[data-branch-source]:checked');
        var alt = yes && yes.getAttribute('data-branch') === 'no' ? form.querySelector('.form-done-no') : null;
        (alt || d).hidden = false;
        form.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }

      if (endpoint) {
        fetch(endpoint, { method: 'POST', headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
          .then(function (r) { if (!r.ok) throw new Error(r.status); done(); })
          .catch(function () {
            if (btn) { btn.disabled = false; btn.innerHTML = btn.dataset.label; }
            msg.className = 'form-msg err';
            msg.innerHTML = 'L’envoi n’a pas abouti. Réessayez, ou écrivez-nous à <a href="mailto:' + CFG.contactEmail + '">' + CFG.contactEmail + '</a>.';
          });
      } else {
        // Repli sans service de formulaire : e-mail prérempli
        var to = kind === 'investisseur' ? CFG.investorEmail : CFG.contactEmail;
        var subject = kind === 'investisseur' ? 'Intérêt investisseur — LAVAUX Academy' : 'Questionnaire / pré-inscription — LAVAUX Academy';
        var body = Object.keys(data).filter(function (k) { return k.charAt(0) !== '_'; })
          .map(function (k) { return k.replace(/_/g, ' ') + ' : ' + data[k]; }).join('\n');
        location.href = 'mailto:' + to + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
        done();
      }
    });

    show(0);
  });
})();
