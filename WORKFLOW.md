# AI-Assisted Workflow Comparison

## Round 1: Vague Prompt

For Round 1, I used a short and vague prompt asking the AI to create a React settings form with validation. The AI generated the initial implementation with minimal guidance. The result provided a basic starting point, but the prompt did not specify detailed requirements for accessibility, validation behavior, edge cases, or testing. This meant that I had to review the result more carefully and determine whether the implementation matched what was actually needed.

## Round 2: Precise Prompt

For Round 2, I used a fresh AI session and gave Cursor a detailed prompt. I specified React and JavaScript, the required name, email, and password fields, validation requirements, accessible labels, responsive design, simple component structure, and a restriction against unnecessary libraries. I also instructed Cursor to inspect the project first, explain its plan, implement the feature, review accessibility and edge cases, write tests, and run those tests.

## Comparison

The biggest difference was the amount of direction given to the AI. Round 1 relied mainly on the AI's interpretation, while Round 2 provided explicit requirements and a verification process. The Git diff showed specific changes between the branches, including changes to `src/App.css` and the addition or modification of the settings-form implementation.

Round 2 also made review easier because the requirements were clearly defined before implementation. The validation requirements made it easier to check whether the form behaved correctly. Accessibility was also explicitly included through the requirement for labels.

The precise workflow required more planning before coding, but it reduced uncertainty during review. Instead of only checking whether the UI appeared to work, I could verify the requested validation behavior, accessibility, responsiveness, and tests.

## AI Mistake and Review

I tested the Round 2 settings form myself after Cursor completed the implementation. This manual review was important because AI-generated code still needs human verification. The main lesson from this comparison is that a precise prompt with constraints and a verification step produces a more reviewable and reliable result than a vague prompt.

## Conclusion

For future frontend work, I will use the Round 2 approach: inspect first, make a clear plan, provide specific requirements and constraints, implement, test, and manually review the result before considering the feature complete.