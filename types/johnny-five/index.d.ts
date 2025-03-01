// Type definitions for johnny-five 1.3.0
// Project: https://github.com/rwaldron/johnny-five
// Definitions by: Toshiya Nakakura <https://github.com/nakakura>
//                 Simon Colmer <https://github.com/workshop2>
//                 XtrimSystems <https://github.com/xtrimsystems>
//                 Marcin Obiedziński <https://github.com/marcinobiedz>
//                 Nicholas Hehr <https://github.com/HipsterBrown>
//                 Scott González <https://github.com/scottgonzalez>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 3.5

///<reference types="node"/>

import EventEmitter = require('events');

declare class Emitter extends EventEmitter {
    pause: () => void;
    resume: () => void;
}

declare class Withinable extends Emitter {
    within(range: Array<number> | number, unit: string, callback: (value: any) => void): void;
    within(range: Array<number> | number, callback: (value: any) => void): void;
}

export interface AccelerometerOption {
    board?: Board | undefined;
    controller: string;
}

export interface AccelerometerGeneralOption {
    board?: Board | undefined;
    controller?: string | undefined;
}

export interface AccelerometerAnalogOption extends AccelerometerGeneralOption {
    pins: Array<string>;
    sensitivity?: number | undefined;
    aref?: number | undefined;
    zeroV?: number | Array<number> | undefined;
    autoCalibrate?: boolean | undefined;
}

export interface AccelerometerMPU6050Option extends AccelerometerGeneralOption {
    sensitivity?: number | undefined;
}

export interface AccelerometerMMA7361Option extends AccelerometerGeneralOption {
    sleepPin?: number | string | undefined;
}

export declare class Accelerometer extends Emitter {
    constructor(
        option:
            | AccelerometerGeneralOption
            | AccelerometerAnalogOption
            | AccelerometerMPU6050Option
            | AccelerometerMMA7361Option,
    );

    id: string;
    zeroV: number;
    pins: Array<string>;
    readonly pitch: number;
    readonly roll: number;
    readonly x: number;
    readonly y: number;
    readonly z: number;
    readonly acceleration: number;
    readonly inclination: number;
    readonly orientation: number;

    on(event: string, cb: () => void): this;
    on(event: 'change', cb: () => void): this;
    on(event: 'data', cb: (freq: any) => void): this;
    hasAxis(name: string): void;
    enable(): void;
    disable(): void;
}

export interface AltimeterOption {
    board?: Board | undefined;
    controller: string;
    address?: number | undefined;
    freq?: number | undefined;
    elevation?: number | undefined;
}

export declare class Altimeter extends Emitter {
    constructor(option: AltimeterOption);

    id: string;
    readonly feet: number;
    readonly meters: number;

    on(event: string, cb: () => void): this;
    on(event: 'change', cb: () => void): this;
    on(event: 'data', cb: (data: any) => void): this;
}

export declare class Animation extends Emitter {
    constructor(option: Servo | Array<Servo>);

    target: number;
    duration: number;
    cuePoints: Array<number>;
    keyFrames: number;
    easing: string;
    loop: boolean;
    loopback: number;
    metronomic: boolean;
    progress: number;
    currentSpeed: number;
    fps: number;

    enqueue(segment: any): void;
    play(): void;
    // pause(): void; — already defined in Emitter. This is probably an oversight in johnny-five’s code.
    stop(): void;
    next(): void;
    speed(speed: Array<number>): void;
}

export interface BoardOption {
    id?: number | string | undefined;
    port?: string | any | undefined;
    repl?: boolean | undefined;
    debug?: boolean | undefined;
    timeout?: number | undefined;
    io?: any;
}

export interface BoardLogEvent {
    type: 'info' | 'warn' | 'fail';
    timestamp: number;
    class: string;
    message: string;
}

export declare class Board extends Emitter {
    constructor(option?: BoardOption);

    io: any;
    id: string;
    repl: Repl;
    isReady: boolean;
    pins: Array<Pin>;
    port: string;

    on(event: 'close', cb: () => void): this;
    on(event: 'connect', cb: () => void): this;
    on(event: 'error', cb: (error: Error) => void): this;
    on(event: 'exit', cb: () => void): this;
    on(event: 'fail', cb: (event: BoardLogEvent) => void): this;
    on(event: 'info', cb: (event: BoardLogEvent) => void): this;
    on(event: 'message', cb: (event: BoardLogEvent) => void): this;
    on(event: 'ready', cb: () => void): this;
    on(event: 'warn', cb: (event: BoardLogEvent) => void): this;
    pinMode(pin: number | string, mode: number): void;
    analogWrite(pin: number | string, value: number): void;
    analogRead(pin: number | string, cb: (item: number) => void): void;
    digitalWrite(pin: number | string, value: number): void;
    digitalRead(pin: number | string, cb: (item: number) => void): void;
    servoWrite(pin: number | string, angle: number): void;
    shiftOut(dataPin: Pin, clockPin: Pin, isBigEndian: boolean, value: number): void;
    wait(ms: number, cb: () => void): void;
    loop(ms: number, cb: () => void): void;
    samplingInterval(ms: number): void;
}

export interface ButtonOption {
    board?: Board | undefined;
    pin: number | string;
    invert?: boolean | undefined;
    isPullup?: boolean | undefined;
    isPulldown?: boolean | undefined;
    holdtime?: number | undefined;
    debounce?: number | undefined;
}

export declare class Button extends Emitter {
    constructor(pin: number | string | ButtonOption);

    id: string;
    pin: number | string;
    downValue: number;
    upValue: number;
    holdtime: number;

    on(event: string, cb: () => void): this;
    on(event: 'hold', cb: (holdTime: number) => void): this;
    on(event: 'down', cb: () => void): this;
    on(event: 'press', cb: () => void): this;
    on(event: 'up', cb: () => void): this;
    on(event: 'release', cb: () => void): this;
}

export interface CollectionPinOptions {
    pins: Array<string | number>;
    [key: string]: any;
}

export declare class Collection<Base = {}> {
    static installMethodForwarding(target: object, source: object): object;

    constructor(options: Array<number | string | object> | CollectionPinOptions);

    type?: Base | undefined;

    add(...args: Array<number | object>): number;

    each(callback: (item: Base, index: number) => void): this;

    forEach(callback: (item: Base, index: number) => void): this;

    includes(item: Base): boolean;

    indexOf(item: Base): number;

    map(callback: (item: Base, index: number) => void): Array<any>;

    slice(begin?: number, end?: number): Collection<Base>;

    byId(id: any): Base | undefined;
}

export interface CompassOption {
    board?: Board | undefined;
    controller: string;
    gauss?: number | undefined;
}

export declare class Compass extends Emitter {
    constructor(option: CompassOption);

    readonly heading: number;
    readonly bearing: { name: string; abbr: string; low: number; high: number; heading: number };

    on(event: string, cb: () => void): this;
    on(event: 'change', cb: () => void): this;
    on(event: 'data', cb: (data: any) => void): this;
}

export interface ESCOption {
    board?: Board | undefined;
    pin: number | string;
    pwmRange?: Array<number> | undefined;
    address?: string | undefined;
    controller?: 'PCA9685' | 'DEFAULT' | undefined;
    device?: 'FORWARD' | 'FORWARD_REVERSE' | 'FORWARD_REVERSE_BRAKE' | undefined;
    neutral?: number | undefined;
}

export declare class ESC {
    static Collection: ESCs;

    constructor(option: number | string | ESCOption);

    id: string;
    pin: number | string;
    pwmRange: Array<number>;
    readonly value: number;

    throttle(value: number): this;
    brake(): this;
}

export declare class ESCs extends Collection<ESC> {
    constructor(option: Array<number | string | ESCOption>);

    throttle(value: number): this;
    brake(): this;
}

export declare class Fn {
    static constrain(value: number, lower: number, upper: number): number;
    static inRange(value: number, lower: number, upper: number): boolean;
    static map(value: number, fromLow: number, fromHigh: number, toLow: number, toHigh: number): number;
    static fmap(value: number, fromLow: number, fromHigh: number, toLow: number, toHigh: number): number;
    static range(lower: number, upper: number, tick: number): Array<number>;
    static scale(value: number, fromLow: number, fromHigh: number, toLow: number, toHigh: number): number;
    static fscale(value: number, fromLow: number, fromHigh: number, toLow: number, toHigh: number): number;
    static sum(values: Array<number>): number;
    static toFixed(number: number, digits: number): number;
    static uid(): string;
    static bitSize(n: number): number;
    static bitValue(bit: number): number;
    static int16(msb: number, lsb: number): number;
    static uint16(msb: number, lsb: number): number;
    static int24(b16: number, b8: number, b0: number): number;
    static uint24(b16: number, b8: number, b0: number): number;
    static int32(b24: number, b16: number, b8: number, b0: number): number;
    static uint32(b24: number, b16: number, b8: number, b0: number): number;
}

export interface GyroGeneralOption {
    board?: Board | undefined;
    controller?: string | undefined;
}

export interface GyroAnalogOption extends GyroGeneralOption {
    pins: Array<string>;
    sensitivity: number;
    resolution?: number | undefined;
}

export interface GyroMPU6050Option extends GyroGeneralOption {
    sensitivity: number;
}

export declare class Gyro extends Emitter {
    constructor(option: GyroGeneralOption | GyroAnalogOption | GyroMPU6050Option);

    id: string;
    pins: Array<string>;
    readonly isCalibrated: boolean;
    readonly pitch: any;
    readonly roll: any;
    readonly yaw: any;
    readonly rate: any;
    readonly x: number;
    readonly y: number;
    readonly z: number;

    on(event: string, cb: () => void): this;
    on(event: 'change', cb: () => void): this;
    on(event: 'data', cb: (data: any) => void): this;
    recalibrate(): void;
}

export interface HygrometerOption {
    board?: Board | undefined;
    controller?: string | undefined;
    freq?: number | undefined;
}

export declare class Hygrometer extends Emitter {
    constructor(option: HygrometerOption);

    id: string;
    readonly relativeHumidity: number;
    readonly RH: number;

    on(event: string, cb: () => void): this;
    on(event: 'change', cb: () => void): this;
    on(event: 'data', cb: (data: any) => void): this;
}

export interface IMUGeneralOption {
    controller?: string | undefined;
    freq?: number | undefined;
}

export interface IMUMPU6050Option extends IMUGeneralOption {
    address: number;
}

export declare class IMU extends Emitter {
    constructor(option: IMUGeneralOption | IMUMPU6050Option);

    readonly accelerometer: Accelerometer;
    readonly compass: Compass;
    readonly gyro: Gyro;
    readonly orientation: Orientiation;
    readonly thermometer: Thermometer;

    on(event: string, cb: () => void): this;
    on(event: 'change', cb: () => void): this;
    on(event: 'data', cb: (data: any) => void): this;
    on(event: 'calibrated', cb: () => void): this;
}

export declare module IR {
    export interface ArrayOption {
        pins: Array<number> | Array<string>;
        emitter: number | string;
        freq?: number | undefined;
    }

    export interface LoadCalibrationOption {
        min: Array<number>;
        max: Array<number>;
    }

    export module Reflect {
        export class Array {
            constructor(option: ArrayOption);
            enable(): void;
            disable(): void;
            calibrate(): void;
            calibrateUntil(predicate: () => void): void;
            loadCalibration(option: LoadCalibrationOption): void;
            on(event: string, cb: () => void): this;
            on(event: 'data', cb: (data: any) => void): this;
            on(event: 'calibratedData', cb: (data: any) => void): this;
            on(event: 'line', cb: (data: any) => void): this;
        }
    }
}

export interface JoystickOption {
    board?: Board | undefined;
    pins: Array<string>;
    invert?: boolean | undefined;
    invertX?: boolean | undefined;
    invertY?: boolean | undefined;
}

export declare class Joystick extends Emitter {
    constructor(option: JoystickOption);

    id: string;
    readonly x: number;
    readonly y: number;
    axis: Array<number>;
    raw: Array<number>;

    on(event: string, cb: () => void): this;
    on(event: 'data', cb: ({ x, y }: { x: number; y: number }) => void): this;
    on(event: 'change', cb: ({ x, y }: { x: number; y: number }) => void): this;
}

export interface LCDGeneralOption {
    board?: Board | undefined;
    rows?: number | undefined;
    cols?: number | undefined;
}

export interface LCDI2COption extends LCDGeneralOption {
    controller: string;
    backlight?: number | undefined;
}

export interface LCDParallelOption extends LCDGeneralOption {
    pins: Array<any>;
    backlight?: number | undefined;
}

export declare class LCD {
    constructor(option: LCDGeneralOption | LCDI2COption | LCDParallelOption);

    id: string;
    rows: number;
    cols: number;

    print(message: string): this;
    useChar(char: string): this;
    clear(): this;
    cursor(row: number, col: number): this;
    home(): this;
    on(): this;
    off(): this;
    display(): this;
    noDisplay(): this;
    blink(): this;
    noBlink(): this;
    autoscroll(): this;
    noAutoscroll(): this;
    bgColor(color: any): this;
    noBacklight(): this;
    backlight(): this;
}

export interface LedOption {
    board?: Board | undefined;
    pin: number | string;
    type?: string | undefined;
    controller?: string | undefined;
    address?: number | undefined;
    isAnode?: boolean | undefined;
}

export declare class Led {
    constructor(option: LedOption['pin'] | LedOption);

    animation: Animation;
    id: string;
    isOn: boolean;
    isRunning: boolean;
    mode: Pin['mode'];
    pin: number;
    value: number;

    blink(ms?: number, callback?: () => void): this;
    blink(callback?: () => void): this;
    brightness(val: number): this;
    fade(brightness: number, ms?: number, callback?: () => void): this;
    fadeIn(ms?: number, callback?: () => void): this;
    fadeOut(ms?: number, callback?: () => void): this;
    off(): this;
    on(): this;
    pulse(ms?: number, callback?: () => void): this;
    stop(): this;
    strobe(ms?: number, callback?: () => void): this;
    strobe(callback?: () => void): this;
    toggle(): this;
}

export declare module Led {
    export interface DigitsOption {
        board?: Board | undefined;
        pins: any;
        devices?: number | undefined;
        controller?: string | undefined;
    }

    export class Digits {
        constructor(option: DigitsOption);

        readonly isMatrix: boolean;
        readonly devices: number;
        digitOrder: number;

        on(): void;
        on(index: number): void;
        off(): void;
        off(index: number): void;
        clear(): void;
        clear(index: number): void;
        brightness(value: number): void;
        brightness(index: number, value: number): void;
        draw(position: number, character: number): void;
        draw(index: number, position: number, character: number): void;
    }

    export interface MatrixOption {
        board?: Board | undefined;
        pins: any;
        devices?: number | undefined;
    }

    export interface MatrixIC2Option {
        board?: Board | undefined;
        controller: string;
        addresses?: Array<any> | undefined;
        isBicolor?: boolean | undefined;
        dims?: any;
        rotation?: number | undefined;
    }

    export class Matrix {
        constructor(option: MatrixOption | MatrixIC2Option);

        readonly isMatrix: boolean;
        readonly devices: number;

        on(): void;
        on(index: number): void;
        off(): void;
        off(index: number): void;
        clear(): void;
        clear(index: number): void;
        brightness(value: number): void;
        brightness(index: number, value: number): void;
        led(row: number, col: number, state: any): void;
        led(index: number, row: number, col: number, state: any): void;
        row(row: number, val: number): void;
        row(index: number, row: number, val: number): void;
        column(row: number, val: number): void;
        column(index: number, row: number, val: number): void;
        draw(position: number, character: number): void;
        draw(index: number, position: number, character: number): void;
    }

    export interface RGBOption {
        board?: Board | undefined;
        pins: Array<number> | { blue: number; green: number; red: number };
        isAnode?: boolean | undefined;
        controller?: string | undefined;
    }

    export class RGB {
        constructor(option: RGBOption);

        red: Led;
        green: Led;
        blue: Led;
        readonly isAnode: boolean;

        on(): void;
        off(): void;
        color(value: string): void;
        toggle(): void;
        strobe(ms: number): void;
        intensity(value: number): void;
        fadeIn(ms: number): void;
        fadeOut(ms: number): void;
        pulse(ms: number): void;
        stop(ms: number): void;
    }
}

export interface MotionOption {
    board?: Board | undefined;
    pin: number | string;
}

export declare class Motion extends Emitter {
    constructor(option: number | MotionOption);
    on(event: string, cb: () => void): this;
    on(event: 'data', cb: (data: any) => void): this;
    on(event: 'motionstart', cb: () => void): this;
    on(event: 'motionend', cb: () => void): this;
    on(event: 'calibrated', cb: () => void): this;
}

export interface MotorPins {
    pwm: number;
    dir: number;
    cdir?: number | undefined;
    brake?: number | undefined;
}

export interface MotorOption {
    board?: Board | undefined;
    pins: MotorPins;
    current?: SensorOption | undefined;
    invertPWM?: boolean | undefined;
    address?: number | undefined;
    controller?: string | undefined;
    register?: any;
    bits?: any;
}

export declare class Motor extends Emitter {
    constructor(option: number[] | MotorOption);

    readonly isOn: boolean;

    forward(speed: number): void;
    fwd(speed: number): void;
    reverse(speed: number): void;
    rev(speed: number): void;
    start(speed?: number): void;
    stop(): void;
    brake(): void;
    release(): void;
}

export declare class Motors {
    constructor(option: number[] | MotorOption[]);

    readonly isOn: boolean;

    forward(speed: number): void;
    fwd(speed: number): void;
    reverse(speed: number): void;
    rev(speed: number): void;
    start(speed?: number): void;
    stop(): void;
    brake(): void;
    release(): void;
}

export interface OrientiationOption {
    board?: Board | undefined;
    controller?: string | undefined;
    freq?: number | undefined;
}

export declare class Orientiation extends Emitter {
    constructor(option: OrientiationOption);

    readonly euler: any;
    readonly quarternion: any;

    on(event: string, cb: () => void): this;
    on(event: 'change', cb: () => void): this;
    on(event: 'data', cb: (data: any) => void): this;
    on(event: 'calibrated', cb: () => void): this;
}

export interface PiezoOption {
    board?: Board | undefined;
    pin: number;
}

export interface PiezoTune {
    tempo?: number;
    song: [frequency: string | null, duration: number][];
}

export declare class Piezo {
    constructor(option: number | PiezoOption);

    id: string;
    pin: number;
    readonly mode: number;
    readonly isPlaying: boolean;

    frequency(frequency: number, duration: number): void;
    play(tune: PiezoTune, cb?: () => void): void;
    tone(tone: number, duration: number): void;
    noTone(): void;
    off(): void;
}

export interface PinOption {
    board?: Board | undefined;
    id?: number | string | undefined;
    pin: number | string;
    type?: string | undefined;
}

export interface PinState {
    supportedModes: Array<number>;
    mode: number;
    value: number;
    report: number;
    analogChannel: number;
}

export declare class Pin extends Emitter {
    constructor(option: number | string | PinOption);

    id: number | string;
    pin: number | string;
    type: 'digital' | 'analog';
    value: number;
    mode: number;

    static write(pin: number, value: number): void;
    static read(pin: number, cb: (error: Error, data: number) => void): void;
    query(cb: (pin: PinState) => void): void;
    high(): void;
    low(): void;
    write(value: number): void;
    read(cb: (error: Error, value: number) => void): void;
    on(event: string, cb: () => void): this;
    on(event: 'high', cb: () => void): this;
    on(event: 'low', cb: () => void): this;
    on(event: 'data', cb: (data: any) => void): this;
}

export interface PingOption {
    pin: number | string;
    freq?: number | undefined;
    pulse?: number | undefined;
}

export declare class Ping {
    constructor(option: number | PingOption);
}

export declare interface ProximityOption {
    board?: Board | undefined;
    pin: number | string;
    controller: string;
    freq?: number | undefined;
}

export declare interface ProximityData {
    cm: number;
    in: number;
}

export declare class Proximity extends Withinable {
    constructor(option: number | ProximityOption);
    on(event: string, cb: () => void): this;
    on(event: 'data', cb: (data: ProximityData) => void): this;
    on(event: 'change', cb: () => void): this;
}

export interface RelayOption {
    board?: Board | undefined;
    pin: number | string;
    type?: string | undefined;
}

export declare class Relay {
    constructor(option: number | RelayOption);

    id: string;
    pin: number | string;
    readonly isOn: boolean;
    readonly type: string;

    open(): void;
    close(): void;
    toggle(): void;
}

export interface Repl {
    inject(object: any): void;
}

export interface SensorOption {
    board?: Board | undefined;
    pin: number | string;
    freq?: number | undefined;
    threshold?: number | undefined;
    enabled?: boolean | undefined;
}

export declare class Sensor extends Withinable {
    constructor(option: number | string | SensorOption);

    id: string;
    pin: number | string;
    threshold: number;
    readonly boolean: boolean;
    readonly raw: number;
    readonly analog: number;
    readonly constrained: number;
    readonly value: number;

    scaleTo(low: number, high: number): number;
    fscaleTo(low: number, high: number): number;
    scaleTo(range: Array<number>): number;
    fscaleTo(range: Array<number>): number;
    booleanAt(barrier: number): boolean;
    within(range: Array<number>, cb: () => void): void;
    on(event: string, cb: () => void): this;
    on(event: 'change', cb: () => void): this;
    on(event: 'data', cb: (data: any) => void): this;
}

export interface ServoGeneralOption {
    board?: Board | undefined;
    pin: number | string;
    range?: Array<number> | undefined;
    type?: string | undefined;
    startAt?: number | undefined;
    isInverted?: boolean | undefined;
    center?: boolean | undefined;
    controller?: string | undefined;
}

export interface ServoPCA9685Option extends ServoGeneralOption {
    address?: number | undefined;
}

export interface ServoSweepOpts {
    range: Array<number>;
    interval?: number | undefined;
    step?: number | undefined;
}

export declare class Servo extends Emitter {
    constructor(option: number | string | ServoGeneralOption);

    id: string;
    pin: number | string;
    range: Array<number>;
    invert: boolean;
    history: Array<any>;
    interval: number;
    isMoving: boolean;
    readonly last: any;
    readonly position: number;
    value: number;
    startAt: number;

    to(degrees: number, ms?: number, rage?: number): void;
    min(): void;
    max(): void;
    center(): void;
    home(): void;
    sweep(): void;
    sweep(range: Array<number>): void;
    sweep(opt: ServoSweepOpts): void;
    stop(): void;
    cw(speed: number): void;
    ccw(speed: number): void;
    on(event: string, cb: () => void): this;
    on(event: 'move:complete', cb: () => void): this;
}

export interface ShiftRegisterOption {
    board?: Board | undefined;
    pins: any;
    isAnode?: boolean | undefined;
}

export declare class ShiftRegister {
    constructor(option: ShiftRegisterOption);

    id: string;
    pins: any;
    readonly value: any;
    readonly isAnode: boolean;

    clear(): void;
    display(number: number | string): void;
    reset(): void;
    send(...value: Array<number>): void;
}

export interface SonarOption {
    board?: Board | undefined;
    pin: number | string;
    device: string;
    freq?: number | undefined;
    threshold?: number | undefined;
}

export declare class Sonar {
    constructor(option: number | string | SonarOption);

    within(range: Array<number>, cb: () => void): void;
    within(range: Array<number>, unit: string, cb: () => void): void;
    on(event: string, cb: () => void): this;
    on(event: 'change', cb: () => void): this;
    on(event: 'data', cb: (data: any) => void): this;
}

export interface StepperOption {
    board?: Board | undefined;
    pins: any;
    stepsPerRev: number;
    type: number;
    rpm?: number | undefined;
    direction?: number | undefined;
}

export declare module Stepper {
    export class TYPE {
        static DRIVER: number;
        static TWO_WIRE: number;
        static FOUR_WIRE: number;
    }
}

export declare class Stepper {
    constructor(option: number | string | StepperOption);

    step(stepsOrOpts: any, cb: () => void): void;
    rpm(): Stepper;
    rpm(value: number): Stepper;
    speed(): Stepper;
    speed(value: number): Stepper;
    direction(): Stepper;
    direction(value: number): Stepper;
    accel(): Stepper;
    accel(value: number): Stepper;
    decel(): Stepper;
    decel(value: number): Stepper;
    cw(): Stepper;
    ccw(): Stepper;
    within(range: Array<number>, cb: () => void): void;
    within(range: Array<number>, unit: string, cb: () => void): void;
    on(event: string, cb: () => void): this;
    on(event: 'change', cb: () => void): this;
    on(event: 'data', cb: (data: any) => void): this;
}

export interface SwitchOption {
    board?: Board | undefined;
    pin: number | string;
    type?: 'NO' | 'NC' | undefined;
}

export declare class Switch extends Emitter {
    constructor(option: number | string | SwitchOption);

    id: string;
    pin: number | string;
    readonly isClosed: boolean;
    readonly isOpen: boolean;

    on(event: 'open', cb: () => void): this;
    on(event: 'close', cb: () => void): this;
}

export interface ThermometerOption {
    board?: Board | undefined;
    controller?: string | undefined;
    pin: string | number;
    toCelsius?: ((val: number) => number) | undefined;
    freq?: number | undefined;
}

export declare class Thermometer extends Withinable {
    constructor(option: ThermometerOption);

    id: string;
    pin: number | string;
    readonly celsius: number;
    readonly fahrenheit: number;
    readonly kelvin: number;
    readonly C: number;
    readonly F: number;
    readonly K: number;

    on(event: string, cb: () => void): this;
    on(event: 'data', cb: (data: any) => void): this;
    on(event: 'change', cb: () => void): this;
}
