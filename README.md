# `mobx-matchmedia`
A [MobX](https://mobx.js.org/README.html) observable for [`window.matchMedia`](https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia)

## Install

```sh
yarn add mobx-matchmedia
# or
npm i mobx-matchmedia
```

## Simple Usage

```js
import { autorun } from "mobx";
import { matchMedia } from "mobx-matchmedia";

autorun(() => {
  if (matchMedia("(prefers-color-scheme: dark)")) {
    console.log('Your OS is in dark mode');
  } else {
    console.log('Your OS is in light mode');
  }
});
```

## React Usage

```js
import React from "react";
import { observer } from "mobx-react-lite";
import { matchMedia } from "mobx-matchmedia";

const MyComponent = observer(() => (
  <div>
    Your OS is in
    {' '}
    {matchMedia('(prefers-color-scheme: dark)') ? 'dark' : 'light'}
    {' '}
    mode
  </div>
));
```