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
As per [MDN's guidelines](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog), a modal window should contain the `aria-modal` attribute. I've created a test to cover this.

1.d.
The next simplist thing I could think to test, was that the Modal can render content passed to it. I created a test case for this and satisfied the test.

1.e.
My next test case is that the modal contains a label. This could be the title of the Modal window. I test that given the title prop, a heading of that title is rendered.

I need to revert my use of the `<dialog>` to a plain div, becuase it seems the unsupported dialog tag within JestDOM prevents any roles being found within it, i.e. `screen.getByRole('heading')` will fail. I'll revert to use a div tag, and ensure that the dialog role is assigned. This allow me to test the presence of the dialog through the more recommended `getByRole` assertion.

My jest-axe coverage also alerts me to ensure the aria-labelledby attribute references the title.

1.f.
I can see some repetition in the rendering of my tests, and so I can refactor here to remove duplication.
