import { EasingFunction } from 'react-native';
interface ITransitionProps {
    initialValue: number | string;
    duration: number;
    easing?: EasingFunction;
    delay?: number;
    useNativeDriver?: boolean;
}
interface IBindTransitionProps<T = any> extends ITransitionProps {
    bindValue: T;
    bindMap: {
        [key: string]: T;
    };
}
export declare const useBindTransition: (props: IBindTransitionProps<any>) => any[];
export declare const useTransition: ({ initialValue, duration, easing, delay, useNativeDriver }: ITransitionProps) => readonly [any, (value: string | number) => Promise<void>];
export {};
