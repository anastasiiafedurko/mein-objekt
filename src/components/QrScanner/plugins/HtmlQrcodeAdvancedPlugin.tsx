import { Html5Qrcode, Html5QrcodeScannerState } from "html5-qrcode";
import type { Html5QrcodeScannerConfig } from "html5-qrcode/esm/html5-qrcode-scanner";
import { forwardRef, useCallback, useEffect, useRef } from "react";

type PluginState =
  | "initial"
  | "starting"
  | "started"
  | "startingFailed"
  | "stoppingFailed";

export interface IHtmlQrcodePluginForwardedRef {
  pause: () => void;
  resume: () => void;
}

interface IHtmlQrcodeAdvancedPluginProps {
  config: Html5QrcodeScannerConfig;
  cameraId: string;
  onCodeScanned: (code: string) => void;
  qrcodeRegionId: string;
  waitPeriod?: number;
  className?: string;
}

export const HtmlQrcodeAdvancedPlugin = forwardRef<
  IHtmlQrcodePluginForwardedRef,
  IHtmlQrcodeAdvancedPluginProps
>(function HtmlQrcodePluginComp(
  {
    config,
    qrcodeRegionId,
    cameraId,
    onCodeScanned,
    waitPeriod = 750,
    className,
  }: IHtmlQrcodeAdvancedPluginProps,
  ref
) {
  const html5Qrcode = useRef<null | Html5Qrcode>(null);

  const resumeAfterWaitPeriod = useCallback(() => {
    setTimeout(() => {
      if (html5Qrcode.current) {
        const state = html5Qrcode.current?.getState();
        if (state === Html5QrcodeScannerState.PAUSED) {
          html5Qrcode.current?.resume();
        }
      }
    }, waitPeriod);
  }, [waitPeriod]);
  const pause = useCallback(() => {
    const state = html5Qrcode.current?.getState();
    if (state === Html5QrcodeScannerState.SCANNING) {
      html5Qrcode.current?.pause(true);
    }
  }, []);

  const innerRef = useRef<IHtmlQrcodePluginForwardedRef>({
    pause,
    resume: resumeAfterWaitPeriod,
  });

  useEffect(() => {
    if (ref) {
      if (typeof ref === "function") {
        ref(innerRef.current);
      } else {
        ref.current = innerRef.current;
      }
    }
  }, [ref]);

  useEffect(() => {
    if (!html5Qrcode.current) {
      html5Qrcode.current = new Html5Qrcode(qrcodeRegionId);
    }
    const prevQrcodeRegionId = qrcodeRegionId;
    return () => {
      if (html5Qrcode.current && prevQrcodeRegionId !== qrcodeRegionId) {
        // stopping due changed qrcodeRegionId
        html5Qrcode.current
          ?.stop()
          .then(() => {
            // camera stopped
          })
          .catch(() => {
            // camera failed to stop
          });
      }
    };
  }, [qrcodeRegionId]);

  const pluginStateRef = useRef<PluginState>("initial");

  useEffect(() => {
    if (html5Qrcode.current && pluginStateRef.current !== "starting") {
      pluginStateRef.current = "starting";
      html5Qrcode.current
        .start({ facingMode: "environment" }, config, onCodeScanned, () => {
          // nothing scanned
        })
        .then(() => {
          // camera started
          pluginStateRef.current = "started";
        })
        .catch(() => {
          // camera start failed
          pluginStateRef.current = "startingFailed";
        });
    }
    return () => {
      if (html5Qrcode.current && pluginStateRef.current !== "starting") {
        html5Qrcode.current
          ?.stop()
          .then(() => {
            // camera stopped
            pluginStateRef.current = "initial";
          })
          .catch(() => {
            // camera failed to stop
            pluginStateRef.current = "stoppingFailed";
          });
      }
    };
  }, [cameraId, config, onCodeScanned]);
  return <div id={qrcodeRegionId} className={className} />;
});
