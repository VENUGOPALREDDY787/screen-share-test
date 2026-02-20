// src/hooks/useScreenShare.js

import { useState, useEffect, useRef } from "react";

export default function useScreenShare() {
  const [status, setStatus] = useState("idle");
  const [stream, setStream] = useState(null);
  const [metadata, setMetadata] = useState(null);

  const streamRef = useRef(null);

  const cleanup = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
    }
    streamRef.current = null;
    setStream(null);
    setMetadata(null);
  };

  const startSharing = async () => {
    try {
      cleanup();
      setStatus("requesting");

      const newStream = await navigator.mediaDevices.getDisplayMedia({
        video: { frameRate: { ideal: 30 } },
        audio: false,
      });

      streamRef.current = newStream;

      const track = newStream.getVideoTracks()[0];
      const settings = track.getSettings();

      setMetadata({
        width: settings.width,
        height: settings.height,
        frameRate: settings.frameRate,
        displaySurface: settings.displaySurface,
      });

      track.onended = () => {
        stopSharing();
      };

      setStream(newStream);
      setStatus("granted");

    } catch (error) {
  if (error.name === "NotAllowedError") {
    if (error.message?.toLowerCase().includes("denied")) {
      setStatus("denied");
    } else {
      setStatus("cancelled");
    }
  } else if (error.name === "AbortError") {
    setStatus("cancelled");
  } else {
    setStatus("error");
  }
}
  };

  const stopSharing = () => {
    cleanup();
    setStatus("stopped");
  };

  // Cleanup only on component unmount (NOT on stream change)
  useEffect(() => {
    return () => {
      cleanup();
    };
  }, []);

  return {
    status,
    stream,
    metadata,
    startSharing,
    stopSharing,
  };
}