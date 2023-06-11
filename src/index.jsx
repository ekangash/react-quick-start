/** 1 NodeModules */
import React from 'react';
import { createRoot } from 'react-dom/client';

/** 2 Config, Packages, Endpoints, Enums */
/** 3 Components, Hooks, Icons - NodeModules */
/** 4 Components, Hooks, Icons - Custom */
import { App } from '@app/App';

/** 5 Entities, Stores, Services */
/** 6 Resources */
import '@common/styles/global.scss';

const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<App />);

/** 1 NodeModules */
/** 2 Config, Packages, Endpoints, Enums */
/** 3 Components, Hooks, Icons - NodeModules */
/** 4 Components, Hooks, Icons - Custom */
/** 5 Entities, Stores, Services */
/** 6 Resources */

/*
Что делает babel и как он связывается с webpack
 */