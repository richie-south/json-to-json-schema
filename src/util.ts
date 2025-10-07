export function deepEqual(...args: unknown[]) {
  for (let i = 0; i < args.length - 1; i++) {
    if (JSON.stringify(args[i]) !== JSON.stringify(args[i + 1])) {
      return false
    }
  }
  return true
}
