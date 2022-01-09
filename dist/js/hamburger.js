function init ()
{
    const menu = document.querySelector(".promo__icons"),
    menuItem = document.querySelectorAll(".menu_item"),
    hamburger = document.querySelector('.hamburger');

    console.log( '1' );

    hamburger.addEventListener('click', () => {
        console.log( '2' );
        hamburger.classList.toggle('hamburger_active');
        console.log( '2.1' );
        menu.classList.toggle('promo__icons_active');
    });

    menuItem.forEach(item => {
        item.addEventListener('click', () => {
            hamburger.classList.toggle('hamburger_active');
            menu.classList.toggle('menu_active');
        });
    });
}

if( document.readyState !== 'loading' ) {
    console.log( 'document is already ready, just execute code here' );
    init();
} else {
    document.addEventListener('DOMContentLoaded', function () {
        console.log( 'document was not ready, place code here' );
        init();
    });
}