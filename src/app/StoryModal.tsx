"use client";
import { useRef, useState, useEffect } from "react";

export default function StoryModal({ open, onCloseAction, onSendAction, videoUrl, onDeleteAction }: {
  open: boolean;
  onCloseAction: () => void;
  onSendAction: (blob: Blob) => void;
  videoUrl?: string;
  onDeleteAction?: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [recording, setRecording] = useState(false);
  const [recordedBlob, setRecordedBlob] = useState<Blob | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | undefined>(videoUrl);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (open && !previewUrl) {
      navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        .then((stream) => {
          mediaStreamRef.current = stream;
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        })
        .catch(() => setError("Camera access denied."));
    }
    return () => {
      mediaStreamRef.current?.getTracks().forEach((t) => t.stop());
    };
  }, [open, previewUrl]);

  const startRecording = () => {
    if (!mediaStreamRef.current || recording) return;
    setRecording(true);
    setRecordedBlob(null);
    setPreviewUrl(undefined);
    const chunks: BlobPart[] = [];
    const recorder = new MediaRecorder(mediaStreamRef.current);
    mediaRecorderRef.current = recorder;
    recorder.ondataavailable = (e) => chunks.push(e.data);
    recorder.onstop = () => {
      const blob = new Blob(chunks, { type: "video/webm" });
      setRecordedBlob(blob);
      setPreviewUrl(URL.createObjectURL(blob));
    };
    recorder.start();
  };

  const stopRecording = () => {
    if (!recording) return;
    setRecording(false);
    mediaRecorderRef.current?.stop();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90">
      <div className="relative w-full h-full max-w-[320px] md:max-w-[280px] aspect-[9/16] flex flex-col items-center justify-center bg-black rounded-lg overflow-hidden shadow-lg">
        <button onClick={onCloseAction} className="absolute top-3 right-3 text-white text-2xl z-10">×</button>
        {!previewUrl && !error && (
          <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
            className="w-full h-full object-cover"
            style={{ background: "#222" }}
          />
        )}
        {error && <div className="text-white p-4">{error}</div>}
        {previewUrl && (
          <video src={previewUrl} className="w-full h-full object-cover" autoPlay loop muted playsInline />
        )}
        <div className="absolute bottom-6 left-0 w-full flex justify-center items-center gap-4">
          {!previewUrl && !error && (
            <button
              onMouseDown={startRecording}
              onMouseUp={stopRecording}
              onMouseLeave={stopRecording}
              onTouchStart={startRecording}
              onTouchEnd={stopRecording}
              disabled={recording && !previewUrl}
              className={`rounded-full w-16 h-16 flex items-center justify-center bg-white bg-opacity-10 border-4 border-white ${recording ? "animate-pulse border-red-500" : ""}`}
              aria-label="Hold to record"
            >
              <div className={`w-8 h-8 rounded-full ${recording ? "bg-red-500" : "bg-white"}`}></div>
            </button>
          )}
          {previewUrl && (
            <div className="absolute bottom-6 left-0 w-full flex justify-center items-center gap-4">
              {onDeleteAction && (
                <button
                  onClick={onDeleteAction}
                  className="text-red-600 bg-transparent px-4 py-2 rounded-full font-semibold shadow-none hover:underline transition"
                >
                  Delete
                </button>
              )}
              {recordedBlob ? (
                <button
                  onClick={() => {
                    if (recordedBlob) onSendAction(recordedBlob);
                  }}
                  className="ml-auto bg-white text-black px-6 py-2 rounded-full font-semibold shadow-lg hover:bg-gray-200 transition"
                >
                  Send
                </button>
              ) : (
                <button
                  onClick={() => {
                    setRecordedBlob(null);
                    setPreviewUrl(undefined);
                  }}
                  className="ml-auto bg-white text-black px-6 py-2 rounded-full font-semibold shadow-lg hover:bg-gray-200 transition"
                >
                  Add
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
