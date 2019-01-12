function loadControls() {
    var sitewideHeader = document.getElementById('sitewide-header'),
    menuButton = document.getElementById('menu-button'),
    mainNavigation = document.getElementById('toggled-navigation'),
    widthOfWindow = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    /* on load if the window width is less than 768 ensure the aria attribute set correctly */
    if (widthOfWindow > 768) {
        /* set menu button aria expanded to true */
        menuButton.setAttribute('aria-expanded', 'true');
        /* set main navigation aria hidden to false */
        mainNavigation.setAttribute('aria-hidden', 'false');
    }
    /* add a click event listener to the entire header */ 
    sitewideHeader.addEventListener('click', controlClick);
    window.addEventListener('resize', debounce(checkAria, 100, true));
}

function controlClick(e) {
    var widthOfWindow = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
    clickTarget = e.target,
    sitewideHeader = document.getElementById('sitewide-header'), 
    mainNavigation = document.getElementById('toggled-navigation'),
    subMenus = mainNavigation.getElementsByTagName('ul'),
    dropdownButtons = mainNavigation.getElementsByTagName('button'),
    headerButtons = sitewideHeader.getElementsByTagName('button');
    /* if the clicked target is a button */
    if (clickTarget && clickTarget.nodeName == "BUTTON") {
        var ariaControls = clickTarget.getAttribute('aria-controls'),
        controlledAria = document.getElementById(ariaControls),
        ariaHidden = controlledAria.getAttribute('aria-hidden');
        if (ariaHidden == 'true') {
            controlledAria.setAttribute('aria-hidden', 'false');
            clickTarget.setAttribute('aria-expanded', 'true');
        } else {
            controlledAria.setAttribute('aria-hidden', 'true');
            clickTarget.setAttribute('aria-expanded', 'false');
        }
    }
    /* if the clicked target is an a tag */
    if (clickTarget && clickTarget.nodeName == "A") {
        /* if the window is less than 768px wide */
        if (widthOfWindow < 768) {
            mainNavigation.setAttribute('aria-hidden', 'true');
            /* close all submenus */
            for (var i = subMenus.length - 1; i >= 0; i--) {
                subMenus[i].setAttribute('aria-hidden', 'true');
            }
            /* set all header buttons aria expanded attributes to false */
            for (var i = headerButtons.length - 1; i >= 0; i--) {
                headerButtons[i].setAttribute('aria-expanded', 'false');
            }
        } 
        /* if the window is greater than 768px wide */
        else {
            /* close all submenus */
            for (var i = subMenus.length - 1; i >= 0; i--) {
                subMenus[i].setAttribute('aria-hidden', 'true');
            }
            /* set all header buttons aria expanded attributes to false */
            for (var i = dropdownButtons.length - 1; i >= 0; i--) {
                dropdownButtons[i].setAttribute('aria-expanded', 'false');
            }
        }  
    }
}

function checkAria() {
    var widthOfWindow = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
    sitewideHeader = document.getElementById('sitewide-header'),
    navigationContainer = document.getElementById('navigation-container'),
    mainNavigation = document.getElementById('toggled-navigation'),
    headerButtons = sitewideHeader.getElementsByTagName('button'),
    navigationMenus = navigationContainer.getElementsByTagName('ul'),
    dropdownButtons = mainNavigation.getElementsByTagName('button'),
    subMenus = mainNavigation.getElementsByTagName('ul');
    if (widthOfWindow < 768) {
        for (var i = navigationMenus.length - 1; i >= 0; i--) {
            navigationMenus[i].setAttribute('aria-hidden', 'true');
        }
        for (var i = headerButtons.length - 1; i >= 0; i--) {
            headerButtons[i].setAttribute('aria-expanded', 'false');
        }
    } else {
        for (var i = subMenus.length - 1; i >= 0; i--) {
            subMenus[i].setAttribute('aria-hidden', 'true');
        }
        for (var i = dropdownButtons.length - 1; i >= 0; i--) {
            dropdownButtons[i].setAttribute('aria-expanded', 'false');
        }
    }   
}

debounce = function(func, wait, immediate) {
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
        timeout = setTimeout(later, wait || 200);
        if ( callNow ) { 
            func.apply(context, args);
        }
    };
};


window.onload = loadControls;