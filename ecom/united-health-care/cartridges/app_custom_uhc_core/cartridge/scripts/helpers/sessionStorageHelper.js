'use strict';

/**
 * helper for setting Customer detail In Session
 * @param {Object} responseObj - Object
 */
function setCustomerdetailInSessionLogin(responseObj) {
    if (!empty(responseObj.dob)) {
        session.privacy.profilebirthdate = new Date(responseObj.dob);
    }
    if (!empty(responseObj.AARP_Subscriber_ID)) {
        session.privacy.AARPSubscriberId = responseObj.AARP_Subscriber_ID;
    }
    if (!empty(responseObj.subscriber_id)) {
        session.privacy.subscriberId = responseObj.subscriber_id;
    }
    if (!empty(responseObj.AARP_Member)) {
        session.privacy.AARP_Member = responseObj.AARP_Member;
    }
    if (!empty(responseObj.sfdcContactId)) {
        session.privacy.sfdcContactId = responseObj.sfdcContactId;
    }
    if (!empty(responseObj.Pricebook_Id)) {
        session.privacy.pricebook = responseObj.Pricebook_Id;
    }
    if (!empty(responseObj.Opportunity_Id)) {
        session.privacy.opportunityId = responseObj.Opportunity_Id;
    }
    if (!empty(responseObj.communication_Instruction)) {
        session.privacy.communicationInstruction = responseObj.communication_Instruction;
    }

    if (!empty(responseObj.OTCBenefitRemaining)) {
        session.privacy.OTCBenefitRemaining = responseObj.OTCBenefitRemaining;
    }

    if (!empty(responseObj.healthPlanName)) {
        session.privacy.healthPlanName = responseObj.healthPlanName;
    }

    if (!empty(responseObj.NewPurchasePossible) && responseObj.NewPurchasePossible.equalsIgnoreCase('yes')) {
        session.privacy.NewPurchasePossible = true;
    } else {
        session.privacy.NewPurchasePossible = false;
    }

    if (!empty(responseObj.OTCDevicesCoverage) && responseObj.OTCDevicesCoverage.equalsIgnoreCase('yes')) {
        session.privacy.OTCDevicesCoverage = true;
    } else {
        session.privacy.OTCDevicesCoverage = false;
    }

    if (session.privacy.OTCDevicesCoverage && session.privacy.NewPurchasePossible) {
        session.privacy.OTCBenefitApplicable = true;
    } else {
        session.privacy.OTCBenefitApplicable = false;
    }

    session.privacy.hasReturns = responseObj.hasReturns;

    session.privacy.benefit_max = responseObj.benefit_max;

    // check if customer already used benefits in past
    if (session.privacy.OTCBenefitApplicable) {
        var cartHelper = require('*/cartridge/scripts/cart/cartHelpers');
        var isBenefitApplicable = cartHelper.isBenefitApplicable();
    }
}

/**
 * helper for setting Customer detail In Session
 * @param {req} req - Object
 */
function setCustomerType(req) {
    if (session.privacy.subscriberId !== null && session.privacy.opportunityId && session.privacy.opportunityId !== null && session.privacy.pricebook != null) {
        req.session.privacyCache.set('customerType', 'UHCVerified');
    } else if (session.privacy.subscriberId !== null && session.privacy.subscriberId !== '') {
        req.session.privacyCache.set('customerType', 'UHCNotVerified');
    } else {
        req.session.privacyCache.set('customerType', 'UHCNoData');
    }
}

module.exports = {
    setCustomerdetailInSessionLogin: setCustomerdetailInSessionLogin,
    setCustomerType: setCustomerType
};
