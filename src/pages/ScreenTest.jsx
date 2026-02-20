// src/pages/ScreenTest.jsx

import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import useScreenShare from "../hooks/useScreenShare";
import Button from "../Componets/button";
import "./ScreenTest.css";

function ScreenTest() {
  const { status, stream, metadata, startSharing, stopSharing } =
    useScreenShare();

  const videoRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (stream && videoRef.current) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);


  return (
    <div className="screen-container">
      <div className="screen-card">
        <h2 className="screen-title">Screen Test Environment</h2>

        {/* Requesting */}
        {status === "requesting" && (
          <p className="screen-info">Opening screen picker...</p>
        )}

        {/* Idle */}
        {status === "idle" && (
          <Button onClick={startSharing}>Start Screen Sharing</Button>
        )}
        {status === "denied" && (
          <>
            <p className="screen-error">Permission denied by browser.</p>
            <Button onClick={startSharing}>Retry Screen Test</Button>
          </>
        )}

        {/* Granted */}
        {status === "granted" && (
          <>
            <p className="screen-success">Screen stream active</p>

            <video
              ref={videoRef}
              autoPlay
              playsInline
              className="screen-video"
            />

            {metadata && (
              <div className="screen-metadata">
                <p>
                  Resolution: {metadata.width} × {metadata.height}
                </p>
                <p>Frame Rate: {metadata.frameRate}</p>
                <p>
                  Display Type: {metadata.displaySurface || "Not Available"}
                </p>
              </div>
            )}

            <div className="screen-buttons">
              <Button onClick={stopSharing}>Stop Sharing</Button>
            </div>
          </>
        )}

        {/* Cancelled */}
        {status === "cancelled" && (
          <>
            <p className="screen-error">Screen selection was cancelled.</p>
            <Button onClick={startSharing}>Retry Screen Test</Button>
          </>
        )}

        {/* Error */}
        {status === "error" && (
          <p className="screen-error">An unexpected error occurred.</p>
        )}

        {/* Stopped */}
        {status === "stopped" && (
          <>
            <p className="screen-info">Screen sharing stopped.</p>

            <div className="screen-buttons">
              <Button onClick={startSharing} disabled={status === "requesting"}>
                {status === "requesting"
                  ? "Opening..."
                  : "Start Screen Sharing"}
              </Button>

              <Button onClick={() => navigate("/")}>Back to Home</Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default ScreenTest;
