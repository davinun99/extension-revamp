/**
 * This file have access to the tab that the user is seeing, we will use this as
 * the entry point to inject all of the react code and to scrape linkedin info
 */
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import { store } from './redux/store';
const ANCHOR_ID: string = 'rcr-anchor';
//Creating a new artificial element on the rigth of the page to display all of the information

const anchor:HTMLDivElement = document.createElement('div');
anchor.id = ANCHOR_ID;
document.body.insertBefore(anchor, document.body.childNodes[0]);

const container = document.getElementById(ANCHOR_ID);
const root = createRoot(container!); 

root.render(<Provider store={store}>
	<App/>
</Provider>);