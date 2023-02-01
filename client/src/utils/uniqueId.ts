export function uniqueId(prefix: string) {
    return prefix + Math.random().toString(16).slice(-4)
}