'use strict';

/**
 * Returns the Coverage Type based on the attributes from IDP
 * @returns {string} returns the type of category based on the coverage conditions
 */
function getViewCoverageType() {
    var viewCoverageType = 'default';
    var subSegment;
    var maType;
    var feeScheduleType;

    if (session.privacy.customerDetails) {
        var customerDetails = JSON.parse(session.privacy.customerDetails);
        subSegment = customerDetails.subsegment;
        maType = customerDetails.MA_Type;
        feeScheduleType = customerDetails.feeScheduleType;
        // benefits = customerDetails.benefits;
    }
    if (session.privacy.customerType === 'UHCVerified') {
        if (subSegment === 'MedSupp') {
            // design pending
            viewCoverageType = 'StaticUHC-1';
        }
        if (feeScheduleType) {
            if (feeScheduleType === 'Preferred' && maType && (maType === 'A' || maType === 'B')) {
                viewCoverageType = 'DynamicUHC-1';
            } else if (feeScheduleType === 'Complete') {
                viewCoverageType = 'DynamicUHC-2';
            }
        }
    }
    return viewCoverageType;
}

/**
 * Returns the Coverage Benifit Type based on the attributes from IDP
 * @returns {string} returns the type of category based on the coverage conditions
 */
function getViewCoverageBenifitType() {
    var viewCoverageBenifitType = 'otc-hearing-aids';
    var OTCDevicesCoverage;
    var OTCBenefitRemaining;
    if (session.privacy.customerDetails) {
        var customerDetails = JSON.parse(session.privacy.customerDetails);
        OTCDevicesCoverage = customerDetails.OTCDevicesCoverage;
        OTCBenefitRemaining = customerDetails.OTCBenefitRemaining;
    }
    if (OTCDevicesCoverage && OTCDevicesCoverage.toLowerCase() === 'yes' && OTCBenefitRemaining && OTCBenefitRemaining > 0.00) {
        viewCoverageBenifitType = 'otc-hearing-aids-coverage-included';
    }
    return viewCoverageBenifitType;
}

module.exports = {
    getViewCoverageType: getViewCoverageType,
    getViewCoverageBenifitType: getViewCoverageBenifitType
};
