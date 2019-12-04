# Interview Scheduler

Schdular app Using the latest tools and techniques, it is built and tested to allows users to book and cancel interviews. it is combine with a concise API with a WebSocket server to build a realtime experience.

## app details

- Booking interview Editting it and cancelling using an API server
- Transition states (Deleting and Saving)
- Deleting confirmation
- Warns the user if name field was left empty.
- Landing page, with up to five appointments per day and dynamic counter for the remaining spots.

### Opening page
Landing page 
!["opening page"](https://github.com/LAYTHJABBAR/Scheduler-/blob/master/docs/schdular%20creat%20new%20table.png?raw=true)

### Warning Message
warns the user if the name section is Empty before safing

### Transition states

Saving and deleting animated transitions.

!["state transitions"](https://github.com/LAYTHJABBAR/Scheduler/blob/master/docs/Deleting-Transition.png?raw=true)

### Deletion confirmation

Confirms deletion of appointments.
["deletion confirmation"](
https://github.com/LAYTHJABBAR/Scheduler/blob/master/docs/schdular%20delete%20conformation%20box.png?raw=true! )


### Error Handling

showing Error message if there is no response from the server while Saving , Editing or Deleting
["Error Handling"](
 https://github.com/LAYTHJABBAR/Scheduler/blob/master/docs/error.png?raw=true )


### Unit Tests

Built-in [jest](https://jestjs.io/) test coverage.

!["jest tests"](https://github.com/LAYTHJABBAR/Scheduler-/blob/master/docs/test.png?raw=true)


### E2E Tests

Built-in [cypress](https://www.cypress.io/) end to end tests.
!["cypress tests"](https://github.com/LAYTHJABBAR/Scheduler-/blob/master/docs/cypress-test-ETE.png?raw=true)

# Setup


## Dependencies
please be sure to have them installed before running the app.
Install dependencies with `npm install`.
- axios
- classnames
- normalize.css
- react
- react-dom
- react-scripts

## devDependencies
- @babel/core
- @storybook/addon-actions
- @storybook/addon-backgrounds
- @storybook/addon-links
- @storybook/addons
- @storybook/react
- @testing-library/jest-dom
- @testing-library/react
- @testing-library/react-hooks
- babel-loader
- node-sass
- react-test-renderer

## Getting Started

- Install all dependencies (using the `npm install` command).
- Get and install the [server](https://github.com/lighthouse-labs/scheduler-api).
please follow the installation Instructions on the README FILE
- Run both the server and the client.
