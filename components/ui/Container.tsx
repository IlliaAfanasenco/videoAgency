import type { ElementType, ComponentPropsWithoutRef } from "react";

type ContainerProps<T extends ElementType> = {
  as?: T;
  className?: string;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "className">;

/**
 * Page container: max 1440px, centered, responsive inline gutters (20/32/48/64px).
 * Styling lives in the `container-x` utility (app/globals.css); sections that need to stay a
 * single element (refs, data-attributes) can apply that class directly.
 */
export function Container<T extends ElementType = "div">({
  as,
  className = "",
  ...props
}: ContainerProps<T>) {
  const Tag: ElementType = as ?? "div";
  return <Tag className={`container-x ${className}`.trim()} {...props} />;
}
