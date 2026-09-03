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