'use strict';
var base = module.superModule;

var utilHelpers = require('*/cartridge/scripts/helpers/utilHelpers');

/**
 * add benefitAmount to product line item
 * @param {Array} OrderItemSummaries - the current line item container
 * information
 * @returns {Object} an object of price adjustments
 */
function getProductLevelDiscounts(OrderItemSummaries) {
    var benefitAmount = 0;
    if (OrderItemSummaries.records.length > 0) {
        for (var i = 0; i < OrderItemSummaries.records.length; i++) {
            benefitAmount += OrderItemSummaries.records[i].UnitPrice;
        }
    }
    return Math.abs(benefitAmount);
}

/**
 * Create a SOM totals model
 * @constructor
 * @classdesc class that represents a total object
 *
 * @param  {Object} somApiOrderSummary - OrderSummaryObject from SOM API in JSON format
 * @param {string} currencyCode - currency code of the order
 */
function SomTotals(somApiOrderSummary, currencyCode) {
    base.call(this, somApiOrderSummary, currencyCode);

    if (somApiOrderSummary && somApiOrderSummary.OrderItemSummaries) {
        if (somApiOrderSummary.Status === 'Canceled') {
            var originalOrder = somApiOrderSummary.OriginalOrder;
            // subTotal is the amount exclude tax and shipping cost
            this.subTotal = originalOrder ? utilHelpers.formatMoney(getProductLevelDiscounts(somApiOrderSummary.OrderItemSummaries), currencyCode) : utilHelpers.formatMoney(somApiOrderSummary.TotalAdjustedProductAmount, currencyCode);
        } else {
            // subTotal is the amount exclude tax and shipping cost
            this.subTotal = utilHelpers.formatMoney(getProductLevelDiscounts(somApiOrderSummary.OrderItemSummaries), currencyCode);
        }
    }

    var totalQty = 0;
    var benefitAmount = 0;
    somApiOrderSummary.OrderItemSummaries.records.forEach(function (orderItemSummary) {
        var originalOrder = orderItemSummary.OriginalOrderItem;
        if (somApiOrderSummary.Status === 'Canceled') {
            totalQty += parseInt(originalOrder.Quantity, 10);
            benefitAmount += parseInt(orderItemSummary.TotalLineAdjustmentAmtWithTax, 10);
        } else {
            totalQty += parseInt(orderItemSummary.Quantity, 10);
            benefitAmount += parseInt(orderItemSummary.TotalLineAdjustmentAmtWithTax, 10);
        }

    });
    this.totalQuantity = totalQty;
    this.benefitAmount = utilHelpers.formatMoney(Math.abs(benefitAmount), currencyCode);
}

module.exports = SomTotals;
