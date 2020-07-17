# OrangeHRM Open Source Mobile Application

OrangeHRM is a comprehensive Human Resource Management (HRM) System that captures all the essential functionalities required for any enterprise. Copyright (C) 2006 OrangeHRM Inc., http://www.orangehrm.com/

OrangeHRM is free software; you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation; either version 3 of the License, or (at your option) any later version.

OrangeHRM is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.

## How to setup development environment

### Prerequisites

- [React Native development environment](https://reactnative.dev/docs/environment-setup)
- Yarn

### Install dependancies

```
yarn install
```

### Start dev server

```
npx react-native start
# or
yarn start
```

### Run on Android device or emulator

Start emulator or connect device before run below command

```
npx react-native run-android
# or
yarn run android
```

### Run on iOS device

```
cd ios
pod install
yarn run ios
```

### Testing

```
yarn test
```

### [Linting](https://github.com/typescript-eslint/typescript-eslint)

```
yarn run lint
```

### [Prettier](https://prettier.io/)

```
yarn prettier src --write
# or
yarn run format
```
