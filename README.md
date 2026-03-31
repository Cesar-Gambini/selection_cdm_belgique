# Compose ta sélection belge pour le Mondial 2026

Outil interactif permettant de composer une sélection de 26 joueurs pour les Diables Rouges.

## Déploiement sur Hostinger

1. Connectez-vous à votre panneau Hostinger
2. Ouvrez le **File Manager** (ou utilisez un client FTP)
3. Naviguez vers le dossier `public_html`
4. Uploadez **tous les fichiers et dossiers** du projet :
   - `index.html`
   - `css/style.css`
   - `js/data.js`
   - `js/app.js`
   - `assets/` (dossier avec les photos)
5. Le site est en ligne !

## Mettre à jour les joueurs

Seul le fichier `js/data.js` doit être modifié.

1. Ouvrez `js/data.js` dans un éditeur de texte
2. Modifiez les noms, clubs et chemins photo de chaque joueur
3. Respectez la structure existante (id, name, club, photo, position)
4. Déposez les photos correspondantes dans `assets/players/` (nommées par id : `gk_01.jpg`, `def_01.jpg`, etc.)
5. Re-uploadez `js/data.js` et le dossier `assets/players/`

### Nombre de joueurs par poste

Dans `STEPS_CONFIG` (en bas de `data.js`), vous pouvez ajuster le nombre requis par poste via le champ `required`.

## Emplacements publicitaires (AdSense)

Le site contient 3 emplacements balisés avec la classe `.ad-slot` :

1. **Leaderboard haut de page** (`.ad-leaderboard`) — 728x90
2. **Rectangle dans les étapes** (`.ad-rectangle`) — 300x250
3. **Leaderboard bas de récap** (`.ad-leaderboard`) — 728x90

Pour activer AdSense, remplacez le contenu texte "ESPACE PUBLICITAIRE" de chaque `<div class="ad-slot">` par votre code AdSense :

```html
<div class="ad-slot ad-leaderboard">
  <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXX" crossorigin="anonymous"></script>
  <ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-XXXXXXX" data-ad-slot="YYYYYYY" data-ad-format="auto"></ins>
  <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
</div>
```

## Changer l'image Open Graph

Remplacez le fichier `assets/og-image.png` par votre image (dimensions recommandées : 1200x630px). Mettez aussi à jour l'URL dans les meta tags de `index.html` si votre domaine change.
