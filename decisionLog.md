Here I will journey my decisions as I progress through the exercise. Each entry near enough matches up to each commit made within the repo, and so you should be able to follow along commit by commit to see my progress at each step.

1.a.
I would like to test-drive the implementation to ensure I create code that is both lean, and designed to be tested. I can ensure I add all required functionality step by step.

1.b.
I first create a test file that just renders `<Modal />`. This gives me a static error that the component does not exist and so I create a Modal component that just returns `null` for now.

1.c.
I want to use the `<dialog>` tag so that we can leverage the work already done by the browsers as much as possible. However, when testing using `getByRole` with testing library, the test fails even if you specifically put a `role="dialog"`. This is because [JestDOM does not yet support the dialog tag](https://github.com/jsdom/jsdom/issues/3294). I will go ahead with selecting the element through `test-id` in this one case.

1.d.
Added the `jest-axe` package to safeguard against any obvious a11y mistakes that can be picked up.

1.e.
As per [MDN's guidelines](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog), a modal window should contain the `aria-modal` attribute. I've created a test to cover this.

1.f.
The next simplist thing I could think to test, was that the Modal can render content passed to it. I created a test case for this and satisfied the test.

1.g.
My next test case is that the modal contains a label. This could be the title of the Modal window. I test that given the title prop, a heading of that title is rendered.

I need to revert my use of the `<dialog>` to a plain div, becuase it seems the unsupported dialog tag within JestDOM prevents any roles being found within it, i.e. `screen.getByRole('heading')` will fail. I'll revert to use a div tag, and ensure that the dialog role is assigned. This allow me to test the presence of the dialog through the more recommended `getByRole` assertion.

My jest-axe coverage also alerts me to ensure the aria-labelledby attribute references the title.

1.h.
I can see some repetition in the rendering of my tests, and so I can refactor here to remove duplication.

1.i.
My next case is to ensure that the Modal can be rendered on demand, so that it's not always present on initial render.

1.j.
Now I have asserted I can open the modal on demand, I need a way to close it again. Within my current implementation, the rendering of the Modal is determined by the boolean value of it's `isOpen` prop. There are a few cases to consider when closing the modal:

- We will need a close button within the modal itself for users to click.
- We will need to allow users to press the Esc key to close the modal
- We will need to allow users to click outside of the modal to close it. This one is a common feature with most modals and so users would already have a learned behaviour and expectation for this to work.

My first test will be to ensure a close button exists.

1.k.
I like to keep the modal component only responsible for one thing: presenting content. So far this is true, and the rendering of the modal is determined by it's parent. Therefore, the closing of the modal should also be determined by it's parent. For my next test case, I want to be able to pass a function into the modal component that will be responsible for changing the state of whether it's shown or not. I can just use a mock function for this to track that it has been called successfully when the close button is clicked.

I like to use the `user-event` library for user interactions to ensure that they are as close to the real thing as possible.

1.l
Now I can call the passed in function to close the modal through the close button, my next step is to move to being able to call the close functionality when the user presses the Esc key.

I chose to add an event listener on the window for the keydown of the escape key, to ensure that the event would be captured regardless of what is in focus.
