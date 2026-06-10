# D10H

Main project during web developer course in Angoulême's AFEC centre :

D10H is a Third-party application using the Deezer API to provide a complementary synchronized music learning service

## Installation

Pour l'instalation il est necessaire d'avoir **Docker** d'installé  
https://www.docker.com/get-started/

1. Clone Repository :

   ```bash
   git clone https://github.com/SagWel/D10H.git
   cd D10H
   ```

2. Creat and edit .env front :

   ```bash
   cd client
   cp .env.example .env
   ```

   Edit VITE_HOST *localhost* sauf si configuration personel autre

3. Creat and edit .env back :
  
    ```bash
    cd../server
    cp .env.example .env
    ```

    Edit MYSQL_HOST, MYSQL_PORT, MYSQL_NAME, MYSQL_USER and MSQL_PWD with db environement content in `docker-commpose.yml`

4. Start Docker service :

   ```bash
   cd ..
   docker-compose up -d --build
   ```

5. Go to D10H :

   http://localhost:5173/

## Technologies

- CSS / ChakraUI 2 / TypeScript
- React
- VexFlow 5
- JWT
- PHP
- Docker

## Features

1. Implemented
   - Login
   - Registering
   - Select one or more instruments and the appropriate level at first login
   - Configure Profil (password, gender, username, instruments and the appropriate level, date of birth)
   - Search for Score, filter and sort the results
   - Delete Profil
   - Configure the display of explicit content (set to “no explicit content” by default for children)
   - Display Score and start playing it

2. In the future
   - Submit a suggestion for a score if it doesn't appear in the results
   - Full mailling system
   - Playlist system called 'Scorebraies'
   - Popularity system for scores
   - Shuffle score select button system for Favorites page
   - Private infos and personal data management infos on account page
   - Add more security for deleting account
   - Add pause or playing choice if visibilityState change to 'hidden'
   - Full notifications system
   - All tools buttons fonction
   - Connect to a SDK
   - Renderring Scores new system
   - Button to simplifing score view
   - Preview audio on Score cards
   - New carousels for more than just scores
   - Searchbar stabilisation
  
## Preview

![Screenshot of app](./screenshot.png)
