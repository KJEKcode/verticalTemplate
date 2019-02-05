// -- VARIABLES --

const getWindowWidth = () => {
    return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
}

const getSitewideHeader = () => {
    return document.getElementById('sitewide-header');
}

const getHeaderAnchor = () => {
    return getSitewideHeader().getElementsByTagName('a');
}

const getHeaderButton = () => {
    return getSitewideHeader().getElementsByTagName('button');
}

const getToggledNavigation = () => {
    return document.getElementById('toggled-navigation');
}

const getSubMenu = () => {
    return getToggledNavigation().getElementsByTagName('ul');
}

const getDropdownButton = () => {
    return getToggledNavigation().getElementsByTagName('button');
}

const getNavigationContainer = () => {
    return document.getElementById('navigation-container');
}

const getAllNavMenu = () => {
    return getNavigationContainer().getElementsByTagName('ul');
}

const getTopButton = () => {
    return document.getElementById('top-button');
}

// -- EVENT LISTENERS --

window.addEventListener('resize', debounce(checkAria), 75);

window.addEventListener('scroll', debounce(backToTop), 75);

for (var i = getHeaderAnchor().length - 1; i >= 0; i--) {
    getHeaderAnchor()[i].addEventListener('click', anchorClick);
}

for (var i = getHeaderButton().length - 1; i >= 0; i--) {
    getHeaderButton()[i].addEventListener('click', buttonClick);
}

// -- REUSABLE FUNCTIONS --


// -- CLOSE NAVIGATION --

const closeNavigation = () => {
    getToggledNavigation().setAttribute('aria-hidden', 'true');
    for (var i = getSubMenu().length - 1; i >= 0; i--) {
        getSubMenu()[i].setAttribute('aria-hidden', 'true');
    }
    for (var i = getHeaderButton().length - 1; i >= 0; i--) {
        getHeaderButton()[i].setAttribute('aria-expanded', 'false');
    }
}

// -- TOGGLE TARGET MENU --

const toggleTargetMenu = (target) => {
    let ariaControls = target.getAttribute('aria-controls'),
    controlledAria = document.getElementById(ariaControls),
    ariaHidden = controlledAria.getAttribute('aria-hidden');
    if (ariaHidden == 'true') {
        controlledAria.setAttribute('aria-hidden', 'false');
        target.setAttribute('aria-expanded', 'true');
    } else {
        controlledAria.setAttribute('aria-hidden', 'true');
        target.setAttribute('aria-expanded', 'false');
    }
}

// -- ANCHOR CLICK --

function anchorClick() {
    closeNavigation();    
}

// -- BUTTON CLICK --

function buttonClick({ target }) {
    toggleTargetMenu(target);
}

function checkAria() {
    if (getWindowWidth() < 768) {
        for (var i = getAllNavMenu().length - 1; i >= 0; i--) {
            getAllNavMenu()[i].setAttribute('aria-hidden', 'true');
        }
        for (var i = getHeaderButton().length - 1; i >= 0; i--) {
            getHeaderButton()[i].setAttribute('aria-expanded', 'false');
        }
    } 
}

function backToTop() {
    if (document.documentElement.scrollTop > window.innerHeight) {
        getTopButton().classList.add('show');
    } else {
        getTopButton().classList.remove('show');
    }
}

function debounce(func, wait, immediate) {
    var timeout;
    return function() {
        var context = this,
            args = arguments;
        var later = function() {
            timeout = null;
            if ( !immediate ) {
                func.apply(context, args);
            }
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait || 100);
        if ( callNow ) { 
            func.apply(context, args);
        }
    };
};

// function loadControls() {
//     var sitewideHeader = document.getElementById('sitewide-header'),
//     widthOfWindow = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
//     headerAnchors = sitewideHeader.getElementsByTagName('a'),
//     headerButtons = sitewideHeader.getElementsByTagName('button'),
//     menuButton = document.getElementById('menu-button'),
//     mainNavigation = document.getElementById('toggled-navigation');
//     for (var i = headerAnchors.length - 1; i >= 0; i--) {
//         headerAnchors[i].addEventListener('click', anchorClick);
//     }
//     for (var i = headerButtons.length - 1; i >= 0; i--) {
//         headerButtons[i].addEventListener('click', buttonClick);
//     }
//     window.addEventListener('resize', debounce(checkAria, 100));
//     window.addEventListener('scroll', debounce(backToTop, 100));
// }

// function anchorClick() {
//     var sitewideHeader = document.getElementById('sitewide-header'),
//     widthOfWindow = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
//     mainNavigation = document.getElementById('toggled-navigation'),
//     subMenus = mainNavigation.getElementsByTagName('ul'),
//     dropdownButtons = mainNavigation.getElementsByTagName('button'),
//     headerButtons = sitewideHeader.getElementsByTagName('button');
//     mainNavigation.setAttribute('aria-hidden', 'true');
//     for (var i = subMenus.length - 1; i >= 0; i--) {
//         subMenus[i].setAttribute('aria-hidden', 'true');
//     }
//     for (var i = headerButtons.length - 1; i >= 0; i--) {
//         headerButtons[i].setAttribute('aria-expanded', 'false');
//     }
// }

// function buttonClick(e) {
//     var clickTarget = e.target,
//     widthOfWindow = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
//     ariaControls = clickTarget.getAttribute('aria-controls'),
//     controlledAria = document.getElementById(ariaControls),
//     ariaHidden = controlledAria.getAttribute('aria-hidden');
//     if (ariaHidden == 'true') {
//         controlledAria.setAttribute('aria-hidden', 'false');
//         clickTarget.setAttribute('aria-expanded', 'true');
//     } else {
//         controlledAria.setAttribute('aria-hidden', 'true');
//         clickTarget.setAttribute('aria-expanded', 'false');
//     }
// }

// function checkAria() {
//     var widthOfWindow = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
//     sitewideHeader = document.getElementById('sitewide-header'),
//     navigationContainer = document.getElementById('navigation-container'),
//     mainNavigation = document.getElementById('toggled-navigation'),
//     headerButtons = sitewideHeader.getElementsByTagName('button'),
//     navigationMenus = navigationContainer.getElementsByTagName('ul'),
//     dropdownButtons = mainNavigation.getElementsByTagName('button'),
//     subMenus = mainNavigation.getElementsByTagName('ul');
//     if (widthOfWindow < 768) {
//         for (var i = navigationMenus.length - 1; i >= 0; i--) {
//             navigationMenus[i].setAttribute('aria-hidden', 'true');
//         }
//         for (var i = headerButtons.length - 1; i >= 0; i--) {
//             headerButtons[i].setAttribute('aria-expanded', 'false');
//         }
//     } 
// }

// function backToTop() {
//     var topButton = document.getElementById('top-button');
//     if (document.documentElement.scrollTop > window.innerHeight) {
//         topButton.classList.add('show');
//     } else {
//         topButton.classList.remove('show');
//     }
// }

// function debounce(func, wait, immediate) {
//     var timeout;
//     return function() {
//         var context = this,
//             args = arguments;
//         var later = function() {
//             timeout = null;
//             if ( !immediate ) {
//                 func.apply(context, args);
//             }
//         };
//         var callNow = immediate && !timeout;
//         clearTimeout(timeout);
//         timeout = setTimeout(later, wait || 200);
//         if ( callNow ) { 
//             func.apply(context, args);
//         }
//     };
// };

// window.onload = loadControls;

