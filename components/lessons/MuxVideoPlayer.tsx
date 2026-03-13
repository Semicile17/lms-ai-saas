"use client";

import { useEffect, useState } from "react";
import MuxPlayer from "@mux/mux-player-react";
import { VideoOff, Loader2 } from "lucide-react";
import { getMuxSignedTokens } from "@/lib/actions/mux";

interface MuxVideoPlayerProps {
  playbackId: string | null | undefined;
  title?: string;
  className?: string;
}

interface MuxTokens {
  playback: string;
  thumbnail: string;
  storyboard: string;
}

export function MuxVideoPlayer({
  playbackId,
  title,
  className,
}: MuxVideoPlayerProps) {
  const [tokens, setTokens] = useState<MuxTokens | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!playbackId) {
      setIsLoading(false);
      return;
    }

    async function fetchTokens() {
      try {
        const result = await getMuxSignedTokens(playbackId as string);
        if (
          result.playbackToken &&
          result.thumbnailToken &&
          result.storyboardToken
        ) {
          setTokens({
            playback: result.playbackToken,
            thumbnail: result.thumbnailToken,
            storyboard: result.storyboardToken,
          });
        }
      } catch {
        // Silently handle errors - tokens will be null and player may fallback
      } finally {
        setIsLoading(false);
      }
    }

    fetchTokens();
  }, [playbackId]);

  // ── No video ──
  if (!playbackId) {
    return (
      <div className={`aspect-video bg-zinc-50 border border-zinc-200 rounded-sm flex items-center justify-center ${className ?? ""}`}>
        <div className="text-center">
          <div className="w-9 h-9 rounded-sm border border-zinc-200 bg-white flex items-center justify-center mx-auto mb-3">
            <VideoOff className="w-4 h-4 text-zinc-400" strokeWidth={1.75} />
          </div>
          <p className="text-xs text-zinc-400">No video available</p>
        </div>
      </div>
    );
  }

  // ── Loading ──
  if (isLoading) {
    return (
      <div className={`aspect-video bg-zinc-50 border border-zinc-200 rounded-sm flex items-center justify-center ${className ?? ""}`}>
        <div className="text-center">
          <Loader2 className="w-5 h-5 text-zinc-300 animate-spin mx-auto mb-2" strokeWidth={1.75} />
          <p className="text-xs text-zinc-400">Loading video...</p>
        </div>
      </div>
    );
  }

  // ── Player ──
  return (
    <div className={` overflow-hidden border border-zinc-200 ${className ?? ""}`}>
      <MuxPlayer
        playbackId={playbackId}
        tokens={tokens ?? undefined}
        metadata={{
          video_title: title ?? "Lesson video",
        }}
        streamType="on-demand"
        autoPlay={false}
        className="w-full aspect-video"
        accentColor="#18181b"
        onError={() => {
          // Error handling - player will show its own error UI
        }}
      />
    </div>
  );
}