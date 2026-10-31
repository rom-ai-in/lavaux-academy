/* LAVAUX Academy — calculateur de tarif famille.
   Tous les prix sont ici : les modifier ne demande aucune autre retouche. */
(function () {
  var TARIFS = {
    annuel:   { adulte: 119, adulte2: 79, enfant: 69, enfantSuiv: 49, mini: 49, plafond: 289, moisAdultes: 12, moisEnfants: 10, label: 'Annuel' },
    semestre: { adulte: 137, adulte2: 91, enfant: 79, enfantSuiv: 56, mini: 56, plafond: 329, moisAdultes: 6,  moisEnfants: 5,  label: 'Semestre' }
  };

  var root = document.getElementById('calc');
  if (!root) return;
  var state = { adultes: 2, enfants: 2, mini: 0, duree: 'annuel' };
  var max = { adultes: 2, enfants: 5, mini: 3 };

  function chf(n) { return 'CHF ' + Math.round(n).toLocaleString('fr-CH').replace(/ | /g, '’'); }

  function calc() {
    var t = TARIFS[state.duree], lignes = [], plein = 0;
    if (state.adultes >= 1) { lignes.push(['1er adulte', t.adulte]); plein += t.adulte; }
    if (state.adultes >= 2) { lignes.push(['2e adulte', t.adulte2]); plein += t.adulte; }
    for (var i = 0; i < state.enfants; i++) {
      lignes.push([(i === 0 ? '1er' : (i + 1) + 'e') + ' enfant (7–17 ans)', i === 0 ? t.enfant : t.enfantSuiv]);
      plein += t.enfant;
    }
    for (var j = 0; j < state.mini; j++) { lignes.push(['Mini (4–6 ans)', t.mini]); plein += t.mini; }

    var somme = lignes.reduce(function (s, l) { return s + l[1]; }, 0);
    var membres = state.adultes + state.enfants + state.mini;
    var plafonne = membres >= 3 && somme > t.plafond;
    var mensuel = plafonne ? t.plafond : somme;

    // Total de la période : les enfants suivent l'année scolaire (pas de facture en juillet-août).
    var partAdultes = (state.adultes >= 1 ? t.adulte : 0) + (state.adultes >= 2 ? t.adulte2 : 0);
    var moisSansEnfants = t.moisAdultes - t.moisEnfants;
    var total = state.enfants + state.mini > 0
      ? mensuel * t.moisEnfants + partAdultes * (state.adultes ? moisSansEnfants : 0)
      : mensuel * t.moisAdultes;

    return { t: t, lignes: lignes, somme: somme, plein: plein, mensuel: mensuel, plafonne: plafonne, membres: membres, total: total };
  }

  function render() {
    ['adultes', 'enfants', 'mini'].forEach(function (k) {
      root.querySelector('[data-val="' + k + '"]').textContent = state[k];
      root.querySelector('[data-dec="' + k + '"]').disabled = state[k] <= 0;
      root.querySelector('[data-inc="' + k + '"]').disabled = state[k] >= max[k];
    });
    root.querySelectorAll('[data-duree]').forEach(function (b) { b.setAttribute('aria-pressed', b.getAttribute('data-duree') === state.duree); });

    var r = calc(), out = root.querySelector('.calc-out');
    if (!r.membres) { out.innerHTML = '<p class="calc-empty">Ajoutez au moins une personne.</p>'; return; }

    var eco = r.plein - r.mensuel;
    out.innerHTML =
      '<div class="calc-total"><span>Votre tarif</span><b>' + chf(r.mensuel) + '</b><small>par mois · ' + r.t.label.toLowerCase() + '</small></div>' +
      (eco > 0 ? '<div class="calc-save">Vous économisez ' + chf(eco) + ' par mois (−' + Math.round(eco / r.plein * 100) + ' %)</div>' : '') +
      '<ul class="calc-lines">' + r.lignes.map(function (l) { return '<li><span>' + l[0] + '</span><b>' + chf(l[1]) + '</b></li>'; }).join('') +
      (r.plafonne ? '<li class="cap"><span>Plafond famille appliqué</span><b>−' + chf(r.somme - r.mensuel) + '</b></li>' : '') + '</ul>' +
      '<p class="small">' + (r.membres > 1 ? 'Soit ' + chf(r.mensuel / r.membres) + ' par personne. ' : '') +
      'Total sur la période : ' + chf(r.total) + (state.enfants + state.mini > 0 ? ' (enfants facturés ' + r.t.moisEnfants + ' mois, hors vacances d’été)' : '') + '.</p>';

    var compo = state.adultes + ' adulte(s), ' + state.enfants + ' enfant(s) 7–17, ' + state.mini + ' mini 4–6 — ' + r.t.label + ' — ' + chf(r.mensuel) + '/mois';
    root.querySelector('.calc-cta').href = 'inscription.html?pack=famille&composition_famille=' + encodeURIComponent(compo);
  }

  root.addEventListener('click', function (e) {
    var b = e.target.closest('button');
    if (!b) return;
    if (b.dataset.inc) state[b.dataset.inc] = Math.min(max[b.dataset.inc], state[b.dataset.inc] + 1);
    if (b.dataset.dec) state[b.dataset.dec] = Math.max(0, state[b.dataset.dec] - 1);
    if (b.dataset.duree) state.duree = b.dataset.duree;
    render();
  });
  render();
})();
