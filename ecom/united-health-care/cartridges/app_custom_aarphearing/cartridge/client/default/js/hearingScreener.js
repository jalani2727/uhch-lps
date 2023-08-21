var current_fs,
    next_fs,
    prev_fs; // fieldsets
var left,
    opacity,
    scale; // fieldset properties being animated
var animating; // flag to prevent quick multi-click glitches

const fieldsets = $('.screener-form-container fieldset');
const progressBar = $('.hearing-screener-progress-bar');

// variable for question 2 answer
let answer = "";

function updateProgressBar(currentField, upcoming) {
    // Grab data-attribute from expected fieldset and apply it as a class name to the progressBar
    if (progressBar.hasClass(currentField.get(0).dataset.questionStart)) {
        progressBar.removeClass(currentField.get(0).dataset.questionStart);
        progressBar.addClass(upcoming.get(0).dataset.questionStart);
    }
    if (progressBar.hasClass(currentField.get(0).dataset.questionFilled)) {
        progressBar.removeClass(currentField.get(0).dataset.questionFilled);
        progressBar.addClass(upcoming.get(0).dataset.questionStart);
    }
}

function navigateToResultsLp(question, answer) {
    // const resultsPage1 = 'https://bgxl-010.dx.commercecloud.salesforce.com/on/demandware.store/Sites-AARPHearing-Site/default/Screener-ResultsPage1';
    // const resultsPage2 = 'https://bgxl-010.dx.commercecloud.salesforce.com/on/demandware.store/Sites-AARPHearing-Site/default/Screener-ResultsPage2';
    // const resultsPage3 = 'https://bgxl-010.dx.commercecloud.salesforce.com/on/demandware.store/Sites-AARPHearing-Site/default/Screener-ResultsPage3';
    // const resultsPage4 = 'https://bgxl-010.dx.commercecloud.salesforce.com/on/demandware.store/Sites-AARPHearing-Site/default/Screener-ResultsPage4';

    const resultsPage1 = $('#screener-results').data('results-url-one');
    const resultsPage2 = $('#screener-results').data('results-url-two');
    const resultsPage3 = $('#screener-results').data('results-url-three');
    const resultsPage4 = $('#screener-results').data('results-url-four');

    let route = "";

    if (question === "screener-q4a" || question === "screener-q4b") {
        switch (answer) {
            case "q2a-1":
                route = resultsPage1;
                break;
            case "q2a-2":
                route = resultsPage3;
                break;
            case "q2a-3":
                route = resultsPage3;
                break;
            case "q2a-4":
                route = resultsPage3;
                break;
            default:
                break;
        }
    } else if (question === "screener-q4c") {
        switch (answer) {
            case "q2c-1":
                route = resultsPage4;
                break;
            case "q2c-2":
                route = resultsPage4;
                break;
            case "q2c-3":
                route = resultsPage3;
                break;
            default:
                break;
        }
    } else if (question === "screener-q4d") {
        switch (answer) {
            case "q2d-1":
                route = resultsPage4;
                break;
            case "q2d-2":
                route = resultsPage4;
                break;
            case "q2d-3":
                route = resultsPage4;
                break;
            default:
                break;
        }
    } else if (question === "screener-q4e") {
        switch (answer) {
            case "q2e-1":
                route = resultsPage2;
                break;
            case "q2e-2":
                route = resultsPage2;
                break;
            default:
                break;
        }
    }

    setTimeout(()=> {
        if (route !== "") window.location.href = route;
    }, 5000);
}

// Change current Progress Bar step when a radio button or checkbox is selected.
fieldsets.each(function (index, fs) {
    let fieldset = $(this);

    fieldset.find(':input').click(function () {
        progressBar.hasClass(fieldset.get(0).dataset.questionFilled) ? '' : progressBar.addClass(fieldset.get(0).dataset.questionFilled);

        // append the last selected question to the next button
        let next = fieldset.find('.next');
        next.data('next', this.id);

        // enable the next button
        next.removeClass('disabled');
    });
});

$('.next').click(function () {
    if (animating) return false;
    animating = true;

    // Get current fieldset
    current_fs = $(this).parent();

    // Get next fieldset
    next_data = $(this).data('next');
    next_results = current_fs.parent().find('#screener-results');
    fieldsets.each(function (index, fs) {
        let fieldset = $(this);
        let reqs = fieldset.data('req')?.reqs;
        
        if (reqs?.indexOf(next_data) > -1) {
            next_fs = fieldset;
        } else if (next_data?.indexOf("q2") > -1) {
            // snag the answer for question 2
            answer = next_data;
        } else if (next_data?.indexOf("q4") > -1) {
            // go to the results page
            next_fs = next_results;
        }
    });

    if (next_fs === next_results) {
        navigateToResultsLp(current_fs.get(0).id, answer);
    }

    // Append this question to the previous button
    let prev = next_fs.find('.previous');
    prev.data('prev', current_fs.get(0).id);

    // Logic to update Progress Bar Classes
    updateProgressBar(current_fs, next_fs);

    // Hide current fieldset
    current_fs.hide();

    // Update CSS on current fieldset
    current_fs.animate({
        opacity: 0
    }, {
        step: function (now, mx) {
            // as the opacity of current_fs reduces to 0 - stored in "now"
            // 1. scale current_fs down to 80%
            scale = 1.2 - (1 - now) * 0.2;
            // 2. bring next_fs from the right(50%)
            left = (now * 50) + '%';
            // 3. increase opacity of next_fs to 1 as it moves in
            opacity = 1 - now;
            current_fs.css({
                transform: 'scale(' + scale + ')'
            });
            next_fs.css({
                transform: 'scale(' + scale + ')',
                opacity: opacity
            });
            // show the next fieldset
            next_fs.show();
            // disable button next button on next_fs
            // next_fs.find('.next').addClass('disabled');
        },
        duration: 600,
        complete: function () {
            animating = false;
            // enable button next button on next_fs
            // setTimeout(()=> {
            //     next_fs.find('.next').removeClass('disabled');
            // }, 100);
        }
    });
});

$('.previous').click(function () {
    if (animating) return false;
    animating = true;

    current_fs = $(this).parent();

    // Get previous fieldset
    prev_data = $(this).data('prev');
    prev_fs = current_fs.parent().find('#' + prev_data);

    // enable the previous next button
    if (prev_fs.find(':input:checked').length > 0) {
        prev_fs.find('.next').removeClass('disabled');
    }

    updateProgressBar(current_fs, prev_fs);

    // show the previous fieldset
    prev_fs.show();

    // hide the current fieldset
    current_fs.animate({
        opacity: 0
    }, {
        step: function (now, mx) {
            // as the opacity of current_fs reduces to 0 - stored in "now"
            // 1. scale prev_fs from 80% to 100%
            scale = 0.8 + (1 - now) * 0.2;
            // 2. take current_fs to the right(50%) - from 0%
            left = ((1 - now) * 50) + '%';
            // 3. increase opacity of prev_fs to 1 as it moves in
            opacity = 1 - now;
            current_fs.css({
                // 'left': left
            });
            prev_fs.css({
                transform: 'scale(' + scale + ')',
                position: 'relative',
                opacity: opacity
            });
            current_fs.hide();
            // prev_fs.find('.next').addClass('disabled');
        },
        duration: 800,
        complete: function () {
            animating = false;
            // setTimeout(()=> {
            //     prev_fs.find('.next').removeClass('disabled');
            // }, 100);
        }
    });
});

$('.submit').click(function () {
    return false;
});

// Accordion Functionality
$(document).on('click', 'button.accordion-title', function () {
    var arrow = $(this).find('img.down-arrow');

    if (arrow.hasClass('opened')) {
        arrow.removeClass('opened');
        $(this).siblings('.list-container').removeClass('show');
    } else {
        arrow.addClass('opened');
        $(this).siblings('.list-container').addClass('show');
    }
});

// Tech, Choice, Support Mobile
$(document).on('click', '.white-card-mobile .white-card', function (e) {
    var cardID = $(this).data('tab');
    var card = $('#' + cardID);

    if ($(this).hasClass('show')) {
        e.preventDefault();
    }

    if ($(this).siblings()) {
        $(this).siblings().removeClass('show');
        card.siblings().removeClass('show');
    }

    $(this).addClass('show');
    card.addClass('show');
});

// Audio
var playing = false;
$(document).on('click', 'a.play-button', function (e) {
    var soundEffect = $(this).find('.myAudio');

    if (playing == false) {
        $(this).closest('.simulation').addClass('playing');
        $(this).addClass('playing');
        soundEffect[0].play();
        playing = true;
    } else {
        $(this).closest('.simulation').removeClass('playing');
        $(this).removeClass('playing');
        soundEffect[0].pause();
        soundEffect[0].currentTime = 0;
        playing = false;
    }
});
