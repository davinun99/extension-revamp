/**
 * This file have access to the tab that the user is seeing, we will use this as
 * the entry point to inject all of the react code and to scrape linkedin info
 */
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import { createAppStore } from './redux/store';
const ANCHOR_ID: string = 'rcr-anchor';
//Creating a new artificial element on the rigth of the page to display all of the information

const anchor:HTMLDivElement = document.createElement('div');
anchor.id = ANCHOR_ID;
document.body.insertBefore(anchor, document.body.childNodes[0]);
render(
	<Provider store={createAppStore()}>
		<App/>
	</Provider>, 
document.getElementById(ANCHOR_ID));