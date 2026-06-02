import { useRef, useEffect, type ComponentType } from "react";

type IconRef = { startAnimation: () => void; stopAnimation: () => void };

type Props = {
  icon: ComponentType<{ ref?: React.Ref<IconRef>; size?: number; duration?: number; color?: string; isAnimated?: boolean }>;
  size?: number;
  duration?: number;
  color?: string;
};

export default function AutoAnimatedIcon({ icon: Icon, size, duration, color }: Props) {
  const ref = useRef<IconRef>(null);

  useEffect(() => {
    const dur = (duration ?? 1) * 1200;
    let timer: ReturnType<typeof setTimeout>;

    const play = () => {
      ref.current?.startAnimation();
      timer = setTimeout(() => {
        ref.current?.stopAnimation();
        timer = setTimeout(play, 300);
      }, dur);
    };

    timer = setTimeout(play, 100);
    return () => clearTimeout(timer);
  }, [duration]);

  return <Icon ref={ref} size={size} duration={duration} color={color} isAnimated />;
}
