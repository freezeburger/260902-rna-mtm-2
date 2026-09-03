export default {};


/**
 * An Actionable component or element that can perform an action.
 */
export type Actionable = {
    action: () => any;
}

/**
 * Normalization text content for a component or element.
 */
export type WithTextContent = {
    content: string;
}

/**
 * Size options for a component or element.
 */
export type WithSize = {
    size: 'small' | 'regular';
}

/**
 * A product available for discovery, ordering and listing.
 */
export type Product = {
    id: string;
    title: string;
    description: string;
    price: number;
    thumbnail?: string;
    category?: string;
};

/**
 * User preferences edited from the Settings screen.
 */
export type UserSettings = {
    username: string;
    defaultOrderQuantity: number;
    notificationsEnabled: boolean;
    darkModeEnabled: boolean;
};

/**
 * A locally simulated order created from the Orders screen.
 */
export type Order = {
    id: string;
    productId: string;
    quantity: number;
    total: number;
    createdAt: string;
};

/**
 * Shared application state used across every screen.
 */
export type AppState = {
    username: string;
    products: Product[];
    favoriteProductIds: string[];
    ignoredProductIds: string[];
    discoverIndex: number;
    selectedProductId?: string;
    defaultOrderQuantity: number;
    orderQuantity: number;
    notificationsEnabled: boolean;
    darkModeEnabled: boolean;
    orders: Order[];
};