import Promise from 'bluebird'

export default function createChannel () {
  const messageQueue = []
  const resolveQueue = []

  function put (msg) {
    if (resolveQueue.length) {
      const nextResolve = resolveQueue.shift()
      nextResolve(msg)
    } else {
      messageQueue.push(msg)
    }
  }

  function take () {
    if (messageQueue.length) {
      return Promise.resolve(messageQueue.shift())
    }
    return new Promise((resolve) => resolveQueue.push(resolve))
  }

  return {
    take,
    put
  }
}
