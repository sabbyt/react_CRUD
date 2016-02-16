# react_CRUD

A simple client side CRUD app using [React](https://facebook.github.io/react/)

A Code Fellows 401 Weekend Assignment by [Natalie Chow](https://github.com/xxnatc), [Samuel Heutmaker](https://github.com/samheutmaker), [Sabrina Tee](https://github.com/sabbyt/) and [Jose Tello](https://github.com/josectello).

We used the bear server from class as our REST API, whose server is located at `lib/bear_server.js`. The server for the client side can be found at `server.js` in the root directory.

## Using React vs. Angular
It is difficult to pinpoint features to compare between React and Angular since the two are vastly different. Angular is a framework for front-end MVC while React is only the view layer.

For a basic setup in Angular, you'd need an application, a controller, and any number of directives you need. React, on the other hand, relies on classes (or components). Each class must include a `render` function in addition to any helper functions.

The biggest difference we encountered was the way these frameworks handled data binding. Angular injects data via scope. Scopes can have the following properties: two-way binding, one-way binding, or text binding; each limiting how changes in child/parent scope affect one another. In React, data is injected into the view at the time of rendering. In addition to passing in data as `this.props`, you can set up an internal state within a class. Every time the state changes, it automatically triggers a re-render of that component. Unlike having a `$rootscope` in Angular, these properties or states within a class cannot be modified externally.
