# How to Contribute

## Setup

Fork and clone this repository, then run

```bash
yarn
```

Run tests:

```bash
yarn test
```

## Code

This repository is a monorepo which means that it contains multiple npm packages.

Running `yarn` in the repository's root directory will install the dependencies of all packages and link the packages that depend on each other.

Running `yarn test` in the repository's root directory will run all packages' tests. Run `yarn test` in a package to test this package only.

Just edit the code like you always do. Be aware that we automatically lint the code according to [JavaScript standard code style](https://github.com/feross/standard).

## Share

1. Fork the repository.
2. Create a new branch from `master`.
3. Do something awesome.
4. Add / update tests.
5. Update changelogs of all packages that you change. Use *Next release* as a version number.
6. Push them and open a pull request. 


## More Information

* [How to Test Blocks](docs/TESTING.md)
* [How to Write a Webpack Block](docs/BLOCK-CREATION.md)
