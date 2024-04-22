import {
  ForwardRefExoticComponent,
  MutableRefObject,
  RefAttributes, useEffect,
  useRef,
  useState
} from "react";
import {IWrappedComponentProps} from "@/types/common";

export const withClickOutside = (
  WrappedComponent: ForwardRefExoticComponent<IWrappedComponentProps & RefAttributes<HTMLDivElement>>
) => {
  const Component = () => {
    const [open, setOpen] = useState<boolean>(false);
    const ref= useRef() as MutableRefObject<HTMLDivElement>;

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (!ref.current.contains(event.target as HTMLDivElement)) {
          setOpen(false);
        }
      }

      document.addEventListener('mousedown', handleClickOutside);

      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      }
    }, [ref]);

    return <WrappedComponent open={open} setOpen={setOpen} ref={ref} />
  }

  return Component;
}
