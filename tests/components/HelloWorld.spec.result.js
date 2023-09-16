import subject from 'src/components/HelloWorld.vue';
import XXService from '@/component/XXService';
import YYService from '@/component/YYService';

describe('HelloWorld spec', () => {
    beforeEach(() => {
        // XXService.method = jest.fn();
        // YYService.method = jest.fn();
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
        it('click minus count', async () => {
            const caption = 'minus count';
            createRender();
            await flushPromise();

            // TODO when 
            // clickButton
            
            // TODO
            expect('hello').toBe('hello');
        })
    });
});
