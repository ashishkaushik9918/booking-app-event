"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Search } from "lucide-react";
import { navigationIcon } from "@/config/navigation-icon";
import  {Button} from "@/components/ui/button"

export type ModuleItem = {
  name: string;
  path: string;
  group: "General" | "Management" | "Finance" | "System";
  icon: keyof typeof navigationIcon;
};

export const modules: ModuleItem[] = [
  { name: "Dashboard", path: "/dashboard", group: "General", icon: "Dashboard" },
  { name: "Bookings", path: "/bookings", group: "Management", icon: "Bookings" },
  { name: "Customers", path: "/customers", group: "Management", icon: "Customers" },
  { name: "Services", path: "/services", group: "Management", icon: "Services" },
  { name: "Finance", path: "/finance", group: "Finance", icon: "Finance" },
  { name: "Reports", path: "/reports", group: "Finance", icon: "Reports" },
  { name: "Settings", path: "/settings", group: "System", icon: "Settings" },
];

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const router = useRouter();

  // ⌘ + K / Ctrl + K
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setOpen(true);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const filtered = useMemo(() => {
    return modules.filter((m) =>
      m.name.toLowerCase().includes(query.toLowerCase())
    );
  }, [query]);

  const grouped = useMemo(() => {
    return filtered.reduce<Record<string, typeof filtered>>((acc, item) => {
      acc[item.group] ??= [];
      acc[item.group].push(item);
      return acc;
    }, {});
  }, [filtered]);

  function handleSelect(path: string) {
    setOpen(false);
    router.push(path);
  }

    return (
        <>
            <Button
  variant="outline"
  onClick={() => setOpen(true)}
  className="gap-2 px-20"
>
  <Search className="w-4 h-4" />
  Search
  <Badge variant="secondary" className="ml-auto">
    ⌘ K
  </Badge>
</Button>
      
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        className="
          max-w-xl
          p-0
          shadow-2xl
          border
        "
      >
        {/* Search Header */}
        <div className="flex items-center gap-3 px-4 py-3 border-b">
          <Search className="w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Search modules or actions..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="border-0 focus-visible:ring-0"
            autoFocus
          />
          <Badge variant="secondary">⌘ K</Badge>
        </div>

        {/* Result List */}
        <ScrollArea className="h-[360px]">
          <div className="px-2 py-3 space-y-4">
            {Object.entries(grouped).map(([group, items]) => (
              <div key={group}>
                <p className="px-3 mb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                  {group}
                </p>

                <div className="space-y-1">
                  {items.map((item) => {
                    const Icon = navigationIcon[item.icon];
                    return (
                      <div
                        key={item.name}
                        onClick={() => handleSelect(item.path)}
                        className="
                          group flex items-center gap-3
                          rounded-md px-3 py-2
                          cursor-pointer
                          hover:bg-muted
                          transition
                        "
                      >
                        <div className="flex h-9 w-9 items-center justify-center rounded-md bg-muted">
                          <Icon className="w-5 h-5 text-muted-foreground group-hover:text-foreground" />
                        </div>

                        <div className="flex-1">
                          <p className="text-sm font-medium">{item.name}</p>
                          <p className="text-xs text-muted-foreground">
                            Go to {item.name}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <Separator className="mt-4" />
              </div>
            ))}

            {!filtered.length && (
              <p className="text-sm text-muted-foreground text-center py-10">
                No results found
              </p>
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
        </>
  );
}
