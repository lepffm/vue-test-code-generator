# Vue test code generator
for Vue3 
## Usage
- vue component test code generation from vue source 
`node tests/support/test-generator-vue3 HelloWorld`

## example 
source 
```
<script setup>
import { ref } from 'vue'
import XXService from '@/component/XXService'
defineProps({
  msg: String,
})
const count = ref(0)
</script>
<template>
  <div class="card">
    <button type="button" @click="count++">count is {{ count }}</button>
  </div>
</template>
```

test file 
```
import subject from 'src/components/HelloWorld.vue';
import XXService from '@/component/XXService';

describe('HelloWorld spec', () => {
    beforeEach(() => {
        // XXService.method = jest.fn();
    });
    const createRender = (props = {}) => {
        // TODO return ...
    }
    describe('lifecycle', () => {
        it('given role', async () => {
            createRender();
            await flushPromise();

            // TODO
            expect('hello').toBe('hello');
        })
        it('no role', async () => {
            createRender();
            await flushPromise();

            // TODO
        })
    });
    describe('event', () => {
        it('click count is ', async () => {
            const caption = 'count is ';
            createRender();
            await flushPromise();

            // TODO when 
            // clickButton
            
            // TODO
            expect('hello').toBe('hello');
        })
    });
});

```

## TODO
- props handling
- vue2 support

## reference
- vue3 source parser : https://github.com/vuejs/core/tree/main/packages/compiler-sfc
- template engine : https://handlebarsjs.com/
