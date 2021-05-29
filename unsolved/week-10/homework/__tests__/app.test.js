const app = require('../app');

describe('app', () => {
    test('Should console log "App has started"', () => {
        const consoleSpy = jest.spyOn( console, "log" );
        const expected  = "App has started";
        app();
        expect( consoleSpy ).toHaveBeenCalledWith( expected );
    })
});