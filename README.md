<div id="top"></div>

[![Forks][forks-shield]][forks-url] [![Issues][issues-shield]][issues-url] [![MIT License][license-shield]][license-url]

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/moedaaboul/babylon">
    <img src="./client/public/images/logo.png" alt="Logo">
  </a>

  <p align="center">
    The concept for this project was to create an e-commerce platform for brands, influencers and sellers that is open source and offers a valuable resource for the dev community interested in building an full-stack e-commerce app with trending and state-of-the-art technologies. 
    <br />
    <a href="https://github.com/moedaaboul/babylon"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a https://ebabylon.herokuapp.com/">View Demo</a>
    ·
    <a href="https://github.com/moedaaboul/babylon/issues">Report Bug</a>
    ·
    <a href="https://github.com/moedaaboul/babylon/issues">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#user-story">User story</a></li>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#installation">Installation</a></li>
        <li><a href="#prerequisites">Prerequisites</a></li>
      </ul>
    </li>
    <li><a href="#dependencies">npm dependencies</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

## About The Project

![My dashboard view of Tech Blog](./client/public/images/readme.gif)

Through a combination of an exceptional concept with great technological delivery through industry standard tools, the
ebabylon app was created to meet the demand and maintain an ethos that bares close relation to that of popular shopping
brands.

<p align="right">(<a href="#top">back to top</a>)</p>

### User Story - General

- WHEN I land in the page, THEN I’m presented with a Carousel with featured product and a navigation bar.
- WHEN I press login, THEN I’m presented with a login page, asking me to log in or to sign up.
- WHEN I press sign up, THEN I’m taken to a sign up page to insert my info. I can choose to sign up as ‘brand’,
  ‘influencer’ or ‘buyer’.
- WHEN I enter my information, THEN I’m taken to either the main page or to the Dashboard (if I’m signing up as a
  seller).

### User Story - Brand

- WHEN I land in my Dashboard, I’m presented with options to add new product and to manage the products under my brand.
- WHEN I land in items page, THEN I can browse the items and view my product as a user.

### User Story - User

- WHEN I land on the items page, THEN I’m presented with all the products
- WHEN I view each products, THEN I’m presented with all data related to the products and highlighted info.
- WHEN I interact with filters and sorters, THEN I’m presented with items that fall in the criteria.
- WHEN I click the like button , THEN this item is added to my favorite.
- WHEN I navigate to my favorite button , THEN I’m taken to a page to view all the items that I’ve saved
- WHEN I click into each item, THEN I’m taken to the page of that item
- WHEN I click ‘Add to Cart’, THEN the item will be added to my cart and the cart data will persist throughout the
  session
- WHEN I click ‘+’ or ‘-’, THEN the I can change the amount of item I wish to purchase
- WHEN I click ‘Checkout’ button, THEN I’m taken to the checkout page and payment page.

### Built With

- [React](https://reactjs.org/)
- [GraphQL](https://graphql.org/)
- [Apollo GraphQL ](https://www.apollographql.com/)
- [Stripe](www.stripe.com)
- [Express](https://expressjs.com/)
- [Cloudinary](https://cloudinary.com/)
- [Filepond](https://pqina.nl/filepond/)
- [Heroku](https://www.heroku.com/)

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

### Installation

0. Run deployed app at: https://ebabylon.herokuapp.com/
1. Clone the repo
   ```sh
   git clone git@github.com:moedaaboul/babylon.git
   ```
2. Install NPM packages
   ```sh
   npm i
   ```
3. Download and configure MySQL https://www.mysql.com/

### Prerequisites

Install all necessary dependencies by executing:

```sh
npm i
```

## Dependencies

```javascript
const express = require('express');
const sequelize = require('./config/connection');
const exphbs = require('express-handlebars');
const path = require('path');
const session = require('express-session');
const helpers = require('./utils/helpers');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
```

<p align="right">(<a href="#top">back to top</a>)</p>

## Contributing

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also
simply open an issue with the tag "enhancement". Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- LICENSE -->

## Hosting

| Project | Babylon URL                       |
| ------- | --------------------------------- |
| Babylon | <https://ebabylon.herokuapp.com/> |

<p align="right">(<a href="#top">back to top</a>)</p>

## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- CONTACT -->

## Contact

> Muhammad Daaboul ![GitHub followers](https://img.shields.io/github/followers/moedaaboul?style=social)

> Heran Yang ![GitHub followers](https://img.shields.io/github/followers/heranYang93?style=social)

> Vienna Borowska ![GitHub followers](https://img.shields.io/github/followers/ViennaBorowska?style=social)

> Iler Watson ![GitHub followers](https://img.shields.io/github/followers/Iler22?style=social)

<!-- > ![GitHub followers](https://img.shields.io/github/followers/heranYang93?style=social) -->

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- ACKNOWLEDGMENTS -->

## Acknowledgments

- [Express](https://expressjs.com)
- [MongoDB](https://www.mongodb.com/cloud/atlas)
- [Mongoose](https://mongoosejs.com/)
- [Mui](https://mui.com/)
- [Filepond](https://pqina.nl/filepond/)
- [Cloudinary](https://cloudinary.com)
- [Heroku](https://id.heroku.com/login)

<p align="right">(<a href="#top">back to top</a>)</p>

[forks-shield]: https://img.shields.io/github/forks/moedaaboul/babylon.svg?style=for-the-badge
[forks-url]: https://github.com/moedaaboul/babylon/network/members
[issues-shield]: https://img.shields.io/github/issues/moedaaboul/babylon.svg?style=for-the-badge
[issues-url]: https://github.com/moedaaboul/babylon/issues
[license-shield]: https://img.shields.io/github/license/moedaaboul/babylon.svg?style=for-the-badge
[license-url]: https://github.com/moedaaboul/babylon/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url-md]: https://www.linkedin.com/in/muhammad-daaboul-38470046/
[github-follow-shield-md]: https://img.shields.io/github/followers/heranYang93?style=social
[linkedin-url-hy]: https://linkedin.com/in/heranyang/
[github-follow-shield-hy]: https://img.shields.io/github/followers/moedaaboul?style=social
[linkedin-url-eh]: https://www.linkedin.com/in/vienna-b-108b04229/
[linkedin-url-iw]: https://linkedin.com/in/iler-watson-643442158/
[login-screenshot]: /__admin__/resources/login.png
[feed-screenshot]: /__admin__/resources/feed.png
[post-screenshot]: /__admin__/resources/post.png
