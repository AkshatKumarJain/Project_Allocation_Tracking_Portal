export function mockRequest(data, delay = 350) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(data), delay)
  })
}
