import type { ReactNode } from "react";
import clsx from "clsx";

export default function Button({
  id,
  title,
  rightIcon,
  leftIcon,
  containerClass,
}: {
  id?: string;
  title: string;
  rightIcon?: ReactNode;
  leftIcon?: ReactNode;
  containerClass?: string;
}) {
  return (
    <button
      id={id}
      className={clsx(
        "group relative z-10 w-fit cursor-pointer overflow-hidden rounded-full bg-knifida-primary px-7 py-3 text-white font-display tracking-wider uppercase text-sm",
        containerClass
      )}
    >
      {leftIcon}

      <span className="relative inline-flex overflow-hidden font-display text-xs uppercase">
        <div className="translate-y-0 skew-y-0 transition duration-500 group-hover:translate-y-[-160%] group-hover:skew-y-12">
          {title}
        </div>
        <div className="absolute translate-y-[164%] skew-y-12 transition duration-500 group-hover:translate-y-0 group-hover:skew-y-0">
          {title}
        </div>
      </span>

      {rightIcon}
    </button>
  );
}
