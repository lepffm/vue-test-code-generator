// example) node tests/support/test-generator-vue3 HelloWorld
import fs from 'fs';
import Handlerbars from 'handlebars';
// https://github.com/vuejs/core/tree/main/packages/compiler-sfc
import { parse, compileTemplate , compileScript } from '@vue/compiler-sfc';
const PROP_TYPE = 'props' // from BindingTypes from '@vue/compiler-core'

const BUTTON_TAG_NAME = 'button';
const mockId = 'tc-gen-xxxx'
const traverseButton = (ast, buttons) => {
    if (ast.tag === BUTTON_TAG_NAME) {
        buttons.push(ast.children[0].content);
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
const extractScriptSetup = descriptor => {
    const { bindings, imports, map, scriptSetupAst } = compileScript(descriptor, {id: mockId})

    const importedService = [];
    for( const key in imports) {
        if (key.endsWith('Service')) {
            importedService.push({ name: key, source: imports[key].source});
        }
    }
    const props = [];
    for( const key in bindings) {
        if (bindings[key] === PROP_TYPE) {
            props.push({ name: key});
        }
    }
    traverseProps(scriptSetupAst, props)
    return { imports: importedService , props: props}
}
const parseAll = (src) => {
    const parsed = parse(src)
    const template = extractTemplate(parsed.descriptor.template.ast);
    const script = extractScriptSetup(parsed.descriptor);
    return { template: template, script: script };
}

const generate = (subject, compPath) => {

    // 1. parsing 
    const sourceString = fs.readFileSync(`${compPath}/${subject}.vue`).toString('utf8');
    const result = parseAll(sourceString);

    // 2. templating
    const template = fs.readFileSync('templates/vue3-template.hbs').toString('utf8');
    const map = {
        subject: subject,
        imports: result.script.imports,
        props: result.script.props,
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