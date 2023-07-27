/* eslint-disable */
'use strict';

/** @module calculate */
/**
 * This javascript file implements methods (via Common.js exports) that are needed by
 * the new (smaller) CalculateCart.ds script file.  This allows OCAPI calls to reference
 * these tools via the OCAPI 'hook' mechanism
 */

var HashMap = require('dw/util/HashMap');
var PromotionMgr = require('dw/campaign/PromotionMgr');
var ShippingMgr = require('dw/order/ShippingMgr');
var ShippingLocation = require('dw/order/ShippingLocation');
var TaxMgr = require('dw/order/TaxMgr');
var Logger = require('dw/system/Logger');
var Status = require('dw/system/Status');
var HookMgr = require('dw/system/HookMgr');
var collections = require('*/cartridge/scripts/util/collections');

/**
 * @function calculate
 *
 * calculate is the arching logic for computing the value of a basket.  It makes
 * calls into cart/calculate.js and enables both SG and OCAPI applications to share
 * the same cart calculation logic.
 *
 * @param {object} basket The basket to be calculated
 */
exports.calculate = function (basket) {
    // ===================================================
    // =====   CALCULATE PRODUCT LINE ITEM PRICES    =====
    // ===================================================

    calculateProductPrices(basket);

    // ===================================================
    // =====    CALCULATE GIFT CERTIFICATE PRICES    =====
    // ===================================================

    calculateGiftCertificatePrices(basket);

    // ===================================================
    // =====   Note: Promotions must be applied      =====
    // =====   after the tax calculation for         =====
    // =====   storefronts based on GROSS prices     =====
    // ===================================================

    // ===================================================
    // =====   APPLY PROMOTION DISCOUNTS			 =====
    // =====   Apply product and order promotions.   =====
    // =====   Must be done before shipping 		 =====
    // =====   calculation. 					     =====
    // ===================================================

    PromotionMgr.applyDiscounts(basket);

    // ===================================================
    // =====        CALCULATE SHIPPING COSTS         =====
    // ===================================================

    // apply product specific shipping costs
    // and calculate total shipping costs
    HookMgr.callHook('dw.order.calculateShipping', 'calculateShipping', basket);

    // ===================================================
    // =====   APPLY PROMOTION DISCOUNTS			 =====
    // =====   Apply product and order and 			 =====
    // =====   shipping promotions.                  =====
    // ===================================================

    PromotionMgr.applyDiscounts(basket);

    // since we might have bonus product line items, we need to
    // reset product prices
    calculateProductPrices(basket);

    // ===================================================
    // =====         CALCULATE TAX                   =====
    // ===================================================

    HookMgr.callHook('dw.order.calculateTax', 'calculateTax', basket);

    // ===================================================
    // =====         CALCULATE BASKET TOTALS         =====
    // ===================================================

    basket.updateTotals();

    // ===================================================
    // =====            DONE                         =====
    // ===================================================

    return new Status(Status.OK);
};

/**
 * @function calculateProductPrices
 *
 * Calculates product prices based on line item quantities. Set calculates prices
 * on the product line items.  This updates the basket and returns nothing
 *
 * @param {object} basket The basket containing the elements to be computed
 */
function calculateProductPrices (basket) {
    // get total quantities for all products contained in the basket
    var productQuantities = basket.getProductQuantities();
    var productQuantitiesIt = productQuantities.keySet().iterator();

    // get product prices for the accumulated product quantities
    var productPrices = new HashMap();

    while (productQuantitiesIt.hasNext()) {
        var prod = productQuantitiesIt.next();
        var quantity = productQuantities.get(prod);
        if (session.privacy.pricebook && session.privacy.pricebook !== null) {
            var pricebookID = session.privacy.pricebook;
            var priceBookPrice = prod.getPriceModel().getPriceBookPriceInfo(pricebookID, quantity) ? prod.getPriceModel().getPriceBookPriceInfo(pricebookID, quantity).getPrice() : prod.priceModel.getPrice(quantity);
            productPrices.put(prod, priceBookPrice);
        } else {
            productPrices.put(prod, prod.priceModel.getPrice(quantity));
        }
    }

    // iterate all product line items of the basket and set prices
    var productLineItems = basket.getAllProductLineItems().iterator();
    while (productLineItems.hasNext()) {
        var productLineItem = productLineItems.next();

        // handle non-catalog products
        if (!productLineItem.catalogProduct) {
            productLineItem.setPriceValue(productLineItem.basePrice.valueOrNull);
            continue;
        }

        var product = productLineItem.product;

        // handle option line items
        if (productLineItem.optionProductLineItem) {
            // for bonus option line items, we do not update the price
            // the price is set to 0.0 by the promotion engine
            if (!productLineItem.bonusProductLineItem) {
                productLineItem.updateOptionPrice();
            }
        // handle bundle line items, but only if they're not a bonus
        } else if (productLineItem.bundledProductLineItem) {
            // no price is set for bundled product line items
        // handle bonus line items
        // the promotion engine set the price of a bonus product to 0.0
        // we update this price here to the actual product price just to
        // provide the total customer savings in the storefront
        // we have to update the product price as well as the bonus adjustment
        } else if (productLineItem.bonusProductLineItem && product !== null) {
            var price = product.priceModel.price;
            var adjustedPrice = productLineItem.adjustedPrice;
            productLineItem.setPriceValue(price.valueOrNull);
            // get the product quantity
            var quantity2 = productLineItem.quantity;
            // we assume that a bonus line item has only one price adjustment
            var adjustments = productLineItem.priceAdjustments;
            if (!adjustments.isEmpty()) {
                var adjustment = adjustments.iterator().next();
                var adjustmentPrice = price.multiply(quantity2.value).multiply(-1.0).add(adjustedPrice);
                adjustment.setPriceValue(adjustmentPrice.valueOrNull);
            }

        // set the product price. Updates the 'basePrice' of the product line item,
        // and either the 'netPrice' or the 'grossPrice' based on the current taxation
        // policy

        // handle product line items unrelated to product
        } else if (product === null) {
            productLineItem.setPriceValue(null);
        // handle normal product line items
        } else {
            // checkOTCBenefit();
            // var priceAdjustment = productLineItem.getPriceAdjustmentByPromotionID('BenefitCover');
            // if (isBenefitApplicable() && !manualPriceAdjustmentApplied && !priceAdjustment && session.privacy.customerDetails) {
            //     var customerDetails = JSON.parse(session.privacy.customerDetails);
            //     var OTCBenefitRemaining = Number(customerDetails.OTCBenefitRemaining);
            //     var createdPriceAdjustment = productLineItem.createPriceAdjustment('BenefitCover', new dw.campaign.AmountDiscount(OTCBenefitRemaining));
            //     createdPriceAdjustment.setManual(true);
            //     manualPriceAdjustmentApplied = true;
            // } else {
            //     manualPriceAdjustmentApplied = true;
            // }
            productLineItem.setPriceValue(productPrices.get(product).valueOrNull);
        }
    }
}

function isBenefitApplicable() {
    var Calendar = require('dw/util/Calendar');
    var today = new Calendar();
    today.add(Calendar.DATE, -2);
    var ordertime = today.time;
    var isBenefitApplicable = true;
    var orderHistory = customer.getOrderHistory();
    var customerOrders = orderHistory.getOrders(
        'creationDate > {0}',
        'creationDate desc',
        ordertime
    );

    if (customerOrders.count > 0) {
        while (customerOrders.hasNext()) {
            var customerOrder = customerOrders.next();
            if ('isBenefitApplicable' in customerOrder.custom && customerOrder.custom.isBenefitApplicable) {
                isBenefitApplicable = false;
                return isBenefitApplicable;
            }
        }
    }
    return isBenefitApplicable;
}

function checkOTCBenefit(){
    if (session.privacy.OTCBenefitRemaining > 0){
    }
}
/**
 * @function calculateGiftCertificates
 *
 * Function sets either the net or gross price attribute of all gift certificate
 * line items of the basket by using the gift certificate base price. It updates the basket in place.
 *
 * @param {object} basket The basket containing the gift certificates
 */
function calculateGiftCertificatePrices (basket) {
    var giftCertificates = basket.getGiftCertificateLineItems().iterator();
    while (giftCertificates.hasNext()) {
        var giftCertificate = giftCertificates.next();
        giftCertificate.setPriceValue(giftCertificate.basePrice.valueOrNull);
    }
}
