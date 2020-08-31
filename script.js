/*Projet 1*/
const triggers = document.querySelectorAll('[aria-haspopup="c-dialog"]');
const doc = document.querySelector('.js-document');
const focusableElementsArray = [
    '[href]',
    'button:not([disabled])',
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    '[tabindex]:not([tabindex="-1"])',
];
const keyCodes = {
    tab: 9,
    enter: 13,
    escape: 27,
};

const open = function (dialog) {
    const focusableElements = dialog.querySelectorAll(focusableElementsArray);
    const firstFocusableElement = focusableElements[0];
    const lastFocusableElement = focusableElements[focusableElements. length - 1];

    dialog.setAttribute('aria-hidden', false);
    doc.setAttribute('aria-hidden', true);

    if (!firstFocusableElement) {
        return;
    }

    window.setTimeout(() => {
        firstFocusableElement.focus();

        focusableElements.forEach((focusableElement) => {
            if (focusableElement.addEventListener) {
                focusableElement.addEventListener('keydown', (event) => {
                    const tab = event.which === keyCodes.tab;

                    if (!tab) {
                        return;
                    }
if (event.shiftKey) { 
                    if (event.target === firstFocusableElement) {
                        event.preventDefault();

                        lastFocusableElement.focus();
                    }
                } else if (event.target === lastFocusableElement) {
                        event.preventDefault();

                        firstFocusableElement.focus();
                    }
                });
            }
        });
    }, 100);
};

const close = function (dialog, trigger) {
    dialog.setAttribute('aria-hidden', true);
    doc.setAttribute('aria-hidden', false);
    
    //focus
    trigger.focus();
};

triggers.forEach((trigger) => {
    const dialog = document.querySelector("."+trigger.getAttribute('aria-controls'));
    console.log(dialog);
    const dismissTriggers = dialog.querySelectorAll('[data-dismiss]');

    //ouverture dialog
    trigger.addEventListener('click',(event) => {
        event.preventDefault();

        open(dialog);
    });

    trigger.addEventListener('keydown', (event) => {
        if (event.which === keyCodes.enter) {
            event.preventDefault();

            open(dialog);
        }
    });

    //fermer dialog
    dialog.addEventListener('keydown', (event) => {
        if (event.wich === keyCodes.escape) { 
            close(dialog, trigger);
        }
    });
    console.log(dismissTriggers);
    dismissTriggers.forEach((dismissTrigger) => { 
        //const dismissDialog = document.querySelector(dismissTrigger.dataset.dismiss);
        
        dismissTrigger.addEventListener('click', (event) => {
            event.preventDefault();

            close(dialog, trigger);
        });
    });

    window.addEventListener('click', (event) => {
        if (event.target === dialog) {
            close(dialog, trigger);
        }
    });
});
