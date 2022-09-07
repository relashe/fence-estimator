# Fence Estimator

## Get started

The project uses webpack to either run it, in dev mode or build the package to then be deployed to the server, through FTP.

There are 3 scripts in use:

1. `start` - which runs the project in development mode and refreshes the page when changes are made
2. `build` - which generates the package folder with the compiled code. This is what is copied into the server
3. `build-dev` - used to build the solution to be deployed to staging (which uses Netlify)

## Map setup

Depending on the mode the project is being run (development / production) the scriptd with call an app.js file (development uses `app.js` and production uses `app.build.js`) which will initiate everything

In summary, this is the order of events:

1. The initialiser is called in the `app.js` file
2. The google map library is initiated and the google map instance passed to all the modules
3. All page elements are assigned
4. All events within the map are bound
5. A check is made for cached content
6. Map is setup and drawn

#### Map setup

All map elements are setup within the `createMap` function. This includes:

- create map instance
- setup autocomplete input for address
- marker for the address
- set up the drawing manager that will change between drag and draw (shapes or lines)
- listener events for map clicks and completing drawings

#### Flow of events

- User adds an address
- marker is added
- user selects drawing tool (shape or line)
- when completed drawing line/shape is added to an array of `mapElements`
- map is drawn with shapes from array
- sidebar table is re-created based on array
- map array is cached (session storage)
- user can draw again (flow repeats for new drawing)

#### Download

Download function is hosted in Netlify, as a Netlify function. This will be used as an API where the data is sent and then from there the email is sent to the relevant users.

The code for this function is on _./netlify/functions/email-file.js_

#### Print

Printing function generates an image from the current map and calls the window printing function
