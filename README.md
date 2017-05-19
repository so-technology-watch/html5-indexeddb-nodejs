# IDBNodeSQL

This project is a proof of concept (POC).
It's purpose is to demonstrate an implementation of IndexedDB to make local data persistence and to synchronize it to a remote SQLite database using a NodeJS REST API.

- Server Application : A NodeJS REST API using SQLite as a database (sqlite.db). The code is written in ES6 and uses Promises.

- Client Application : A Web interface using IndexedDB as a database (using Dexie library).  
Elements are displayed in views by VueJS.
  
Additionally, an [Angular2 front](https://github.com/so-technology-watch/angular2-demo) is proposed by [Imad El Hitti](https://github.com/imadhy) (without the IndexedDB part).

For more details, see the [Technological Plan](https://github.com/so-technology-watch/html5-indexeddb-nodejs/blob/master/public/ressources/TechPlan.pdf).

## Installation

1. [Download](https://github.com/so-technology-watch/html5-indexeddb-nodejs/archive/master.zip) or clone this repository : `git clone https://github.com/so-technology-watch/html5-indexeddb-nodejs.git`  
2. Then install its dependencies : `npm install`

## Requirements

- [Git](https://git-scm.com/) if you want to clone this repository.
- [NodeJS](https://nodejs.org/en/) to run the application.
- [Npm](https://www.npmjs.com/) to install dependencies (see the full list below at "Dependencies").
- A Web Browser to test the Client Application.
- [Postman](https://www.getpostman.com/) if you just want to test the API.

## Getting started

1. Install this application (See Installation).
2. Start the server with : `node index.js`
3. Start your Web Browser and go to `http://localhost:3000`   
Or connect Postman to the API at : `http://localhost:3000`
4. Try the different "Cars" and "Drivers" web pages and the different routes of the API.
  
For more details, see the [Wiki documentation](https://github.com/so-technology-watch/html5-indexeddb-nodejs/wiki).

## Dependencies (installed via `npm install`)

- [Body-parser](https://www.npmjs.com/package/body-parser), a Node.js body parsing middleware.
- [Ejs](https://www.npmjs.com/package/ejs) embedded JavaScript templates.
- [Express](https://www.npmjs.com/package/express), a fast and minimalist web framework for node.
- [Sqlite](https://www.npmjs.com/package/sqlite), a wrapper library that adds ES6 promises and SQL-based migrations API to [sqlite3](https://www.npmjs.com/package/sqlite3)*.
- [Bluebird](https://www.npmjs.com/package/bluebird) promise library.

*Sqlite3 : (Asynchronous, non-blocking SQLite3 bindings for Node.js.)
## Todo

- Add/Refactor comments in code.
- Refactor front code.

## Credits

- Made by [Romuald Tuffreau](https://github.com/romwaldtff).

## Thanks

- [Laurent Guerin](https://github.com/l-gu), creator of [Telosys Tools](https://sites.google.com/site/telosystools/).
- [Evan You](https://github.com/yyx990803), creator of [VueJS](https://github.com/vuejs).
- [David Fahlander](https://github.com/dfahlander), creator of [Dexie.js](https://github.com/dfahlander/Dexie.js).

## License

This project uses the [LGPL v3 License](https://www.gnu.org/licenses/lgpl-3.0.en.html) (See the LICENSE file in this repository).