# How to Contribute

## Setup

Fork and clone this repository, then run

```bash
npm install
```

Run tests:

```bash
npm test
```

## Code

This repository is a monorepo which means that it contains multiple npm packages.

Running `npm install` in the repository's root directory will install the dependencies of all packages and link the packages that depend on each other.

Running `npm test` in the repository's root directory will run all packages' tests. Run `npm test` in a package to test this package only.

Just edit the code like you always do. Be aware that we automatically lint the code according to [JavaScript standard code style](https://github.com/feross/standard).

When adding a new package you might need to run `npm run postinstall` in the repository's root directory to update the links between packages depending on each other.


## Share

Commit your changes, push them and open a pull request. We will review your pull request and eventually merge your valuable contribution back into the mother repository.

## More Information

* [How to Test Blocks](docs/TESTING.md)
* [How to Write a Webpack Block](docs/BLOCK-CREATION.md)
