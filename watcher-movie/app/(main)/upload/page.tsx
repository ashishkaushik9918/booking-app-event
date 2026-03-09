"use client";
import React, { useState, useEffect } from "react";
import { Upload, Film, X, CheckCircle2, PlayCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import VideoMetadataEditor from "./_component/videoMeta";
import ThumbnailSelector from "./_component/ThumbnailSelector";
import ProfessionalVideoStatus from "./_component/VideoCardContent";

export default function UploadVideo() {
  const [file, setFile] = useState<File | null>(null);
  const [videoPreview, setVideoPreview] = useState<string | null>(null); // State for the preview URL
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);

      // Create a temporary URL for the video file
      const previewUrl = URL.createObjectURL(selectedFile);
      setVideoPreview(previewUrl);

      simulateUpload();
    }
  };

  // Cleanup the URL to prevent memory leaks
  useEffect(() => {
    return () => {
      if (videoPreview) URL.revokeObjectURL(videoPreview);
    };
  }, [videoPreview]);

  const simulateUpload = () => {
    setIsUploading(true);
    let val = 0;
    const interval = setInterval(() => {
      val += 5;
      setProgress(val);
      if (val >= 100) {
        clearInterval(interval);
        setIsUploading(false);
      }
    }, 200);
  };

  const handleReset = () => {
    setFile(null);
    setVideoPreview(null);
    setProgress(0);
  };

  if (!file) {
    return (
      <div className="p-5 flex items-center justify-center min-h-[500px] border-2 border-dashed border-muted-foreground/20 rounded-xl bg-slate-50/50 dark:bg-slate-900/20">
        <div className="text-center space-y-4">
          <div className="bg-primary/10 p-6 rounded-full w-fit mx-auto transition-transform hover:scale-110">
            <Upload className="h-12 w-12 text-primary" />
          </div>
          <div>
            <h2 className="text-xl font-semibold">Select files to upload</h2>
            <p className="text-sm text-muted-foreground">Your videos will be private until you publish them.</p>
          </div>
          <Input
            type="file"
            id="video-upload"
            className="hidden"
            accept="video/*"
            onChange={handleFileChange}
          />
          <Button onClick={() => document.getElementById("video-upload")?.click()}>
            Select Files
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6 px-4 md:px-10 lg:px-20 py-5">
      <div className="flex items-center justify-between border-b pb-4">
        <div className="flex items-center gap-3">
          <div className="bg-primary/10 p-2 rounded">
            <Film className="h-5 w-5 text-primary" />
          </div>
          <h2 className="text-xl font-bold truncate max-w-[200px] md:max-w-md">
            {file.name}
          </h2>
        </div>
        <Button variant="ghost" size="icon" onClick={handleReset} className="rounded-full">
          <X className="h-5 w-5" />
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Metadata & Thumbnails */}
        <div className="lg:col-span-2 space-y-8">
          <section className="space-y-4">
            <h3 className="text-lg font-semibold tracking-tight">Video Details</h3>
            <VideoMetadataEditor />
          </section>

          <hr className="border-muted" />

          <ThumbnailSelector />
        </div>

        {/* Right Column: Video Preview & Status */}
        <div className="space-y-6">
          <Card className="overflow-hidden border shadow-lg sticky top-5 pt-0">
            {/* THE VIDEO PLAYER PREVIEW */}
            <div className="aspect-video bg-black flex items-center justify-center relative group">
              {videoPreview ? (
                <video
                  src={videoPreview}
                  controls
                  className="w-full h-full object-contain"
                  poster="/api/placeholder/400/225"
                  controlsList="nodownload"
                  onContextMenu={(e) => e.preventDefault()}
                  disableRemotePlayback
                />
              ) : (
                <div className="flex flex-col items-center gap-2">
                  <Loader2 className="h-8 w-8 text-white/50 animate-spin" />
                  <p className="text-white/50 text-xs">Processing preview...</p>
                </div>
              )}
            </div>

            <ProfessionalVideoStatus file={file} progress={progress} isUploading={isUploading} />
          </Card>
        </div>
      </div>
    </div>
  );
}