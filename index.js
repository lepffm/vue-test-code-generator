import { generate as vue2gen } from './src/test-generator-vue2.js';
import { generate as vue3gen } from './src/test-generator-vue3.js';

const subject = process.argv[3];
const compPath = process.argv[4];

if (process.argv[2] === 'vue2') { 
    vue2gen(subject, compPath);
} else if (process.argv[2] === 'vue3') {
    vue3gen(subject, compPath);
}