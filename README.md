# farkle_game

- Choix de l’interface en react : 
    - création d’une première page où l’utilisateur renseigne son pseudo + un boutton “jouer”. 
    - Seconde page où l’utilisateur retrouve son pseudo et vois les autres utilisateurs + un compteur qui va roll lorsque le lobby sera plein. 
    - Troisième page accessible depuis la première avec un ladder comportant les pseudo de tout les joueurs + leur plus haut score de manière décroissante. +                 Utilisation de l’api.
    
- Création de l’api node js

- Création de la BDD mongoDB, (ID, pseudo, score)

- SETUP d’une bibiliothèque python pour permettre la création de session multijoueur (pygame semble être pas mal)

## Règles ##

Chaque joueur lance à son tour les six dés et vérifie s'il a lancé des dés ou des combinaisons de score. (Voir Score ci-dessous.) Tous les dés qui marquent peuvent être mis de côté, puis le joueur peut choisir de lancer tous les dés restants. Le joueur doit **mettre de côté au moins un dé de score de son choix** si possible mais n'est pas obligé de mettre de côté tous les dés de score.

_Par exemple, si un joueur obtient 1-2-2-5-5-6 à son tour, il peut mettre de côté le 1 et les deux 5 pour marquer, ou il peut choisir de ne mettre de côté que le 1._

Tous les dés de score qui ne sont pas mis de côté peuvent être relancés avec les dés de non score.

Si les **six dés ont été mis de côté pour marquer** (connu sous le nom de "dés chauds"), le joueur peut choisir de **lancer à nouveau les six dés** et continuer à ajouter à son score accumulé ou il peut accumuler ses points, terminer son tour et passer les dés au joueur suivant.

## Tableau score ##


- **Face 1**  : 100 points
- **Face 5**  : 50 points
- **Trois 1** : 1000 points
- **Trois 2** : 200 points
- **Trois 3** : 300 points
- **Trois 4** : 400 points
- **Trois 5** : 500 points
- **Trois 6** : 600 points

