// example) node src/test-generator-vue2 HelloWorld src/components

import fs from 'fs';
import Handlerbars from 'handlebars';
// 
import { compile,parseComponent } from 'vue-template-compiler';

const PROP_TYPE = 'props'

const BUTTON_TAG_NAME = 'button';
const mockId = 'tc-gen-xxxx'
const traverseButton = (ast, buttons) => {
    if (ast.tag === BUTTON_TAG_NAME) {
        buttons.push(ast.children[0].text);
    } else {
        if (ast.children) {
            for (const child of ast.children) {
                traverseButton(child, buttons);
            }
        }
    }
}
const traverseProps = (asts, props = []) => {
    const expressions = asts.filter(it => it.type === 'ExpressionStatement' && it.expression.callee.name === 'defineProps');
    for ( const exp of expressions ) {
        const tprops = exp.expression.arguments[0].properties
        for( const prop of tprops ) {
            if (prop.value?.type === 'Identifier') {
                props.push({key: prop.key.name, type: prop.value.name });
            } else {
                const propType = prop.value.properties.find(it => it.key.name === 'type')
                props.push({ key: prop.key.name, type: propType.value.name });
            }
        }
    }
    return props;
}
const extractTemplate = ast => {
    const buttons = [];
    traverseButton(ast, buttons);
    return { buttons: buttons };
}
const extractScript = src => {
    const ret = parseComponent(src, {id: mockId})
    const imports = ret.script.content.match(/(import\s[\w-]+Service\sfrom\s'@\/.*Service\')/gm);
    return { imports: imports , props: []}
}
const parseAll = (src) => {
    const parsed = compile(src)
    const template = extractTemplate(parsed.ast);
    const script = extractScript(src);
    return { template: template, script: script };
}

const generate = (subject, compPath) => {

    // 1. parsing 
    const sourceString = fs.readFileSync(`${compPath}/${subject}.vue`).toString('utf8');
    const result = parseAll(sourceString);

    // 2. templating
    const template = fs.readFileSync('templates/vue2-template.hbs').toString('utf8');
    const map = {
        subject: subject,
        imports: result.script.imports,
        buttons: result.template.buttons,
    }
    const templatFn = Handlerbars.compile(template);
    const specString = templatFn(map);

    // 3. generate file
    if (!fs.existsSync('tests')) {
        fs.mkdirSync('tests');
    }
    if (!fs.existsSync('tests/components')) {
        fs.mkdirSync('tests/components');
    }
    try {
        fs.writeFileSync(`tests/components/${subject}.spec.js`, specString);
    } catch (e) {
        console.error(e);
    }
}

export { generate };
