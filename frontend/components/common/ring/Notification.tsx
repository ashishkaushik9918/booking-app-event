"use client";

import { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { useSocket } from "@/hooks/useSocket";
import { motion, AnimatePresence } from 'framer-motion';

interface LeadNotification {
    id: string;
    createdBy: string;
    leads: string[];
}

export default function LeadListener() {
    const socket = useSocket();
    const audioRef = useRef<HTMLAudioElement>(null);
    const [notificationsEnabled, setNotificationsEnabled] = useState(() => {
        if (typeof window !== "undefined") {
            return localStorage.getItem("notificationsEnabled") === "true";
        }
        return false;
    });
    const [activeNotifications, setActiveNotifications] = useState<LeadNotification[]>([]);

    const enableNotifications = () => {
        audioRef.current?.play().catch(() => { });
        audioRef.current?.pause();
        audioRef.current!.currentTime = 0;
        setNotificationsEnabled(true);
        localStorage.setItem("notificationsEnabled", "true");
    };

    useEffect(() => {
        if (!socket || !notificationsEnabled) return;

        const handleLeadCreated = (payload: LeadNotification) => {
            setActiveNotifications((prev) => [...prev, payload]);
            toast.success(`New lead from ${payload.createdBy}`);
            window.dispatchEvent(new CustomEvent("lead:notification", { detail: payload }));
        };

        socket.on("lead:created", handleLeadCreated);
        return () => {
            socket.off("lead:created", handleLeadCreated);
        };
    }, [socket, notificationsEnabled]);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;
        if (activeNotifications.length === 0) {
            audio.pause();
            audio.currentTime = 0;
            return;
        }
        audio.play().catch(() => { });
        const loopAudio = () => {
            audio.play().catch(() => { });
        };

        audio.addEventListener("ended", loopAudio);

        return () => {
            audio.removeEventListener("ended", loopAudio);
        };
    }, [activeNotifications]);

    const dismissNotification = (id: string) => {
        setActiveNotifications((prev) => prev.filter((n) => n.id !== id));
    };

    const dismissAllNotifications = () => {
        setActiveNotifications([]);
        const audio = audioRef.current;
        audio?.pause();
        audio!.currentTime = 0;
        toast.success("All notifications dismissed");
    };

    const handleViewLead = (id: string) => {
        const audio = audioRef.current;
        audio?.pause();
        audio!.currentTime = 0;
        setTimeout(() => dismissNotification(id), 1500);
    };

    const notificationCount = activeNotifications.length;

    return (
        <div>
            {!notificationsEnabled && (
                  <button onClick={enableNotifications} className="  px-3 py-1 bg-blue-600 text-white rounded-sm shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200" title="Enable Notification Messages">
                     🔔
                </button>
            )}
          
            <audio ref={audioRef} src="/classis.mp3" preload="auto" />

            {notificationCount > 0 && (
                <div className="fixed top-4 right-4 z-50 max-w-sm">
                    <div className="bg-white rounded-b-lg border border-gray-200 shadow-lg overflow-hidden max-h-80 overflow-y-auto">
                        <AnimatePresence>
                            {activeNotifications.map((n) => (
                                <motion.div
                                    key={n.id}
                                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: -20, scale: 0.95 }}
                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                    className="border-b border-gray-100 last:border-b-0 p-4 hover:bg-gray-50 transition-colors duration-150"
                                >
                                    <div className="flex items-start justify-between mb-2">
                                        <h4 className="text-sm font-semibold text-gray-900">New Lead from {n.createdBy}</h4>
                                        <span className="text-xs text-gray-500 ml-2 whitespace-nowrap">
                                            {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                                        </span>
                                    </div>
                                    
                                    {n.leads && n.leads.length > 0 && (
                                        <div className="mb-3">
                                            <p className="text-xs text-gray-600 mb-1">Leads:</p>
                                            <div className="flex flex-wrap gap-1">
                                                {n.leads.slice(0, 4).map((lead, i) => (
                                                    <span
                                                        key={i}
                                                        className="inline-block px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-md truncate max-w-20"
                                                        title={lead}
                                                    >
                                                        {lead.length > 15 ? `${lead.substring(0, 12)}...` : lead}
                                                    </span>
                                                ))}
                                                {n.leads.length > 4 && (
                                                    <span className="inline-block px-2 py-1 text-xs text-gray-500 bg-gray-50 rounded-md">
                                                        +{n.leads.length - 4} more
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    )}

                                    <div className="flex items-center justify-end space-x-2 pt-1">
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => handleViewLead(n.id)}
                                            className="px-3 py-1 text-xs font-medium text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
                                        >
                                            View
                                        </motion.button>
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => dismissNotification(n.id)}
                                            className="p-1 text-gray-400 hover:text-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors duration-200"
                                            aria-label="Dismiss notification"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </motion.button>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                </div>
            )}
        </div>
    );
}