# react-native-use-transition 🐰
Hooks built purely based on react-native animated API to help you do transitions or animations.

## How to use

### install
```
yarn add react-native-use-transition
```

or

```
npm i react-native-use-transition --save
```

note: `react` and `react-native` are required peer dependencies.

### Usage1: bind a transition with your state (recommended)
```javascript
  import { useEffect, useState } from 'react'
  import { Animated, Easing, Text } from 'react-native';
  import { useBindTransition } from 'react-native-use-transition';

  const MyComponent = () => {
    const [componentVisible, setComponentVisible] = useState(true)

    // bind the opacity transition with 'componentVisible' state
    const [opacity] = useBindTransition({
      initValue: 1,
      duration: 200,
      easing: Easing.linear,
      bindValue: componentVisible,
      bindMap: {
        true: 1,
        false: 0
      }
    })

    // change the state, and it will fade out after 300ms
    useEffect(() => {
      setTimeout(() => setComponentVisible(false), 300)
    }, [])

    return <Text as={Animated.Text} style={{opacity}}>
      Hello world!
    </Text>
  }
```


### Usage2: do the transition manually

```javascript
  import { useEffect } from 'react'
  import { Animated, Easing, Text } from 'react-native';
  import { useTransition } from 'react-native-use-transition';

  const MyComponent = () => {
    const [opacity, changeOpacity] = useTransition({
      initValue: 1,
      duration: 200,
      easing: Easing.linear,
    })

    // set opacity to 0, there will be a transition from 1 to 0
    useEffect(() => {
      setTimeout(() => changeOpacity(0), 300)
    }, [])

    return <Text as={Animated.Text} style={{opacity}}>
      Hello world!
    </Text>
  }
```


### More complex transition
`react-native-use-transition` takes the advantages of [interpolartion](https://reactnative.dev/docs/animations#interpolation), which enables you to do string transitions like from `0deg` to `90deg` etc.

```javascript
  import { useEffect, useState } from 'react'
  import { Animated, Easing, Text } from 'react-native';
  import { useBindTransition } from 'react-native-use-transition';

  const MyComponent = () => {
    const [componentRotated, setComponentRotated] = useState(false)

    const [componentRotation] = useBindTransition({
      initValue: '0deg',
      duration: 200,
      easing: Easing.linear,
      bindValue: componentRotated,
      bindMap: {
        true: '90deg',
        false: '0deg'
      }
    })

    useEffect(() => {
      setTimeout(() => setComponentRotated(true), 300)
    }, [])

    return <Text as={Animated.Text} style={{transform: [{rotate: componentRotation}]}}>
      Hello world!
    </Text>
  }
```

