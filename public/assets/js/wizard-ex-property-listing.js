/**
 *  Form Wizard
 */

'use strict';

(function () {
    // Init custom option check
    window.Helpers.initCustomOptionCheck();

    // Vertical Wizard
    // --------------------------------------------------------------------

    const wizardPropertyListing = document.querySelector('#wizard-property-listing');
    if (typeof wizardPropertyListing !== undefined && wizardPropertyListing !== null) {
        // Wizard form
        const wizardPropertyListingForm = wizardPropertyListing.querySelector('#wizard-property-listing-form');
        // Wizard steps
        const wizardPropertyListingFormStep1 = wizardPropertyListingForm.querySelector('#personal-details');
        const wizardPropertyListingFormStep2 = wizardPropertyListingForm.querySelector('#property-details');
        const wizardPropertyListingFormStep3 = wizardPropertyListingForm.querySelector('#property-features');
        const wizardPropertyListingFormStep4 = wizardPropertyListingForm.querySelector('#property-area');
        const wizardPropertyListingFormStep5 = wizardPropertyListingForm.querySelector('#price-details');
        // Wizard next prev button
        const wizardPropertyListingNext = [].slice.call(wizardPropertyListingForm.querySelectorAll('.btn-next'));
        const wizardPropertyListingPrev = [].slice.call(wizardPropertyListingForm.querySelectorAll('.btn-prev'));

        const validationStepper = new Stepper(wizardPropertyListing, {
            linear: true
        });

        wizardPropertyListingNext.forEach(item => {
            item.addEventListener('click', event => {
                // When click the Next button, we will validate the current step
                switch (validationStepper._currentIndex) {
                    case 0:
                        FormValidation1.validate();
                        break;

                    case 1:
                        FormValidation2.validate();
                        break;

                    case 2:
                        FormValidation3.validate();
                        break;

                    case 3:
                        FormValidation4.validate();
                        break;

                    case 4:
                        FormValidation5.validate();
                        break;

                    default:
                        break;
                }
            });
        });

        wizardPropertyListingPrev.forEach(item => {
            item.addEventListener('click', event => {
                switch (validationStepper._currentIndex) {
                    case 4:
                        validationStepper.previous();
                        break;

                    case 3:
                        validationStepper.previous();
                        break;

                    case 2:
                        validationStepper.previous();
                        break;

                    case 1:
                        validationStepper.previous();
                        break;

                    case 0:

                    default:
                        break;
                }
            });
        });
    }
})();
