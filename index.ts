import { useEffect, useState, useRef} from "react"
import { EasingFunction, Animated } from 'react-native'

interface ITransitionProps {
  initialValue: number | string
  duration: number // in ms
  easing?: EasingFunction
  delay?: number
  useNativeDriver?: boolean
}

interface IBindTransitionProps<T = any> extends ITransitionProps {
  bindValue: T,
  bindMap: {
    [key: string]: T
  }
}

export const useBindTransition = (props: IBindTransitionProps) => {
  const [animatedValue, doTransition] = useTransition({
    ...props
  })

  useEffect(() => {
    doTransition(props.bindMap[props.bindValue])
  }, [props.bindValue])

  return [animatedValue, doTransition]
}

export const useTransition = ({
  initialValue,
  duration,
  easing,
  delay,
  useNativeDriver = false
}: ITransitionProps) => {
  // the property value, transition starts when its value changed
  let propValue = useRef(initialValue)
  // track old value to do the transition
  let oldPropValue = useRef(initialValue) 

  // animate source for Animated.timing
  let animatedSource = new Animated.Value(0)
  // the actual animated value, user apply animated value to element style
  // animatedValue change triggers component update, so we use 'useState' here
  let [animatedValue, updateAnimatedValue] = useState(
    animatedSource.interpolate({
      inputRange: [0, 1],
      outputRange: [initialValue, initialValue] as (number[] | string[])
    })
  )

  const doTransition = (value: number | string): Promise<void> => {
    propValue.current = value
    const from = oldPropValue.current
    const to = propValue.current

    return new Promise(rs => {
      // do transition only when there IS a change
      if(from !== undefined && from !== to) {
        // renew source value every time
        animatedSource = new Animated.Value(0)
        // and recreate an interpolation that will trigger component update
        updateAnimatedValue(animatedSource.interpolate({
          inputRange: [0, 1],
          outputRange: [from, to] as (number[] | string[])
        }))
        
        // update the old value immediatly, otherwise you cannot playback while a animation is currently playing
        // because the old value hasn't changed which will make from === to and it will ignore the new incoming animation
        oldPropValue.current = propValue.current
        // do the animation
        Animated.timing(animatedSource, {
            toValue: 1,
            duration: duration,
            easing: easing,
            delay: delay || 0,
            useNativeDriver,
        }).start(() => {
          rs()
        })
        
      } else {
        rs()
      }
    })   
  }


  return <const>[animatedValue, doTransition]
}