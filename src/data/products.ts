/**
 * Local product catalog used by Discover, Favorites, Products and Orders.
 * No backend is involved: this static list is the single source of product
 * data for the whole MVP.
 */
import type { Product } from '@/src/types';

export const products: Product[] = [
  {
    id: 'p1',
    title: 'Wireless Headphones',
    description: 'Comfortable Bluetooth headphones with noise reduction.',
    price: 79,
    thumbnail: 'https://picsum.photos/seed/p1-headphones/400',
    category: 'Audio',
  },
  {
    id: 'p2',
    title: 'Coffee Mug',
    description: 'A ceramic mug for your daily coffee.',
    price: 12,
    thumbnail: 'https://picsum.photos/seed/p2-mug/400',
    category: 'Kitchen',
  },
  {
    id: 'p3',
    title: 'Notebook',
    description: 'A simple notebook for ideas and sketches.',
    price: 8,
    thumbnail: 'https://picsum.photos/seed/p3-notebook/400',
    category: 'Office',
  },
  {
    id: 'p4',
    title: 'Water Bottle',
    description: 'Insulated stainless steel bottle that keeps drinks cold.',
    price: 19,
    thumbnail: 'https://picsum.photos/seed/p4-bottle/400',
    category: 'Outdoors',
  },
  {
    id: 'p5',
    title: 'Desk Lamp',
    description: 'Adjustable LED lamp with warm and cool light modes.',
    price: 34,
    thumbnail: 'https://picsum.photos/seed/p5-lamp/400',
    category: 'Office',
  },
  {
    id: 'p6',
    title: 'Running Shoes',
    description: 'Lightweight shoes designed for daily training.',
    price: 89,
    thumbnail: 'https://picsum.photos/seed/p6-shoes/400',
    category: 'Fitness',
  },
  {
    id: 'p7',
    title: 'Backpack',
    description: 'Durable backpack with padded laptop compartment.',
    price: 54,
    thumbnail: 'https://picsum.photos/seed/p7-backpack/400',
    category: 'Outdoors',
  },
  {
    id: 'p8',
    title: 'Wireless Mouse',
    description: 'Ergonomic mouse with silent clicks and long battery life.',
    price: 24,
    thumbnail: 'https://picsum.photos/seed/p8-mouse/400',
    category: 'Office',
  },
  {
    id: 'p9',
    title: 'Yoga Mat',
    description: 'Non-slip mat with extra cushioning for daily practice.',
    price: 29,
    thumbnail: 'https://picsum.photos/seed/p9-yoga/400',
    category: 'Fitness',
  },
  {
    id: 'p10',
    title: 'Bluetooth Speaker',
    description: 'Portable speaker with rich bass and 12h battery life.',
    price: 45,
    thumbnail: 'https://picsum.photos/seed/p10-speaker/400',
    category: 'Audio',
  },
];
