export type AddEventResult = () => void;

export const addEvent = <E extends Event>(
  target: EventTarget,
  name: string,
  fn: (event: E) => void,
  useCapture = false,
): AddEventResult => {
  target.addEventListener(name, fn as EventListener, useCapture);
  return () => {
    target.removeEventListener(name, fn as EventListener, useCapture);
  };
};
