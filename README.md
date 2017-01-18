<img src="https://raw.githubusercontent.com/js-data/js-data/master/js-data.png" alt="js-data logo" title="js-data" align="right" width="96" height="96" />

# js-data-repo-tools

[![Slack Status][sl_b]][sl_l]
[![npm version][npm_b]][npm_l]
[![npm downloads][dn_b]][dn_l]

Common utility scripts used by js-data repositories.

Refer to the `package.json` files of the various js-data adapter repositories to
see this tool in action.

## Table of contents

* [Quick start](#quick-start)
* [Community](#community)
* [Support](#support)
* [Contributing](#contributing)
* [License](#license)

## Quick Start
Install into a repository: `npm i --save-dev js-data-repo-tools`

And update your scripts in `package.json`:

```js
"scripts": {
  "lint": "repo-tools lint src/index.js test/**/*.js"
}
```

Or install globally: `npm i -g js-data-repo-tools`

And use on the commandline:

```
repo-tools lint
```

## Community

[Explore the Community](http://js-data.io/docs/community).

## Support

[Find out how to Get Support](http://js-data.io/docs/support).

## Contributing

[Read the Contributing Guide](http://js-data.io/docs/contributing).

## License

The MIT License (MIT)

Copyright (c) 2017 js-data-repo-tools project authors

* [LICENSE](https://github.com/js-data/js-data-repo-tools/blob/master/LICENSE)
* [AUTHORS](https://github.com/js-data/js-data-repo-tools/blob/master/AUTHORS)
* [CONTRIBUTORS](https://github.com/js-data/js-data-repo-tools/blob/master/CONTRIBUTORS)

[sl_b]: http://slack.js-data.io/badge.svg
[sl_l]: http://slack.js-data.io
[npm_b]: https://img.shields.io/npm/v/js-data-repo-tools.svg?style=flat
[npm_l]: https://www.npmjs.org/package/js-data-repo-tools
[dn_b]: https://img.shields.io/npm/dm/js-data-repo-tools.svg?style=flat
[dn_l]: https://www.npmjs.org/package/js-data-repo-tools
