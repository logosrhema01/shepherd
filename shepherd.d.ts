interface ShepherdOptions {
  classPrefix?: string;
  confirmCancel?: boolean | (() => Promise<boolean>);
  confirmCancelMessage?: string;
  defaultStepOptions?: StepOptions;
  exitOnEsc?: boolean;
  keyboardNavigation?: boolean;
  stepsContainer?: HTMLElement;
  modalContainer?: HTMLElement;
  steps?: Array<StepOptions | Step>;
  tourName?: string;
  useModalOverlay?: boolean;
}

interface ShepherdEvent {
  tour: Tour;
}

interface Shepherd {
  on(eventName: string, handler: (this: Shepherd, event: ShepherdEvent) => void, context?: any): void;
  off(eventName: string, handler?: (this: Shepherd, event: ShepherdEvent) => void): void;
  once(eventName: string, handler: (this: Shepherd, event: ShepherdEvent) => void, context?: any): void;
  activeTour: Tour | null;
}

declare const Shepherd: Shepherd;

declare class Tour {
  constructor(options?: ShepherdOptions);

  addStep(options: StepOptions | Step): Step;
  addSteps(steps: Array<StepOptions | Step>): void;
  getById(id: string): Step | undefined;
  isActive(): boolean;
  next(): void;
  back(): void;
  cancel(): void;
  hide(): void;
  show(stepIdOrIndex: string | number): void;
  start(): void;
  getCurrentStep(): Step | undefined;
  removeStep(id: string): void;

  on(eventName: string, handler: (this: Tour, event: ShepherdEvent) => void, context?: any): void;
  off(eventName: string, handler?: (this: Tour, event: ShepherdEvent) => void): void;
  once(eventName: string, handler: (this: Tour, event: ShepherdEvent) => void, context?: any): void;

  // Events
  on(eventName: "complete", handler: (this: Tour, event: ShepherdEvent) => void, context?: any): void;
  on(eventName: "cancel", handler: (this: Tour, event: ShepherdEvent) => void, context?: any): void;
  on(eventName: "hide", handler: (this: Tour, event: ShepherdEvent) => void, context?: any): void;
  on(eventName: "show", handler: (this: Tour, event: { step: Step; previous: Step | null }) => void, context?: any): void;
  on(eventName: "start", handler: (this: Tour, event: ShepherdEvent) => void, context?: any): void;
}

interface StepOptions {
  text?: string | HTMLElement | (() => string | HTMLElement);
  title?: string;
  attachTo?: { element: string | HTMLElement | (() => string | HTMLElement); on?: string };
  beforeShowPromise?: (() => Promise<void>) | null;
  buttons?: Array<{ text: string; action: (this: Step, event: MouseEvent) => void }>;
  classes?: string;
  scrollTo?: boolean;
  showCancelLink?: boolean;
  tetherOptions?: Tether.ITetherOptions;
  when?: (this: Step, event: string, ...args: any[]) => void;
}

declare class Step {
  constructor(tour: Tour, options: StepOptions);

  // Properties
  id: string;
  options: StepOptions;
  tour: Tour;

  // Methods
  cancel(): void;
  complete(): void;
  hide(): void;
  isOpen(): boolean;
  remove(): void;
  scrollTo(): void;
  show(): void;

  // Events
  on(eventName: string, handler: Function, context?: any): void;
  off(eventName: string, handler?: Function): void;
  once(eventName: string, handler: Function, context?: any): void;
}
