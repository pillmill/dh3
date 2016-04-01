var __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

define([], function() {
  var XFormConstraintChecker;
  return XFormConstraintChecker = (function() {
    function XFormConstraintChecker() {}

    XFormConstraintChecker.passesConstraint = function(question, answers) {
      var constraint, expression, passesConstraint;
      passesConstraint = true;
      if (question.bind && question.bind.constraint) {
        constraint = question.bind.constraint;
        expression = this.evaluateSelectedInExpression(constraint, answers, question["name"]);
        return this.evaluateExpression(expression, answers, question["name"]);
      }
      return passesConstraint;
    };

    XFormConstraintChecker.isRelevant = function(question, answers) {
      var containsRelevant, expression, relevantString;
      containsRelevant = question.bind && question.bind.relevant;
      if (containsRelevant) {
        relevantString = question.bind.relevant;
        expression = relevantString.replace(/\./, question["name"]);
        expression = this.evaluateSelectedInExpression(expression, answers, question["name"]);
        return this.evaluateExpression(expression, answers, question["name"]);
      } else {
        return true;
      }
    };

    XFormConstraintChecker.evaluateSelectedInExpression = function(expression, answers, currentPath) {
      var answer, components, endRange, keepGoing, leftString, range, replaceString, rightString, selected, string, substring;
      keepGoing = true;
      string = expression.toLowerCase();
      while (keepGoing) {
        range = expression.indexOf("selected(");
        if (range !== -1) {
          substring = expression.slice(range + 9);
          endRange = substring.indexOf(")");
          selected = substring.slice(0, +endRange + 1 || 9e9);
          components = selected.split(",");
          leftString = components[0].replace(/\s+/g, "");
          rightString = components[0].replace(/\s+/g, "");
          if (leftString === ".") {
            leftString = "${" + currentPath + "}";
          }
          rightString = rightString.slice(1, +(rightString.length - 2) + 1 || 9e9);
          answer = answers[leftString];
          replaceString = expression.slice(range, +endRange + 1 || 9e9);
          if (answer === rightString) {
            string = string.replace(replaceString, "YES");
          } else {
            string = string.replace(replaceString, "NO");
          }
        } else {
          keepGoing = false;
        }
      }
      return string;
    };

    XFormConstraintChecker.evaluateExpression = function(expression, answers, currentPath) {
      var andLocation, andRange, closeRange, leftExpression, leftOverString, newExpression, notRange, orLocation, orRange, parentString, range, rangeLength, rightExpression, scopeRange;
      expression = expression.toLowerCase();
      scopeRange = expression.indexOf("(");
      andRange = expression.indexOf(" and ");
      orRange = expression.indexOf(" or ");
      notRange = expression.indexOf("not(", 0);
      range = scopeRange;
      rangeLength = 1;
      if (andRange !== -1 && andRange > range) {
        range = andRange;
        rangeLength = 5;
      }
      if (orRange !== -1 && orRange > range) {
        range = orRange;
        rangeLength = 4;
      }
      if (notRange !== -1 && notRange > range) {
        range = notR;
        rangeLength = 4;
      }
      if (range !== -1) {
        if (range === scopeRange) {
          closeRange = expression.lastIndexOf(")");
          parentString = expression.slice(range + 1, +(closeRange - range - 2) + 1 || 9e9);
          if (closeRange < (expression.length - 1)) {
            leftOverString = expression.slice(closeRange + 1);
            orLocation = leftOverString.indexOf(" or ");
            andLocation = leftOverString.indexOf(" and ");
            if (orLocation !== 0) {
              return this.evaluateExpression(parentrString, answers, currentPath) || this.evaluateExpression(leftOverString, answers, currentPath);
            } else if (andLocation !== 0) {
              return this.evaluateExpression(parentrString, answers, currentPath) && this.evaluateExpression(leftOverString, answers, currentPath);
            } else if (andLocation !== -1 || orLocation !== -1) {
              return this.evaluateExpression(parentString, answers, currentPath);
            }
          } else {
            return this.evaluateExpression(parentString, answers, currentPath);
          }
        } else if (range === andRange) {
          leftExpression = expression.slice(0, +range + 1 || 9e9);
          rightExpression = expression.slice(range + rangeLength);
          return this.evaluateExpression(leftExpression, answers, currentPath) && this.evaluateExpression(rightExpression, answers, currentPath);
        } else if (range === orRange) {
          leftExpression = expression.slice(0, +range + 1 || 9e9);
          rightExpression = expression.slice(range + rangeLength);
          return this.evaluateExpression(leftExpression, answers, currentPath) || this.evaluateExpression(rightExpression, answers, currentPath);
        } else if (range === notRange) {
          closeRange = expression.lastIndexOf(")");
          newExpression = expression.slice(range + rangeLength, +(closeRange - (range + rangeLength)) + 1 || 9e9);
          return !(this.evaluateExpression(newExpression, answers, currentPath));
        }
      } else {
        return this.passesTest(expression, answers, currentPath);
      }
      return true;
    };

    XFormConstraintChecker.passesTest = function(expression, answers, currentPath) {
      var compareString, comps, lName, leftAnswer, leftAnwer, leftFloat, leftString, number, rName, rightAnswer, rightFloat, rightString;
      if (expression === "YES") {
        return true;
      } else if (expression === "NO") {
        return false;
      }
      if ((expression.indexOf("<=")) !== -1) {
        compareString = "<=";
      } else if ((expression.indexOf(">=")) !== -1) {
        compareString = ">=";
      } else if ((expression.indexOf("!=")) !== -1) {
        compareString = "!=";
      } else if ((expression.indexOf("=")) !== -1) {
        compareString = "=";
      } else if ((expression.indexOf("<")) !== -1) {
        compareString = "<";
      } else if ((expression.indexOf(">")) !== -1) {
        compareString = ">";
      } else {
        return true;
      }
      comps = expression.split(compareString);
      leftString = comps[0].replace(/\s+/g, "");
      if (leftString === ".") {
        leftString = "${" + currentPath + "}";
      }
      rightString = comps[1].replace(/\s+/g, "");
      leftAnwer = null;
      rightAnswer = null;
      if ((leftString.indexOf("$")) !== -1) {
        lName = leftString.slice(2, leftString.length - 1);
        leftAnswer = answers[lName];
        if (leftAnswer instanceof Array) {
          leftAnswer = "''";
        }
      } else {
        return false;
      }
      if ((rightString.indexOf("$")) !== -1) {
        rName = rightString.slice(2, rightString.length - 1);
        rightAnswer = answers[rName];
        if (rightAnswer instanceof Array) {
          rightAnswer = "''";
        }
      } else {
        rightAnswer = rightString;
      }
      if (leftAnswer === null || rightAnswer === null) {
        if (leftAnswer !== null) {
          if (compareString === "!=") {
            return true;
          }
        } else if (rightAnswer !== null) {
          if (compareString === "!=" && rightAnswer === "''") {
            return false;
          } else if (compareString === "=" && rightAnswer === "''") {
            return true;
          } else if (compareString === "!=") {
            return true;
          }
        } else {
          if (compareString === "=") {
            return true;
          }
        }
        return false;
      }
      if (rightAnswer === "today()") {
        return false;
      } else {
        number = parseInt(rightAnswer);
        if (!(isNaN(number))) {
          leftFloat = parseFloat(leftAnswer);
          rightFloat = parseFloat(rightAnswer);
          if (compareString === "<") {
            return leftFloat < rightFloat;
          } else if (compareString === ">") {
            return leftFloat > rightFloat;
          } else if (compareString === "=") {
            return leftFloat === rightFloat;
          } else if (compareString === "<=") {
            return leftFloat <= rightFloat;
          } else if (compareString === ">=") {
            return leftFloat >= rightFloat;
          } else {
            return leftFloat !== rightFloat;
          }
        } else {
          if (__indexOf.call(rightAnswer, "'") >= 0) {
            rightAnswer = (rightAnswer.split("'"))[1].replace(/\s+/g, "");
          }
          if (__indexOf.call(rightAnswer, "\"") >= 0) {
            rightAnswer = (rightAnswer.split("\""))[1].replace(/\s+/g, "");
          }
          if (compareString === "=") {
            return leftAnswer === rightAnswer;
          } else if (compareString === "!=") {
            return leftAnswer !== rightAnswer;
          } else {
            return false;
          }
        }
      }
    };

    return XFormConstraintChecker;

  })();
});
