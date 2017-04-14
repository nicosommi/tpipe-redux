<!-- ph replacements -->
<!-- name, /tpipe-redux/g, tpipe-redux
namePascal, /TPipe\ Express/g, TPipe Express -->
<!-- endph -->
<!-- ph title -->
# TPipe Express [![npm version](https://img.shields.io/npm/v/tpipe-redux.svg)](https://www.npmjs.com/package/tpipe-redux) [![license type](https://img.shields.io/npm/l/tpipe-redux.svg)](https://github.com/nicosommi/tpipe-redux.git/blob/master/LICENSE) [![npm downloads](https://img.shields.io/npm/dm/tpipe-redux.svg)](https://www.npmjs.com/package/tpipe-redux) ![ECMAScript 6 & 5](https://img.shields.io/badge/ECMAScript-6%20/%205-red.svg) [![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)
<!-- endph -->

<!-- ph description -->
TPipe Express is a common redux tpipe mapping set. So you can easily pipe your redux handlers.

<!-- endph -->

<!-- ph usagesAndExamples -->
```javascript
import { piper } from 'tpipe'
import reduxPipeSet, { mapActionToInput, createBodyDispatcher } from 'tpipe-redux'

 // piper returns an object with a pipe inside to be injected in redux
const saveThunk = piper(
  (input) => {
    validate(input.body) // a client side validation, for example
    // your stuff like an api call
    return {
      ...input
    }
  }
)
.input(mapActionToInput)
.input(createBodyDispatcher(saveRequest)) // action creator that receives a payload
.output(createBodyDispatcher(saved)) // another action creator
.error(createBodyDispatcher(saveError)) // another action creator
// .finally() // you can also use a finally
.pipe
.getThunk() // this a regular thunk to be executed using the redux-thunk middleware
```
Or using the incorporate function from the piper
```javascript
import { piper } from 'tpipe'
import reduxPipeSet, { mapActionToInput, createBodyDispatcher } from 'tpipe-redux'

 // piper returns an object with a pipe inside to be injected in redux
const saveThunk = piper(
  (input) => {
    validate(input.body) // a client side validation, for example
    // your stuff like an api call
    return {
      ...input
    }
  }
)
.incorporate(reduxPipeSet) // this is recommended
.input(createBodyDispatcher(saveRequest)) // action creator that receives a payload
.output(createBodyDispatcher(saved)) // another action creator
.error(createBodyDispatcher(saveError)) // another action creator
// .finally() // you can also use a finally
.pipe
.getThunk() // this a regular thunk to be executed using the redux-thunk middleware
``` 

<!-- endph -->
<!-- ph howItWorks -->
<!-- endph -->
<!-- ph qualityAndCompatibility -->
# Quality and Compatibility

[![Build Status](https://travis-ci.org/nicosommi/tpipe-redux.png?branch=master)](https://travis-ci.org/nicosommi/tpipe-redux) [![Coverage Status](https://coveralls.io/repos/nicosommi/tpipe-redux/badge.svg)](https://coveralls.io/r/nicosommi/tpipe-redux)  [![bitHound Score](https://www.bithound.io/github/nicosommi/tpipe-redux/badges/score.svg)](https://www.bithound.io/github/nicosommi/tpipe-redux)  [![Dependency Status](https://david-dm.org/nicosommi/tpipe-redux.png?theme=shields.io)](https://david-dm.org/nicosommi/tpipe-redux?theme=shields.io) [![Dev Dependency Status](https://david-dm.org/nicosommi/tpipe-redux/dev-status.svg)](https://david-dm.org/nicosommi/tpipe-redux?theme=shields.io#info=devDependencies)

*Every build and release is automatically tested on the following platforms:*

![node 5.x](https://img.shields.io/badge/node-5.x-brightgreen.svg)
![node 6.x](https://img.shields.io/badge/node-6.x-brightgreen.svg)
<!-- endph -->
<!-- ph installation -->
# Installation

Copy and paste the following command into your terminal to install TPipe Express:

```
npm install tpipe-redux --save
```

<!-- endph -->
<!-- stamp contribute -->
# How to Contribute

You can submit your ideas through our [issues system](https://github.com/nicosommi/tpipe-redux/issues), or make the modifications yourself and submit them to us in the form of a [GitHub pull request](https://help.github.com/articles/using-pull-requests/).

<!-- endstamp -->
<!-- stamp runningtests -->
## Running Tests

It's easy to run the test suite locally, and *highly recommended* if you're using tpipe-redux on a platform we aren't automatically testing for.

```
npm test
```
<!-- endstamp -->
