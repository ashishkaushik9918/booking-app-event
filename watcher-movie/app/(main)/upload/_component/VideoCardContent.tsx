import { Copy, Check, Info, ShieldCheck,Film ,Loader2} from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
export default function ProfessionalVideoStatus({ file, progress, isUploading }) {
  const [copied, setCopied] = useState(false);
  const videoUrl = `https://youtu.be/vid_${Math.random().toString(36).substr(2, 9)}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(videoUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    // toast.success("Link copied to clipboard"); 
  };

  return (
    <CardContent className="p-0 flex flex-col">
      {/* 1. UPLOAD PROGRESS SECTION (Integrated into top of content) */}
      <div className="p-5 pb-0">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              {isUploading && (
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              )}
              <span className={`relative inline-flex rounded-full h-2 w-2 ${isUploading ? 'bg-blue-500' : 'bg-green-500'}`}></span>
            </span>
            <span className="text-[11px] font-bold uppercase tracking-[0.1em] text-muted-foreground">
              {progress < 100 ? "Uploading Metadata..." : "Upload Finalized"}
            </span>
          </div>
          <span className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400">
            {progress}%
          </span>
        </div>
        <Progress value={progress} className="h-1.5 bg-blue-100 dark:bg-blue-950" />
      </div>

      {/* 2. MAIN DATA CONTAINER */}
      <div className="p-5 space-y-5">
        
        {/* VIDEO INFORMATION GROUP */}
        <div className="space-y-4 rounded-xl border border-border/50 bg-slate-50/50 dark:bg-slate-900/50 p-4">
          
          {/* Filename & Size */}
          <div className="flex justify-between items-start gap-3">
            <div className="min-w-0 flex-1">
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-1">Source File</p>
              <p className="text-sm font-semibold truncate text-foreground pr-2">{file.name}</p>
              <p className="text-[11px] text-muted-foreground mt-1 flex items-center gap-1.5">
                <span className="bg-background border px-1.5 py-0.5 rounded text-[10px] font-medium uppercase">
                  {(file.size / (1024 * 1024)).toFixed(2)} MB
                </span>
                • 1080p Target
              </p>
            </div>
            <div className="h-10 w-10 rounded-lg bg-background border flex items-center justify-center shrink-0 shadow-sm">
                <Film className="h-5 w-5 text-muted-foreground/50" />
            </div>
          </div>

          <div className="h-[1px] bg-gradient-to-r from-transparent via-border to-transparent" />

          {/* Smart Link Input */}
          <div className="space-y-2">
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Video Link</p>
            <div className="flex items-center gap-1 bg-background border rounded-lg p-1 pl-3 transition-within:ring-2 ring-blue-500/10">
              <span className="text-[13px] text-blue-600 dark:text-blue-400 truncate flex-1 font-medium">
                {videoUrl}
              </span>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={copyToClipboard}
                className="h-8 w-8 hover:bg-muted"
              >
                {copied ? <Check className="h-3.5 w-3.5 text-green-500" /> : <Copy className="h-3.5 w-3.5" />}
              </Button>
            </div>
          </div>
        </div>

        {/* 3. SECURITY & COMPLIANCE (The Professional Touch) */}
        <div className="flex flex-col gap-3 px-1">
           <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <ShieldCheck className="h-4 w-4 text-green-500" />
                <span>Copyright Check</span>
              </div>
              <Badge variant="outline" className="text-[10px] font-bold border-green-200 bg-green-50 text-green-700 dark:bg-green-950/30 dark:border-green-900">
                PASSED
              </Badge>
           </div>
           
           <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Info className="h-4 w-4 text-blue-500" />
                <span>Processing Status</span>
              </div>
              <span className="text-[11px] font-medium italic">
                {progress === 100 ? "4K / HD Processing" : "Waiting for upload..."}
              </span>
           </div>
        </div>

        {/* 4. ACTIONS */}
        <div className="pt-4 border-t space-y-3">
          <Button 
            className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-md shadow-blue-500/20" 
            disabled={isUploading}
          >
            {isUploading ? (
               <div className="flex items-center gap-2">
                 <Loader2 className="h-4 w-4 animate-spin" />
                 Processing...
               </div>
            ) : "Publish Changes"}
          </Button>
          <p className="text-[11px] text-center text-muted-foreground">
            By publishing, you agree to our <span className="underline cursor-pointer">Terms of Service</span>.
          </p>
        </div>
      </div>
    </CardContent>
  );
}