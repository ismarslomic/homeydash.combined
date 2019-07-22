# homeydash.combined
![GitHub](https://img.shields.io/github/license/ismarslomic/homeydash.combined.svg)
![David](https://img.shields.io/david/ismarslomic/homeydash.combined.svg)
![David](https://img.shields.io/david/dev/ismarslomic/homeydash.combined.svg)
![Snyk Vulnerabilities for GitHub Repo](https://img.shields.io/snyk/vulnerabilities/github/ismarslomic/homeydash.combined.svg)
![Codecov](https://img.shields.io/codecov/c/github/ismarslomic/homeydash.combined.svg)
![Travis (.org) branch](https://img.shields.io/travis/ismarslomic/homeydash.combined/master.svg)
![GitHub last commit](https://img.shields.io/github/last-commit/ismarslomic/homeydash.combined.svg)

Web-based Homey Dashboard written in Vue.js inspired by  [homey.ink](https://github.com/athombv/homey.ink) (e-ink compatible) and [homeydash.com](https://github.com/daneedk/homeydash.com) (iPad/iPhone compatible) dashboards.

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Run end-to-end tests
```
npm run test:e2e
```

### Run unit tests
```
npm run test:unit
```

### Re-compile SVG icons to src
```
npm run generate-icons:yws
```

### Preview production locally
```
npm install -g serve
# -s flag means serve it in Single-Page Application mode
# which deals with the routing problem described https://cli.vuejs.org/guide/deployment.html#previewing-locally
serve -s dist
```

### Report the missing locale message keys and unused keys
```
npm run i18n:report
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
