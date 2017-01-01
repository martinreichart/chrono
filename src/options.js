var parser = require('./parsers/parser');
var refiner = require('./refiners/refiner');

function baseOption(strictMode) {

    return {
        parsers: [


            // DE
            new parser.DEDeadlineFormatParser(strictMode),
            new parser.DEMonthNameLittleEndianParser(strictMode),
            new parser.DEMonthNameParser(strictMode),
            new parser.DESlashDateFormatParser(strictMode),
            new parser.DETimeAgoFormatParser(strictMode),
            new parser.DETimeExpressionParser(strictMode),
        ],

        refiners: [
            // Removing overlaping first
            new refiner.OverlapRemovalRefiner(),

            new refiner.DEMergeDateTimeRefiner(),
            new refiner.DEMergeDateRangeRefiner(),

            // Extract additional info later
            new refiner.ExtractTimezoneOffsetRefiner(),
            new refiner.ExtractTimezoneAbbrRefiner(),
            new refiner.UnlikelyFormatFilter()
        ]
    }
}



exports.strictOption = function () {
    return baseOption(true);
};


exports.casualOption = function () {

    var options = baseOption(false);

    // DE
    options.parsers.unshift(new parser.DECasualDateParser());
    options.parsers.unshift(new parser.DEWeekdayParser());

    return options;
};