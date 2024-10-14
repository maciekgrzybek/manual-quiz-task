# Manual Landing Page

Page can be viewed on [this page](https://manual-quiz-task.vercel.app).

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Testing

You can run this command for unit tests (quiz domain logic in this case)

```bash
npm run test
```

You can run this command for e2e tests (main quiz flow in this case)

```bash
npm run test:e2e
```

Here's your text with some enhancements for clarity, structure, and emphasis:

## Overview

- **Styling with Tailwind**: I used Tailwind for styling and feel pretty confident with it as I use it on a daily basis. It helps to quickly add styling in projects like this. Of course, the website is fully responsive and built with a **mobile-first approach**.
- **Next.js Implementation**: I used Next.js (as per the request in the brief). I haven't used it for some time, to be fair, but I reminded myself fairly quickly how it's supposed to be used. I must say that it has evolved in a very good direction; for instance, **out-of-the-box image optimization is awesome**.

- **Design System**: I've created a separate folder that is supposed to mimic an actual **Design System**. If I remember correctly, you folks are using one, right? As I understand, landing pages similar to this are being produced in larger numbers, so having a separate package with a Design System makes sense.

- **Quiz Domain**: I took a similar approach with the quiz domain—it could be extracted as a separate package. After some analysis, I realized that the quiz could be used in different projects.

  - I tried to do this as generically as possible; the quiz doesn't care about the actual questions—they are defined by the consumer.
  - The quiz defines types of questions that can be used ([see here](./app/quiz/ui/choice-type-question.tsx)), but it could also be extracted to a higher level, allowing the consumer to actually pass markup for its questions (I did something like this with the [final state component](./app/quiz/ui/default-final-state.tsx)).
  - There are three main layers inside this package:
    - **UI**: Contains only the React components.
    - **Application**: Contains a hook that handles the state orchestration in React.
    - **Domain**: Contains pure logic about the quiz flow.
      This distinction makes it easy to potentially add different frameworks to the package. I know that sometimes it doesn't make sense to think so far into the future, but in this case, the effort is pretty low, and the potential gain is significant (**high ROI**).
  - I've also added a [fake Analytics contract](./app/quiz/application/use-quiz-flow.ts) that is showcasing, how we could add implementation of an analytics service, without coupling it with the quiz package.
  - Note: In the [`ChoiceTypeQuestion`](./app/quiz/ui/choice-type-question.tsx) component I insert the image element directly into div. It's not a great solution (potential XSS attack), but the assumption here is that the data is safe, as it's coming from our own sources. We could eventually add a sanitize library, like [dompurify](https://github.com/cure53/DOMPurify) or even create our own mapper, that would detect if there's an HTML element to generate it by ourselves.

- **Quiz Usage**: I've added functionality that saves the answers in local storage, allowing the user to continue their journey (for example, on page refresh). All **logic** related to the actual usage of the quiz on the landing page lives in the `landing-page/application` folder. The body is being scroll-locked when the modal with the quiz is opened. I've also added keyboard controls to close the Quiz Modal with the Escape key. There's a [`getQuizInitialState`](./app/landing-page/application/quiz-initial-state.ts) function that handles the questions and answers in the quiz. It can be easily changed to use a different set of questions or even fetch them from an API.

- **Dependency Cruiser**: In the `quiz` and `design-system`, I re-export everything from the `index.ts` file. The reason for this is the **Dependency Cruiser** I would normally add. We want to avoid tight coupling as much as possible and allow other consumers to only import the API being exposed by the packages and not their internals. I know that in this project it's an overkill, but I just wanted to show how I would approach it in a bigger project.

- **Standard Page Layout**: The rest of the page is pretty standard—React components with Tailwind, split into logical, smaller components.

- **Testing**: I also wrote unit tests (using Vitest + RTL) and E2E tests (using Playwright). Unit tests only test the quiz domain logic in isolation, while E2E tests assess the general quiz flow. I decided to use E2E testing to ensure that the state is handled correctly and to verify that the Local Storage API is utilized properly. Initially, I wanted to use unit/integration tests for the UI, but in this case, a full-blown app makes more sense. In the E2E tests, I used the approach of extracting the setup into a separate function—this is to ensure that tests are readable and easy to change with potential changes to the underlying framework. This is an approach I've been introducing in my current and previous jobs—you can read more about it [here](https://github.com/maciekgrzybek/elegant-tests).

## What would I add?

- **Animations**: I was thinking about adding some cool animations (mainly to the quiz), but I've already spent some time on this project, so I decided that it can live without it. 🙂

- **URL Search Parameter**: Another thing that could be added would be a URL search parameter, which would allow users to open the quiz straight away (it could also be stored in local storage). I believe this would be a product decision regarding how much we want to "attack" the user with the quiz.

- **Dependency Cruiser**: As mentioned before, [Dependency Cruiser](https://github.com/sverweij/dependency-cruiser) would be a nice addition. It would work as a guard against coupling.

- **Design system export**: Normally, I'd probably create a single method to import all config (colors, font size etc) from the design system so it can be "just" plugged in into the project (in oppose to importing pieces of config separately). This would also allow to extend the API of the design system for a different types of projects (for example ones that are not using Tailwind).

- **JSON structure**: I'd probably also try to discuss changes of the JSON structure. I believe that questions and answers should have IDs. Working on IDs instead of indexes would be more robust in my opinion.

## Final words

I hope I captured all of my thinking process here, but there's a big chance that I forgot something 😀. If so, we can discuss that in the next phase.
