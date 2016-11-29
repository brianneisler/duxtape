# API

*NOTES*
- These API docs are still being written.

## TOC

* [Recompose methods](#recompose-methods)
  + [`compose()`](#compose)


## Recompose methods

### `compose()`

```js
compose(
  ...functions: Array<any => any>
): (...args:any) => any
```

Used to compose multiple higher order duxtape modules together in to a single module
