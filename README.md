# eslint-protected

A small lint rule to protect parts of the code from unconscious change. It uses a comment containing the `//@protected` keyword, an optional number of lines or `*` for the whole file, and a hash that is calculated from the code meant to be protected.

Code that differs from the saved hash will be reported.

## Installation and Configuration

Depending on your preferred package manager, run

```sh
npm add --save-dev eslint-protected
// or
yarn add -D eslint-protected
// or
pnpm add -D eslint-protected
```

Then in your eslint config, add

## Usage

To get the hash, just add `//@protected` without a hash and look at the error message.

### Protecting a file

```js
//@protected * [hash]
```

### Protecting a single line

```js
//@protected [hash]
```

### Protecting multiple lines

```js
//@protected 2 [hash]
```

Where `2` is the number of lines that should be protected below the comment.
