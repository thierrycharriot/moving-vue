## Lancer le serveur front

Dans le dossier front : `npm run serve`
Si tout s'affiche correctement, sur votre localhost:8080/ , vous êtes censés voir à l'écran trois phrases:
"Je suis le composant App !"
"J'englobe tout ce qu'il se passe par ici, et juste en dessous de moi je rends la vue du router !"
"Je suis la view Home !"

## Compiler votre SCSS en CSS

Vous allez devoir indiquer à SASS que vous souhaitez compiler votre SCSS chaque fois que vous sauvegardez votre fichier main.scss ou les fichiers importés dans ce dernier.
Pour ce faire, tapez la commande `sass chemin/du/fichier.main.scss chemin/du/fichier.main.css --watch`.
Le flag `--watch` permet de compiler à chaque modif sauvegardée.

## En cas de problème

L'idéal serait qu'on recense les bugs et tout ce qui vient avec au même endroit, même si on peut en discuter entre nous en privé via Slack/Discord, pensez à créer des issues, ça nous permettra de centraliser et garder une traçabilité.
