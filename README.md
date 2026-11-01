# Site web complet — LAVAUX Academy

Site statique (HTML/CSS/JS, sans framework). Il remplace la landing page de `05_site-test/`.

## Pages
| Fichier | Contenu |
|---|---|
| `index.html` | Accueil : concept, piliers, publics, « Même heure, deux étages », sondage « Seriez-vous preneur ? », lieu, démarche, FAQ |
| `programmes.html` | Tous les niveaux : Mini 4–6, Kids 7–9, Juniors 10–13, Ados 14–17, Initiation, Tous niveaux, Avancés, Boxe fitness, parcours de grades, planning cible |
| `tarifs.html` | Packs malins (Duo, Famille, Binôme, Fratrie, Starter, privé), abonnements enfants et adultes, tarif fondateur |
| `femmes.html` | Programme Elles : cours 100 % féminins, galerie, tarifs, FAQ |
| `academie.html` | Vision, pédagogie, plan du lieu (V6), pourquoi Cully, équipe & gestion, gouvernance |
| `investir.html` | Tickets CHF 1 000–10 000 (société d’exploitation uniquement), utilisation des fonds, contenu du dossier, formulaire en 2 étapes (intérêt → coordonnées), risques, avertissement légal |
| `inscription.html` | Questionnaire en 3 étapes + pré-inscription (branche « Pas pour moi » séparée) |
| `confidentialite.html` | Politique nLPD |

Liens directs utiles : `inscription.html?interet=oui`, `inscription.html?pack=duo`, `inscription.html?cours=Elles` (préremplissent le formulaire).

## À faire avant la mise en ligne
1. **Formulaires** : créer deux formulaires sur formspree.io (« interet » et « investisseur ») et coller les URL dans `assets/js/config.js`.
   Sans URL, le site ouvre un e-mail prérempli vers les adresses de `config.js` (solution de repli).
2. **Adresses e-mail** : `info@lavaux-academy.ch` et `investir@lavaux-academy.ch` sont des exemples. Domaine non vérifié : remplacer dans `config.js`, `academie.html` et `confidentialite.html`.
3. **Équipe** : vérifier le nom et le texte du fondateur dans `academie.html#equipe`.
4. **Tarifs** : prix indicatifs cohérents avec le plan d’affaires (enfants 75–95, adultes 119–139, jeunes 99). À ajuster après le test.
5. **Tarif fondateur** (100 premiers, 12 mois, frais d’inscription offerts) : engagement commercial à valider.
6. **Photos** : visuels Unsplash libres de droits, servis en taille moyenne (500–1400 px, qualité 60–70) directement depuis Unsplash. Les remplacer par des photos du lieu réel dès que possible.

## Logo
Logo v4 (01.11.2026) : `assets/img/logo-lavaux-ivory.svg` (en-tête et pied de page, fond sombre), `logo-lavaux-navy.svg` (fond clair), `logo-x.svg` (symbole seul), `favicon.svg`, `apple-touch-icon.png`. Sources et règles d'usage : `04_marque/logo-v4/` et `04_marque/charte-marque.md` du dossier projet.

## Tester en local
```bash
cd 09_site-web && python3 -m http.server 8765
```
Puis ouvrir http://localhost:8765.

## Mise en ligne
Glisser le dossier `09_site-web` sur Netlify Drop, ou GitHub Pages. La page investir est en `noindex`.
