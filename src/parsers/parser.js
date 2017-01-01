
function Parser(strictMode) {

    this.isStrictMode = function() { return (strictMode == true) };

    this.pattern = function() { return /./i; }

    this.extract = function(text, ref, match, opt){ return null; }

    this.execute = function(text, ref, opt) {

        var results = [];
        var regex = this.pattern();

        var remainingText = text;
        var match = regex.exec(remainingText);

        while (match) {

            // Calculate match index on the full text;
            match.index += text.length - remainingText.length;

            var result = this.extract(text, ref, match, opt);
            if (result) {

                // If success, start from the end of the result
                remainingText = text.substring(result.index + result.text.length);

                if (!this.isStrictMode() || result.hasPossibleDates()) {
                    results.push(result);
                }

            } else {
                // If fail, move on by 1
                remainingText = text.substring(match.index + 1);
            }

            match = regex.exec(remainingText);
        }

        if (this.refiners) {
            this.refiners.forEach(function () {
                results = refiner.refine(results, text, options);
            });
        }

        return results;
    }
}

exports.Parser = Parser;

exports.DEDeadlineFormatParser = require('./DE/DEDeadlineFormatParser').Parser;
exports.DEMonthNameLittleEndianParser = require('./DE/DEMonthNameLittleEndianParser').Parser;
exports.DEMonthNameParser = require('./DE/DEMonthNameParser').Parser;
exports.DESlashDateFormatParser = require('./DE/DESlashDateFormatParser').Parser;
exports.DETimeAgoFormatParser = require('./DE/DETimeAgoFormatParser').Parser;
exports.DETimeExpressionParser = require('./DE/DETimeExpressionParser').Parser;
exports.DEWeekdayParser = require('./DE/DEWeekdayParser').Parser;
exports.DECasualDateParser = require('./DE/DECasualDateParser').Parser;