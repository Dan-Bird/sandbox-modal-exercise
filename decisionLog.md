Here I will journey my decisions as I progress through the exercise.

1.a.
I would like to test-drive the implementation to ensure I create code that is both lean, and designed to be tested. I can ensure I add all required functionality step by step.

1.b.
I first create a test file that just renders `<Modal />`. This gives me a static error that the component does not exist and so I create a Modal component that just returns `null` for now.

1.c.
I want to use the `<dialog>` tag so that we can leverage the work already done by the browsers as much as possible. However, when testing using `getByRole` with testing library, the test fails even if you specifically put a `role="dialog"`. This is because [JestDOM does not yet support the dialog tag](https://github.com/jsdom/jsdom/issues/3294). I will go ahead with selecting the element through `test-id` in this one case.

1.d.
Added the `jest-axe` package to safeguard against any obvious a11y mistakes that can be picked up.

1.c.
As per MDN's guidelines, a modal window should contain the `aria-modal` attribute. I've created a test to cover this.
