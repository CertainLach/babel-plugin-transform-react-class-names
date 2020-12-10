export default function (babel) {
    const { types: t } = babel;

    return {
        name: 'react-class-names',
        visitor: {
            JSXAttribute(path) {
                if (path.node.name.name === 'classNames' && path.node.value.expression.type === 'ArrayExpression') {
                    path.node.name.name = 'className';

                    let quasis = [t.templateElement({ raw: '' })];
                    let elements = [];
                    for (let el of path.node.value.expression.elements) {
                        let lastValue = quasis[quasis.length - 1].value;
                        if (quasis.length !== 1 || (lastValue.raw.length !== 0 && !lastValue.raw.endsWith(' '))) {
                            lastValue.raw += ' ';
                        }
                        if (el.type === 'StringLiteral') {
                            lastValue.raw += `${el.value}`;
                        } else {
                            if (el.type === 'Identifier' || el.type === 'MemberExpression') {
                                elements.push(el);
                            } else {
                                elements.push(t.logicalExpression('||', el, t.stringLiteral('')));
                            }
                            quasis.push(t.templateElement({ raw: '' }));
                        }
                    }
                    path.node.value = t.templateLiteral(quasis, elements);
                }
            }
        }
    };
}

