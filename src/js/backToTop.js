function backToTop() {
    console.log('hello');
    var topButton = document.getElementById('top-button');
    var sitewideFooter = document.getElementById('sitewide-footer');
    if (document.documentElement.scrollTop > window.innerHeight) {
        topButton.classList.add('show');
    } else {
         topButton.classList.remove('show');
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

window.addEventListener('scroll', debounce(backToTop, 200))

