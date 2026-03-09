import React, { useState, useRef } from "react";
import { ImagePlus, CheckCircle2, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils"; // Standard Shadcn utility

interface Thumbnail {
  id: string;
  url: string;
  type: "auto" | "custom";
}

export default function ThumbnailSelector() {
  const [selectedId, setSelectedId] = useState<string>("auto-1");
  const [customThumbnail, setCustomThumbnail] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Mock auto-generated thumbnails from the video
  const autoThumbnails: Thumbnail[] = [
    { id: "auto-1", url: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&q=80", type: "auto" },
    { id: "auto-2", url: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=400&q=80", type: "auto" },
    { id: "auto-3", url: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=400&q=80", type: "auto" },
  ];

  const handleCustomUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setCustomThumbnail(url);
      setSelectedId("custom-1");
    }
  };

  return (
    <section className="space-y-4">
      <div className="space-y-1">
        <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Thumbnail</h3>
        <p className="text-xs text-muted-foreground">
          Select or upload a picture that shows what's in your video. A good thumbnail stands out and draws viewers' attention.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {/* CUSTOM UPLOAD SLOT */}
        <div 
          onClick={() => fileInputRef.current?.click()}
          className={cn(
            "relative aspect-video rounded-xl border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-all overflow-hidden group",
            selectedId === "custom-1" ? "border-primary bg-primary/5" : "border-muted-foreground/20 hover:border-muted-foreground/50"
          )}
        >
          {customThumbnail ? (
            <>
              <img src={customThumbnail} alt="Custom" className="object-cover w-full h-full" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                <p className="text-white text-[10px] font-bold uppercase">Change</p>
              </div>
            </>
          ) : (
            <>
              <ImagePlus className="h-6 w-6 mb-1 text-muted-foreground group-hover:text-primary transition-colors" />
              <span className="text-[10px] font-bold uppercase text-muted-foreground group-hover:text-primary">Upload</span>
            </>
          )}
          
          {selectedId === "custom-1" && (
            <div className="absolute top-1 right-1">
              <CheckCircle2 className="h-4 w-4 text-primary fill-background" />
            </div>
          )}
        </div>

        {/* AUTO-GENERATED SLOTS */}
        {autoThumbnails.map((thumb) => (
          <div
            key={thumb.id}
            onClick={() => setSelectedId(thumb.id)}
            className={cn(
              "relative aspect-video rounded-xl border-2 cursor-pointer overflow-hidden transition-all hover:ring-2 hover:ring-primary/20",
              selectedId === thumb.id ? "border-primary" : "border-transparent"
            )}
          >
            <img src={thumb.url} alt="Auto preview" className="object-cover w-full h-full" />
            
            {selectedId === thumb.id && (
              <div className="absolute inset-0 bg-primary/10 border-2 border-primary rounded-xl flex items-center justify-center">
                 <CheckCircle2 className="h-5 w-5 text-primary fill-background" />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Hidden File Input */}
      <input 
        type="file" 
        ref={fileInputRef} 
        className="hidden" 
        accept="image/*" 
        onChange={handleCustomUpload} 
      />
      
      {/* Small Hint for Creators */}
      <div className="flex items-center gap-2 mt-2">
         <span className="text-[10px] text-muted-foreground bg-muted px-2 py-0.5 rounded italic">
            Pro-tip: Use 1280x720 for best results.
         </span>
      </div>
    </section>
  );
}