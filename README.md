# amuse

This is a Sunday night hack to see if I can create a PDF renderer using React and headless Chrome.

## Try it out

```sh
npm install -g create-react-app
create-react-app --scripts-version @lostmyname/amuse-react-scripts my-personalised-book
```

Then follow the instructions in your console.

## Aims

- Can be run simply in cloud or development environments
- New products can be instantly bootstrapped and deployed
- Products can be composed without a steep learning curve

## Ideas

A headless Chrome instance can be set up using [Lighthouse](https://github.com/GoogleChrome/lighthouse)'s cross platform `ChromeLauncher` and PDFs can be generated programmatically using the devtools API (https://chromedevtools.github.io/devtools-protocol/tot/Page/#method-printToPDF).

I'm choosing React not just because it is a familiar tool for creating web content but also because it's an ideal paradigm for developing personalised products. The video [React: rethinking best practices](https://www.youtube.com/watch?v=x7cQ3mrcKaY) provides a good high level explanation of this paradigm (how reducing coupling and increasing cohesion between logic and view concerns leads to a better development experience and safer code). React also opens us up to a large ecosystem and the ability to create new building blocks whilst still using the same declarative APIs. For example, [react-art](https://github.com/reactjs/react-art) is a library for drawing vector graphics and our own [styleguide application](http://design-system.lostmy.name/components/atoms/Badge) could be used to document the building blocks we use.

I envision a library of React components that include basic publishing primitives such as artboards, text and images; and a higher order component that connects personalisation parameters to components.

Finally, I want this project to remove the complexity curve involved in starting work on a new product. To achieve this I'll use the extremely well maintained [create-react-app](https://github.com/facebookincubator/create-react-app). Using our own custom set of scripts, all the pain of setting up a new project and copying boilerplate can be reduced down to a single command.

This, incidentally, buys us two other benefits:
1) this is the same approach we're taking for starting a new web project (https://github.com/lostmyname-labs/web-playbook)
2) linting, formatting, hot reloading, transpiling are all included for free

## Success

This is how I want this thing to go:

1. Create a new product

```sh
create-react-app --scripts-version @lostmyname/amuse-react-scripts kingdom-of-you-book
```

This will set up build tooling, a local dev server, the ability to deploy and a boilerplate project.

2. Hack the boilerplate

The project will include our equivalent of a Hello World app - a Once upon time book - that the developer can build upon:

```js
// @flow
import React from 'react';
import { personalise, Artboard, Page, Text, Image } from '@lostmyname/amuse-react-components';
import frontCover from './frontCover.svg';
import backCover from './backCover.svg';

type Props = { name: string };

const Book = ({ name }): Props => (
  <Artboard
    size="A4"
    orientation="horizontal"
    bleed={5}>
    <Page>
      <Image src={frontCover} expand />
    </Page>
    <Page>
      <Text x={10} y={100}>Once upon a time...</Text>
      <Text x={40} y={100}>A child called {props.name}</Text>
      <Text x={70} y={100}>Went on an adventure</Text>
    </Page>
    <Page>
      <Text x={250} y={300}>The end.</Text>
    </Page>
    <Page>
      <Image src={backCover} expand />
    </Page>
  </Artboard>
);

export default personalise(Book);
```

And an example demonstrating use of more advanced primitives, and pages as individual modules:

```js
// @flow
import React from 'react';
import { personalise, Page, Text, GraphicalText, Image, Scatter } from '@lostmyname/amuse-react-components';
import { times } from 'lodash';
import cakeSrc from './cake.svg';
import candleBoundarySrc from './candleBoundary.svg';

type Props = { name: string, age: number };

const IntroductionPage = ({ name, age }) : Props => (
  <Page>
    <Text x={100} y={200}>One morning {name} woke up....</Text>
    <Image src={cakeSrc}>
      <Scatter within={candleBoundarySrc}>
        {times(age, i => (
          <Image data={candle} index={i}>
        ))}
      </Scatter>
      <GraphicalText texture="icing">Happy Birthday {name}</GraphicalText>
    </Image>
  </Page>
);

export default personalise(IntroductionPage);
```

3. Render to browser

```sh
yarn run start
```

Will launch a web browser as a render target with hot reloading capabilities.

Navigating to `http://localhost:4000` will render every page in the artboard. A single page can be rendered by navigating to `http://localhost:4000/page/1`.

4. Render to PDF

Adding the query parameter `?pdf=true` will make the server respond with a PDF file instead of a HTML page.

5. Deploy

The generated app will include a `Procfile` and `app.json` so developers can easily deploy their product to heroku and setup a deployment pipeline.
