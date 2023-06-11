/** 1 NodeModules */
/** 2 Config, Packages, Endpoints, Enums */
/** 3 Components, Hooks, Icons - NodeModules */
/** 4 Components, Hooks - Custom */
/** 5 Entities, Stores, Services */
/** 6 Resources */

export const ACTION_FOCUSED = 'focused';
export const ACTION_UNFOCUSED = 'unfocused';

export const FocusReducer = (state, action) => {
    if (action.type === ACTION_FOCUSED) {
        return true;
    } else if (action.type === ACTION_UNFOCUSED) {
        return false;
    }
};
