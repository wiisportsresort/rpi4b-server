import { MDCDrawer } from '@material/drawer';
import { MDCList } from '@material/list';
import { MDCRipple } from '@material/ripple';
import { MDCTopAppBar } from '@material/top-app-bar';
import checkMobile from './checkMobile';

/// Instatiation
// Check user agent for mobile
const isMobile = checkMobile;

// Content
const mainEl = document.querySelector('.main-content');

// Buttons
const buttonRippleEl = document.querySelectorAll('.mdc-button__ripple');
const buttonRipple = [].map.call(buttonRippleEl, el => new MDCRipple(el));

// Lists
const listEl = document.querySelectorAll('.mdc-list');
const list = [].map.call(listEl, el => new MDCList(el));

// List items
const listItemEl = document.querySelectorAll('.mdc-list-item');
const listItemRipple = [].map.call(listItemEl, el => new MDCRipple(el));

// Top App Bar
const topAppBarEl = document.querySelector('.mdc-top-app-bar');
const topAppBar = new MDCTopAppBar(topAppBarEl);

// Drawer
const breakpoint = 900;
const drawerEl = document.querySelector('.mdc-drawer');
const initModalDrawer = () => {
    const drawer = new MDCDrawer(drawerEl);
    drawer.open = false;

    topAppBar.setScrollTarget(mainEl);
    topAppBar.listen('MDCTopAppBar:nav', () => {
        drawer.open = !drawer.open;
    });
    
    document.querySelector('.css-top-app-bar__actions').style.display = 'none';
    document.querySelector('.mdc-top-app-bar__navigation-icon').style.display = 'inline';
    return drawer;
};
const initNoDrawer = () => {
    const dummy = document.createElement('div');
    document.querySelector('.css-top-app-bar__actions').style.display = 'inline';
    document.querySelector('.mdc-top-app-bar__navigation-icon').style.display = 'none';
    return dummy;
};

/* jshint laxbreak: true */
let drawer = window.innerWidth < breakpoint || isMobile ? initModalDrawer() : initNoDrawer();

// Handle window resize at 900px
function resizeHandler() {
    if (window.innerWidth < breakpoint || isMobile) {
        drawer = null;
        drawer = initModalDrawer();
    } else if ((window.innerWidth > breakpoint || !isMobile) && drawer instanceof MDCDrawer) {
        drawer.destroy();
        drawer = initNoDrawer();
    }
}
window.addEventListener('resize', resizeHandler);

setTimeout(() => (document.querySelector('#curtain').style.visibility = 'hidden'), 240);
