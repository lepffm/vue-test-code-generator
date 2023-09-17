# Vue test code generator
for Vue3 , Vue2

# feature
- create test file from vue comonent source
- generate import statement from component ( XXService )
- generate lifecycle test function
- generate each event function from button elements 

# usage
param1 : vue type ( vue2, vue3 )
param2 : component name ( HelloWorld ... )
param3 : component path ( samples/vue2, src/components ... )
```
node index vue2 HelloWorld samples/vue2
```

# dependencies
- vue2 : vue-template-compiler
- vue3 : @vue/compiler-sfc
- template engine : handlebars