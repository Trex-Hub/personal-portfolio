"use client";

import { Iphone15Pro } from "@/components/molecules/iphone";
import { Safari } from "@/components/molecules/safari";
import { useIsMobile } from "@/hooks/use-mobile";
import { SVGProps } from "react";

type SafariMode = "default" | "simple";

export interface DeviceProps extends SVGProps<SVGSVGElement> {
  mobile: {
    width?: number;
    height?: number;
    src?: string;
    videoSrc?: string;
  };
  desktop: {
    url?: string;
    imageSrc?: string;
    videoSrc?: string;
    width?: number;
    height?: number;
    mode?: SafariMode;
  };
  onlyDesktop?: boolean;
  onlyMobile?: boolean;
}

export function Device({
  mobile,
  desktop,
  onlyDesktop,
  onlyMobile,
}: DeviceProps) {
  const isMobile = useIsMobile();

  if (onlyDesktop) {
    return <Safari {...desktop} />;
  }
  if (onlyMobile) {
    return <Iphone15Pro {...mobile} />;
  }

  return isMobile ? <Iphone15Pro {...mobile} /> : <Safari {...desktop} />;
}
