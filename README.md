Projet numéro 7 de la formation Développeur Web Junior

NodeJs / Express / React(JS) / MongoDb / Redux / Sass

Mise en place du Backend :

    - Changer les informations de la ligne 5 dans /config/db.js
    - Créez un fichier .env dans /config et ajoutez :
        - PORT=5000
        - PORT_FRONT=3000
        - FRONT_END_URL=http://localhost:3000
        - DB_USER_PASS=Votre identifiant et Mdp de MongoDb sous cette forme : Identifiant:Mdp
        - TOKEN_SECRET=88dsdsS8SDS8S5232177FFPhF33Mi844cDLj55d5D55CV5QjKXAy654872kljrd86156JGHJbBjhJKj256559BlMKjHFgDFkj565GF23454BGG5ENB456RkLlK12Lkl7nSL7Ljj8
    - Créez un dossier uploads pour les images (Profil et Post) dans /Back

Demarrer le back (la première fois) :

    - cd Back -> npm install 

Demarrer le Font (la première fois) :

    - cd groupomania -> yarn install 

Le Back-end : cd Back-end -> nodemon server

Le Front-end : cd Front-end -> yarn start
    