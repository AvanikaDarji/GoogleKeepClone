import { App } from "./notes.js";

describe(`${App.name} Class`, () => {
    let model;
    beforeEach(() => {
        model = new App();
    });
    describe("default values", () => {
        it('note title defaults to empty', () => {
            expect(model.title).toBe("");
        });

        it('note id defaults to empty', () => {
            expect(model.id).toBe("");
        });
    });
    describe("check element", () => {
        it("test element", () => {
            expect(model.$form).toEqual(form);
        });
    });
    /* describe("check method call", () => {
         it("should save item in local storage", () => {
             const localStorage = { "foo": "bar" };
         });
     });*/

});