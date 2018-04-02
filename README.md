# froq-glassfish

![npm](https://img.shields.io/npm/v/froq-glassfish.svg)
![node](https://img.shields.io/node/v/froq-glassfish.svg)

![Travis branch](https://img.shields.io/travis/wildoak/froq-glassfish/master.svg)
![Coveralls github](https://img.shields.io/coveralls/github/wildoak/froq-glassfish.svg)

![license](https://img.shields.io/github/license/wildoak/froq-glassfish.svg)
![GitHub tag](https://img.shields.io/github/tag/wildoak/froq-glassfish.svg)
![GitHub issues](https://img.shields.io/github/issues/wildoak/froq-glassfish.svg)
![GitHub last commit](https://img.shields.io/github/last-commit/wildoak/froq-glassfish.svg)
![GitHub top language](https://img.shields.io/github/languages/top/wildoak/froq-glassfish.svg)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/wildoak/froq-glassfish.svg)

<img src="froq.png" width="100" alt="froQ logo" />

- [npm](https://www.npmjs.com/package/froq-glassfish)
- [GitHub](https://github.com/wildoak/froq-glassfish)

## Usage

`npm install froq-glassfish`

We use npm package `debug`. To make me verbose use `DEBUG=froq-glassfish`.


### Deploy an artifact

```js
import {Glassfish} from 'froq-glassfish';

const gf = new Glassfish('https://localhost:4848', 'admin', 'admin');
await gf.deploy('my-program.war');
```
