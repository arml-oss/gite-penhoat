# Le Gîte de Penhoat — Site vitrine

Site publicitaire statique pour le **Gîte de Penhoat** (Plourin-lès-Morlaix, Finistère, Bretagne).
Aucune réservation sur le site : tous les boutons « Réserver » redirigent vers la fiche
officielle Gîtes de France® (référence **29G34670**).

## Langues

| Langue | Fichier | Lien Gîtes de France® |
|---|---|---|
| Français (défaut) | `index.html` | gites-de-france.com/fr/... |
| Anglais | `en/index.html` | gites-de-france.com/en/... |
| Espagnol | `es/index.html` | gites-de-france.com/es/... |
| Allemand | `de/index.html` | gites-de-france.com/de/... |

Un sélecteur de langue (FR / EN / ES / DE) est présent dans l'en-tête de chaque page.
Des balises `hreflang` sont déjà en place.

## Structure

```
index.html          Page française
en/index.html       Page anglaise
es/index.html       Page espagnole
de/index.html       Page allemande
assets/css/style.css
assets/js/main.js   Menu mobile, animations au défilement
assets/img/         Favicon (SVG)
```

## À faire avant la mise en ligne

1. **Remplacer les illustrations par de vraies photos** du gîte. Les visuels actuels sont des
   SVG dessinés (maison bretonne, produits de la ferme) — remplacez les blocs `<svg>` du hero
   et de la section « Le gîte » par des balises `<img>`, idéalement en WebP (~1600 px de large).
   Utilisez vos propres photos : les visuels de la fiche Gîtes de France® sont protégés par
   le droit d'auteur.
2. **Renseigner le nom de domaine** : remplacer `https://EXAMPLE.COM/` dans les balises
   `hreflang` des 4 pages.
3. Vérifier les **tarifs** affichés (« à partir de 370 €/semaine ») s'ils évoluent.

## Déploiement

Site 100 % statique, sans dépendance ni build : il suffit de copier le dossier sur n'importe
quel hébergeur (GitHub Pages, Netlify, OVH, o2switch…).

Exemple avec GitHub Pages :
1. Pousser ce dossier dans un dépôt GitHub.
2. Settings → Pages → Source : branche `main`, dossier `/ (root)`.
3. Le site sera disponible sur `https://<compte>.github.io/<depot>/` — mettre à jour les
   `hreflang` avec cette URL.

## Notes juridiques

- Mention en pied de page : les réservations sont traitées par Gîtes de France®.
- « Gîtes de France® » est une marque déposée de la Fédération Nationale des Gîtes de France®.
