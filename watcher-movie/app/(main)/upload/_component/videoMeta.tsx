"use client";

import React, { useState } from "react";
import { Info, X, Hash, Plus, Globe, Lock, EyeOff, Calendar as CalendarIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

export default function VideoMetadataEditor() {
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState<string[]>(["vlog", "tutorial"]);
  const [inputValue, setInputValue] = useState("");
  const [visibility, setVisibility] = useState("public");
  const [date, setDate] = useState<Date>();

  const handleAddTag = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && inputValue.trim()) {
      e.preventDefault();
      if (!tags.includes(inputValue.trim())) {
        setTags([...tags, inputValue.trim()]);
      }
      setInputValue("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((t) => t !== tagToRemove));
  };

  return (
    <div className="space-y-10 max-w-3xl animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* 1. CORE DETAILS */}
      <div className="space-y-6">
        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <Label htmlFor="title" className="text-sm font-bold uppercase tracking-widest text-muted-foreground/80">
              Title (required)
            </Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                </TooltipTrigger>
                <TooltipContent>Describe your video to help viewers find it.</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className="relative">
            <Input
              id="title"
              placeholder="Add a title"
              value={title}
              onChange={(e) => setTitle(e.target.value.slice(0, 100))}
              className="h-14 text-lg bg-background border-2 focus-visible:ring-blue-500 focus-visible:border-blue-500 transition-all"
            />
            <span className="absolute right-3 bottom-3 text-[10px] font-mono font-bold text-muted-foreground bg-muted px-1.5 rounded">
              {title.length}/100
            </span>
          </div>
        </section>

        <section className="space-y-3">
          <Label htmlFor="desc" className="text-sm font-bold uppercase tracking-widest text-muted-foreground/80">
            Description
          </Label>
          <Textarea
            id="desc"
            placeholder="Tell viewers what's happening in your video"
            className="min-h-[180px] bg-background border-2 focus-visible:ring-blue-500 text-base leading-relaxed"
          />
        </section>
      </div>

      {/* 2. TAGGING SYSTEM */}
      <section className="space-y-3">
        <Label className="text-sm font-bold uppercase tracking-widest text-muted-foreground/80">
          Keywords & SEO Tags
        </Label>
        <div className="group border-2 rounded-xl p-4 focus-within:border-blue-500 transition-all bg-slate-50/30 dark:bg-slate-900/30">
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.map((tag) => (
              <Badge key={tag} className="pl-3 pr-1.5 py-1.5 gap-2 text-xs font-semibold bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 shadow-sm">
                {tag}
                <button onClick={() => removeTag(tag)} className="hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full p-0.5 transition-colors">
                  <X className="h-3.5 w-3.5" />
                </button>
              </Badge>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <Hash className="h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Add keywords (e.g. react, design)..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleAddTag}
              className="border-none shadow-none focus-visible:ring-0 p-0 h-6 text-sm bg-transparent"
            />
          </div>
        </div>
      </section>

      {/* 3. ADVANCED VISIBILITY (The Professional Part) */}
      <section className="space-y-4">
        <div className="flex flex-col">
          <Label className="text-sm font-bold uppercase tracking-widest text-muted-foreground/80">Visibility</Label>
          <p className="text-xs text-muted-foreground mt-1">Choose when to publish and who can see your video.</p>
        </div>

        <RadioGroup defaultValue="public" onValueChange={setVisibility} className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <RadioGroupItem value="public" id="public" className="peer sr-only" />
            <Label
              htmlFor="public"
              className="flex flex-col items-center justify-between rounded-xl border-2 border-muted bg-popover p-4 hover:bg-slate-50 dark:hover:bg-slate-900 peer-data-[state=checked]:border-blue-500 [&:has([data-state=checked])]:border-blue-500 cursor-pointer transition-all"
            >
              <Globe className="mb-3 h-6 w-6 text-blue-500" />
              <div className="text-center">
                <p className="text-sm font-bold">Public</p>
                <p className="text-[10px] text-muted-foreground mt-1">Everyone can watch</p>
              </div>
            </Label>
          </div>

          <div>
            <RadioGroupItem value="unlisted" id="unlisted" className="peer sr-only" />
            <Label
              htmlFor="unlisted"
              className="flex flex-col items-center justify-between rounded-xl border-2 border-muted bg-popover p-4 hover:bg-slate-50 dark:hover:bg-slate-900 peer-data-[state=checked]:border-blue-500 cursor-pointer transition-all"
            >
              <EyeOff className="mb-3 h-6 w-6 text-orange-500" />
              <div className="text-center">
                <p className="text-sm font-bold">Unlisted</p>
                <p className="text-[10px] text-muted-foreground mt-1">Anyone with the link</p>
              </div>
            </Label>
          </div>

          <div>
            <RadioGroupItem value="scheduled" id="scheduled" className="peer sr-only" />
            <Label
              htmlFor="scheduled"
              className="flex flex-col items-center justify-between rounded-xl border-2 border-muted bg-popover p-4 hover:bg-slate-50 dark:hover:bg-slate-900 peer-data-[state=checked]:border-blue-500 cursor-pointer transition-all"
            >
              <CalendarIcon className="mb-3 h-6 w-6 text-purple-500" />
              <div className="text-center">
                <p className="text-sm font-bold">Scheduled</p>
                <p className="text-[10px] text-muted-foreground mt-1">Pick a future date</p>
              </div>
            </Label>
          </div>
        </RadioGroup>

        {/* Conditional Scheduling Date Picker */}
        {visibility === "scheduled" && (
          <div className="p-4 border-2 border-dashed rounded-xl animate-in zoom-in-95 duration-300">
            <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-3 block">Release Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn("w-full h-12 justify-start text-left font-normal border-2", !date && "text-muted-foreground")}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pick a publish date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
              </PopoverContent>
            </Popover>
          </div>
        )}
      </section>

      {/* 4. SETTINGS FOOTER */}
      <div className="grid grid-cols-2 gap-4 pt-4">
        <div className="space-y-2 w-full">
          <Label className="text-[10px] font-bold uppercase text-muted-foreground">Category</Label>
          <Select defaultValue="tech">
            <SelectTrigger className="border-2 h-11">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="tech">Technology</SelectItem>
              <SelectItem value="edu">Education</SelectItem>
              <SelectItem value="gaming">Gaming</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2 w-full">
          <Label className="text-[10px] font-bold uppercase text-muted-foreground">Language</Label>
          <Select defaultValue="en">
            <SelectTrigger className="border-2 h-11">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en">English (US)</SelectItem>
              <SelectItem value="hi">Hindi</SelectItem>
              <SelectItem value="es">Spanish</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}