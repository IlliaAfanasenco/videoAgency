import Image from "next/image";

// Official FRAME NO. 9 logo (transparent PNG derived from the client's master file).
// "header": mark + wordmark in one line; "stack": mark above wordmark (footer).
export function Logo({ variant = "header" }: { variant?: "header" | "stack" }) {
  if (variant === "stack")
    return (
      <Image
        src="/brand/logo-stack.png"
        alt="FRAME NO. 9"
        width={677}
        height={549}
        unoptimized
        className="h-auto w-[130px] sm:w-[170px]"
      />
    );
  return (
    <Image
      src="/brand/logo-header.png"
      alt="FRAME NO. 9"
      width={367}
      height={88}
      priority
      unoptimized
      className="h-10 w-auto sm:h-11"
    />
  );
}
