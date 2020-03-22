function eval() {
    // Do not use eval!!!
    return;
}

function operations(operation, x, y) {
    switch (operation) {
        case '+':
            result = +x + +y;
            break;
        case '-':
            result = +x - +y;
            break;
        case '*':
            result = +x * +y;
            break;
        case '/':
            result = +x / +y;
    }
    return result;
}

function expressionCalculator(expr) {
    const operations_priority = {
        '+': 1,
        '-': 1,
        '*': 2,
        '/': 2,
    }
    let arr_number = [];
    let arr_symbol = [];
    let last_symbol;
    let y;
    let x;
    expr = expr.replace(/\s/g, '');
    expr = expr.split(/([()*+-\/])/g);
    while (expr.includes("")) expr.splice(expr.indexOf(""), 1);
    // check for errors
    let open_brackets = expr.join("").replace(/[(]/g, "");
    let close_brackets = expr.join("").replace(/[)]/g, "");
    if (open_brackets.length != close_brackets.length) throw new Error("ExpressionError: Brackets must be paired");
    if (expr.join("").includes("/0")) throw new Error("TypeError: Division by zero.");
    // if all is good :)
    for (let i = 0; i < expr.length; i++) {
        if (isFinite(expr[i])) arr_number.push(expr[i]);
        else if (expr[i] == ")") {
            while (arr_symbol[arr_symbol.length - 1] !== '(') {
                last_symbol = arr_symbol.pop();
                y = arr_number.pop();
                x = arr_number.pop();
                arr_number.push(operations(last_symbol, x, y));
            }
            arr_symbol.pop();
        } else if (expr[i] == '(' || operations_priority[arr_symbol[arr_symbol.length - 1]] < operations_priority[expr[i]]) arr_symbol.push(expr[i]);
        else {
            while (operations_priority[expr[i]] <= operations_priority[arr_symbol[arr_symbol.length - 1]]) {
                last_symbol = arr_symbol.pop();
                y = arr_number.pop();
                x = arr_number.pop();
                arr_number.push(operations(last_symbol, x, y));
            }
            arr_symbol.push(expr[i]);
        }
    }
    while (arr_symbol.length > 0) {
        last_symbol = arr_symbol.pop();
        y = arr_number.pop();
        x = arr_number.pop();
        arr_number.push(operations(last_symbol, x, y));
    }
    return Number(arr_number.pop())
}

module.exports = {
    expressionCalculator
}