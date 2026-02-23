export const isObject = (item: unknown): item is Record<string, unknown> => {
    return typeof item === 'object' && item !== null;
};