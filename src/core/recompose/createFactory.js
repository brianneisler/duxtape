const createFactory = baseFunc =>
  //TODO BRN: Can this be memoized?
  (props, ...rest) => baseFunc(props, ...rest)

export default createFactory
