import checkMobile from "./checkMobile";
import { MDCDrawer } from "@material/drawer";
import { MDCTopAppBar } from "@material/top-app-bar";

/// Instatiation
// Check user agent for mobile
const isMobile = checkMobile;

// Content
const mainEl = document.querySelector(".main-content");

// Top App Bar
const topAppBarEl = document.querySelector(".mdc-top-app-bar");
const topAppBar = new MDCTopAppBar(topAppBarEl);

// Drawer
const breakpoint = 900;
const drawerEl = document.querySelector(".mdc-drawer");
const initModalDrawer = () => {
  const drawer = new MDCDrawer(drawerEl);
  drawer.open = false;

  topAppBar.setScrollTarget(mainEl);
  topAppBar.listen("MDCTopAppBar:nav", () => {
    drawer.open = !drawer.open;
  });

  document.querySelector(".mdc-top-app-bar__navigation-icon").style.display =
    "inline";
  return drawer;
};
const initNoDrawer = () => {
  const dummy = document.createElement("div");
  document.querySelector(".mdc-top-app-bar__navigation-icon").style.display = "none";
  return dummy;
};

/* jshint laxbreak: true */
let drawer =
  window.innerWidth < breakpoint || isMobile
    ? initModalDrawer()
    : initNoDrawer();

// Handle window resize at 900px
function resizeHandler() {
  if (window.innerWidth < breakpoint || isMobile) {
    drawer = null;
    drawer = initModalDrawer();
  } else if (
    (window.innerWidth > breakpoint || !isMobile) &&
    drawer instanceof MDCDrawer
  ) {
    drawer.destroy();
    drawer = initNoDrawer();
  }
}
window.addEventListener("resize", resizeHandler);

console.log("Mobile detected: " + checkMobile);
setTimeout(
  () => (document.querySelector("#curtain").style.visibility = "hidden"),
  240
);
