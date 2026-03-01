import * as React from 'react';

/**
 * Creates a strictly-typed React context with a provider and hook pair.
 * Throws if the hook is used outside its provider.
 */
function getStrictContext<T>(
    displayName: string,
): [React.Provider<T | undefined>, () => T] {
    const Context = React.createContext<T | undefined>(undefined);
    Context.displayName = displayName;

    function useStrictContext(): T {
        const value = React.useContext(Context);
        if (value === undefined) {
            throw new Error(
                `use${displayName} must be used within a ${displayName} provider`,
            );
        }
        return value;
    }

    return [Context.Provider as React.Provider<T | undefined>, useStrictContext];
}

export { getStrictContext };
