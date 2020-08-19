
// Because currently only arrays have .join
// Maybe there's a better way out there?
function joinObj(obj, seperator) {
    var out = []; 
    for (k in obj) {  
      out.push(k); 
    } 
   return out.join(seperator);
  }

function isValidDate(input)
{
	return typeof input.getMonth === 'function';
}

function DateToString(inDate, formatString) {
    // Written by m1m1k 2018-04-05

    // Validate that we're working with a date
    if (!isValidDate(inDate)) {
        inDate = new Date(inDate);
    }

    // See the jsFiddle for extra code to be able to use DateToString('Sun May 11,2014', 'USA');
    //formatString = CountryCodeToDateFormat(formatString);

    var dateObject = {
        M: inDate.getMonth() + 1,
        d: inDate.getDate(),
        D: inDate.getDate(),
        h: inDate.getHours(),
        m: inDate.getMinutes(),
        s: inDate.getSeconds(),
        y: inDate.getFullYear(),
        Y: inDate.getFullYear()
    };

    // Build Regex Dynamically based on the list above.
    // It should end up with something like this: "/([Yy]+|M+|[Dd]+|h+|m+|s+)/g"
    var dateMatchRegex = joinObj(dateObject, "+|") + "+";
    var regEx = new RegExp(dateMatchRegex, "g");
    formatString = formatString.replace(regEx, function (formatToken) {
        var datePartValue = dateObject[formatToken.slice(-1)];
        var tokenLength = formatToken.length;

        // A conflict exists between specifying 'd' for no zero pad -> expand
        // to '10' and specifying yy for just two year digits '01' instead
        // of '2001'.  One expands, the other contracts.
        //
        // So Constrict Years but Expand All Else
        if (formatToken.indexOf('y') < 0 && formatToken.indexOf('Y') < 0) {
            // Expand single digit format token 'd' to
            // multi digit value '10' when needed
            var tokenLength = Math.max(formatToken.length, datePartValue.toString().length);
        }
        var zeroPad = (datePartValue.toString().length < formatToken.length ? "0".repeat(tokenLength) : "");
        return (zeroPad + datePartValue).slice(-tokenLength);
    });

    return formatString;
}

console.log(DateToString('Sun May 11,2014', 'MM/DD/yy'));
console.log(DateToString('Sun May 11,2014', 'yyyy.MM.dd'));
console.log(DateToString(new Date('Sun Dec 11,2014'), 'yy-M-d'));
console.log(DateToString(new Date('Sun Dec 11,2014'), 'yy-MMM-d'));
console.log(DateToString(new Date('Sun Dec 11,2014'), 'yy-MM-d hh:mm:ss'));