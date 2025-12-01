export function useLocalStorage<T>(key: string, initial: T) {
const read = (): T => {
try {
const raw = localStorage.getItem(key)
return raw ? JSON.parse(raw) as T : initial
} catch (e) {
console.warn('localStorage read error', e)
return initial
}
}


const write = (value: T) => {
try {
localStorage.setItem(key, JSON.stringify(value))
} catch (e) {
console.warn('localStorage write error', e)
}
}


return { read, write }
}