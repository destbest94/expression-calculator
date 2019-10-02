function eval(polish) {
    let temp = [...polish];
    let result = polish.reduce((res, element, index) => {
        if(!isNumber(element)) {
            let i = res.indexOf(element);
            let a = res[i - 2] - 0;
            let b = res[i - 1] - 0;
            switch (element) {
                case '+': res.splice(i - 2, 3, (a + b)); break;
                case '-': res.splice(i - 2, 3, (a - b)); break;
                case '*': res.splice(i - 2, 3, (a * b)); break;
                case '/': 
                    if (b == 0) throw("TypeError: Division by zero.");
                    res.splice(i - 2, 3, (a / b)); 
                    break;
            }
        }

        return res;
    }, temp);

    return result[0];
}

function isNumber(symbol) {
    if (symbol == '+' || symbol == '-' || symbol == '*' || symbol == '/' || symbol == '(' || symbol == ')') {
        return false;
    }

    return true;
}


const expr = "2*3";
const result = 1916.0690;
console.log( expressionCalculator(expr) );

function expressionCalculator(expr) {
    expr = expr.replace(/\s/g, '');
    let num = '';
    
    let polish = [];
    let operations = [''];

    for(let i = 0; i < expr.length; i++) {
        if (isNumber(expr[i])) {
            num += expr[i];
        } else {
            if (num) polish.push(num);
            num = '';

            if (expr[i] == '(') {
                operations.push('');

            } else if (expr[i] == ')') {
                if (operations.length <= 1) throw("ExpressionError: Brackets must be paired");
                polish = polish.concat(operations[operations.length - 1].split(''));
                operations.pop();

            } else if (expr[i] == '+' || expr[i] == '-') {
                polish = polish.concat(operations[operations.length - 1].split(''));
                operations[operations.length - 1] = expr[i];

            } else {
                if (operations[operations.length - 1][0] == '+' 
                    || operations[operations.length - 1][0] == '-'
                    || operations[operations.length - 1] == '') {
                        operations[operations.length - 1] = expr[i] + operations[operations.length - 1];
                } else {
                    polish.push(operations[operations.length - 1][0]);
                    operations[operations.length - 1] = expr[i] + operations[operations.length - 1].slice(1);
                }
            }
        }
    }
    
    if (num != '') {
        polish.push(num);
    }

    if (operations.length == 1) {
        polish = polish.concat(operations[operations.length - 1].split(''));
        operations.pop();
    } else {
        throw("ExpressionError: Brackets must be paired"); 
    }

    return eval(polish);
}

module.exports = {
    expressionCalculator
}