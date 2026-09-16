const moment = globalThis.moment

if (!moment) {
  throw new Error('Expected globalThis.moment to be provided at runtime')
}

export default moment
