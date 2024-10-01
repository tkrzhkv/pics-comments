import { FC, PropsWithChildren, Suspense } from "react";
import { Loader } from "@/shared/ui/loader";

export const SuspenseLayout: FC<PropsWithChildren> = ({ children }) => {
  return <Suspense fallback={<Loader />}>{children}</Suspense>;
};
