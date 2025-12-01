import axios from 'axios'
import type { Product } from '@/types/product'


const api = axios.create({
baseURL: 'https://fakestoreapi.com', // replace with your API
timeout: 10000
})


export async function fetchProducts(): Promise<Product[]> {
// Example mapping from fakestoreapi to our Product type
const res = await api.get('/products')
return res.data.map((p: any, i: number) => ({
id: p.id,
name: p.title,
price: Math.round(p.price * 1000), // example convert
description: p.description,
image: p.image
}))
}


export async function fetchProductById(id: number): Promise<Product> {
const res = await api.get(`/products/${id}`)
const p = res.data
return {
id: p.id,
name: p.title,
price: Math.round(p.price * 1000),
description: p.description,
image: p.image
}
}


export default api