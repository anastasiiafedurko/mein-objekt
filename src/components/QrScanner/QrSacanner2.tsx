import {
  Html5Qrcode,
  Html5QrcodeScannerState,
  Html5QrcodeSupportedFormats,
} from "html5-qrcode";
import { Html5QrcodeScanType } from "html5-qrcode/esm/core";
import type { Html5QrcodeScannerConfig } from "html5-qrcode/esm/html5-qrcode-scanner";
import React, {
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

enum PluginState {
  Initial = "initial",
  Starting = "starting",
  Started = "started",
  StartingFailed = "startingFailed",
  StoppingFailed = "stoppingFailed",
}

interface IHtmlQrcodeAdvancedPluginProps {
  config: Html5QrcodeScannerConfig;
  cameraId: string;
  onCodeScanned: (code: string) => void;
  qrcodeRegionId: string;
  waitPeriod?: number;
  className?: string;
}

export interface IHtmlQrcodePluginForwardedRef {
  pause: () => void;
  resume: () => void;
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

  const pluginStateRef = useRef<PluginState>(PluginState.Initial);

  useEffect(() => {
    if (
      html5Qrcode.current &&
      pluginStateRef.current !== PluginState.Starting
    ) {
      pluginStateRef.current = PluginState.Starting;
      html5Qrcode.current
        .start({ facingMode: "environment" }, config, onCodeScanned, () => {
          // nothing scanned
        })
        .then(() => {
          // camera started
          pluginStateRef.current = PluginState.Started;
        })
        .catch(() => {
          // camera start failed
          pluginStateRef.current = PluginState.StartingFailed;
        });
    }
    return () => {
      if (
        html5Qrcode.current &&
        pluginStateRef.current !== PluginState.Starting
      ) {
        html5Qrcode.current
          ?.stop()
          .then(() => {
            // camera stopped
            pluginStateRef.current = PluginState.Initial;
          })
          .catch(() => {
            // camera failed to stop
            pluginStateRef.current = PluginState.StoppingFailed;
          });
      }
    };
  }, [cameraId, config, onCodeScanned]);
  return <div id={qrcodeRegionId} className={className} />;
});

interface IFetchCameras {
  loading: boolean;
  error?: Error;
  cameraDevices: CameraDevice[];
}
const defaultState: IFetchCameras = {
  loading: false,
  cameraDevices: [],
};

export const useFetchCameras = () => {
  const [state, setState] = useState<IFetchCameras>(defaultState);
  const fetchCameras = useCallback(async () => {
    try {
      if (!state.loading) {
        setState((prevState) => ({ ...prevState, loading: true }));
        const result = await Html5Qrcode.getCameras();
        setState({
          loading: false,
          cameraDevices: result,
        });
      }
    } catch (error) {
      setState({
        loading: false,
        error: new Error("Not permitted"),
        cameraDevices: [],
      });
    }
  }, [state.loading]);

  return { state, fetchCameras };
};

interface IInfoProps {
  title: string;
}

export const Info: React.FC<IInfoProps> = ({ title }: IInfoProps) => (
  <div>
    <h6>{title}</h6>
  </div>
);

const CONFIG = {
  fps: 4,
  qrbox: { width: 300, height: 200 },
  formatsToSupport: [
    Html5QrcodeSupportedFormats.CODE_128,
    Html5QrcodeSupportedFormats.QR_CODE,
  ],
  rememberLastUsedCamera: true,
  supportedScanTypes: [Html5QrcodeScanType.SCAN_TYPE_CAMERA],
};

const QRCODE_REGION = "ADVANCED_EXAMPLE_QRCODE_REGION";

interface IAdvancedExampleProps {
  onCodeScanned: (code: string) => void;
}

export const AdvancedExample: React.FC<IAdvancedExampleProps> = ({
  onCodeScanned,
}: IAdvancedExampleProps) => {
  const {
    fetchCameras,
    state: { loading, error, cameraDevices },
  } = useFetchCameras();
  console.log("cameraDevices ", cameraDevices);

  useEffect(() => {
    fetchCameras();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const ref = useRef<IHtmlQrcodePluginForwardedRef>(null);
  const [selectedCameraId, setSelectedCameraId] = useState<string | undefined>(
    undefined
  );
  if (loading) {
    return <Info title="Detecting available cameras" />;
  }
  if (error) {
    return <Info title="Failed to detect cameras" />;
  }
  if (cameraDevices.length === 0) {
    return <Info title="No available cameras" />;
  }
  return (
    <div>
      <HtmlQrcodeAdvancedPlugin
        ref={ref}
        config={CONFIG}
        onCodeScanned={onCodeScanned}
        qrcodeRegionId={QRCODE_REGION}
        cameraId={selectedCameraId || cameraDevices[0].id}
      />
      <button
        onClick={() => {
          if (ref.current) {
            ref.current.pause();
          }
        }}
      >
        Pause
      </button>
      <button
        onClick={() => {
          if (ref.current) {
            ref.current.resume();
          }
        }}
      >
        Resume
      </button>
      {cameraDevices.length > 1 && (
        <select
          defaultValue={cameraDevices[0].id}
          onChange={(event) => {
            setSelectedCameraId(event.target.value);
          }}
        >
          {cameraDevices.map((device) => (
            <option key={device.id} value={device.id} label={device.label} />
          ))}
        </select>
      )}
    </div>
  );
};
