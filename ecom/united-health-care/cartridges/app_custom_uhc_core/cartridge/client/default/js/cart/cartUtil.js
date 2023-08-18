<<<<<<< HEAD
'use strict';

var otcBenefitStatusValues = {
    BENEFIT_VERIFIED_ONLY: 'benefitVerifiedOnly',
    BENEFIT_APPLIED: 'benefitApplied',
    BENEFIT_NOT_AVAILABLE: 'benefitNotAvailable',
    ELIGIBILITY_IN_PROGRESS: 'eligibilityInProgress',
    ELIGIBILITY_NOT_AVAILABLE: 'eligibilityNotAvailable',
    BENEFIT_APPLIED_DM: 'benefitApplied_DM',
    BENEFIT_APPLIED_DNM: 'benefitApplied_DNM'
};

/**
 * Display OTC benefit application message
 * @param {string} otcBenefitStatus - holds the OTC Benefit Status
 */
function showOTCBenefitMsg(otcBenefitStatus) {
    // Display different messages according to OTC Benefit application status
    switch (otcBenefitStatus) {
        case otcBenefitStatusValues.BENEFIT_APPLIED:
            $('.benefit-applied-msg-dnm, .benefit-applied-msg-dm, .benefit-not-available-msg, .eligibility-in-progress-msg, .eligibility-not-available-msg').addClass('d-none');
            $('.benefit-applied-msg').removeClass('d-none');
            break;
        case otcBenefitStatusValues.BENEFIT_APPLIED_DM:
            $('.benefit-applied-msg-dnm, .benefit-applied-msg, .benefit-not-available-msg, .eligibility-in-progress-msg, .eligibility-not-available-msg').addClass('d-none');
            $('.benefit-applied-msg-dm').removeClass('d-none');
            break;
        case otcBenefitStatusValues.BENEFIT_APPLIED_DNM:
            $('.benefit-applied-msg-dm .benefit-applied-msg .benefit-not-available-msg, .eligibility-in-progress-msg, .eligibility-not-available-msg').addClass('d-none');
            $('.benefit-applied-msg-dnm').removeClass('d-none');
            break;
        case otcBenefitStatusValues.BENEFIT_NOT_AVAILABLE:
            $('.benefit-applied-msg-dnm, .benefit-applied-msg, .eligibility-in-progress-msg, .eligibility-not-available-msg').addClass('d-none');
            $('.benefit-not-available-msg').removeClass('d-none');
            break;
        case otcBenefitStatusValues.ELIGIBILITY_IN_PROGRESS:
            $('.benefit-applied-msg-dnm, .benefit-applied-msg-dm, .benefit-applied-msg, .benefit-not-available-msg, .eligibility-not-available-msg').addClass('d-none');
            $('.eligibility-in-progress-msg').removeClass('d-none');
            break;
        case otcBenefitStatusValues.ELIGIBILITY_NOT_AVAILABLE:
            $('.benefit-applied-msg-dnm, .benefit-applied-msg-dm, .benefit-applied-msg, .benefit-not-available-msg, .eligibility-in-progress-msg').addClass('d-none');
            $('.eligibility-not-available-msg').removeClass('d-none');
            break;
        default:
            $('.eligibility-not-available-msg , .benefit-applied-msg-dnm, .benefit-applied-msg-dm, .benefit-applied-msg, .benefit-not-available-msg, .eligibility-in-progress-msg').addClass('d-none');
            return;
    }
}

var exportedObjects = { showOTCBenefitMsg };

module.exports = exportedObjects;
=======
'use strict';

var otcBenefitStatusValues = {
    BENEFIT_VERIFIED_ONLY: 'benefitVerifiedOnly',
    BENEFIT_APPLIED: 'benefitApplied',
    BENEFIT_NOT_AVAILABLE: 'benefitNotAvailable',
    ELIGIBILITY_IN_PROGRESS: 'eligibilityInProgress',
    ELIGIBILITY_NOT_AVAILABLE: 'eligibilityNotAvailable'
};

/**
 * Display OTC benefit application message
 * @param {string} otcBenefitStatus - holds the OTC Benefit Status
 */
function showOTCBenefitMsg(otcBenefitStatus) {
    // Display different messages according to OTC Benefit application status
    switch (otcBenefitStatus) {
        case otcBenefitStatusValues.BENEFIT_APPLIED:
            $('.benefit-not-available-msg, .eligibility-in-progress-msg, .eligibility-not-available-msg').addClass('d-none');
            $('.benefit-applied-msg').removeClass('d-none');
            break;
        case otcBenefitStatusValues.BENEFIT_NOT_AVAILABLE:
            $('.benefit-applied-msg, .eligibility-in-progress-msg, .eligibility-not-available-msg').addClass('d-none');
            $('.benefit-not-available-msg').removeClass('d-none');
            break;
        case otcBenefitStatusValues.ELIGIBILITY_IN_PROGRESS:
            $('.benefit-applied-msg, .benefit-not-available-msg, .eligibility-not-available-msg').addClass('d-none');
            $('.eligibility-in-progress-msg').removeClass('d-none');
            break;
        case otcBenefitStatusValues.ELIGIBILITY_NOT_AVAILABLE:
            $('.benefit-applied-msg, .benefit-not-available-msg, .eligibility-in-progress-msg').addClass('d-none');
            $('.eligibility-not-available-msg').removeClass('d-none');
            break;
        default:
            $('.benefit-applied-msg, .benefit-not-available-msg, .eligibility-in-progress-msg, .eligibility-not-available-msg').addClass('d-none');
            return;
    }
}

var exportedObjects = { showOTCBenefitMsg };

module.exports = exportedObjects;
>>>>>>> 30b30ede8e6eef942643cb8fb5192de1d1c11bc9
