'use client';

// ==========================================
// Watch/Video Detail Page
// ==========================================

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import {
  ThumbsUp,
  ThumbsDown,
  Share2,
  Download,
  ListPlus,
  Flag,
  Bell,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  MessageSquare,
  Send,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { VideoPlayer } from '@/components/video/video-player';
import { VideoCard } from '@/components/video/video-card';
import { UserAvatar } from '@/components/user/user-avatar';
import { mockVideos, mockChannels } from '@/lib/mock-data';

function formatCount(count: number): string {
  if (count >= 1000000) {
    return `${(count / 1000000).toFixed(1)}M`;
  }
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}K`;
  }
  return count.toString();
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default function WatchPage() {
  const params = useParams();
  const videoId = params.id as string;

  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [likeState, setLikeState] = useState<'like' | 'dislike' | null>(null);
  const [commentText, setCommentText] = useState('');

  // Find video (in production, fetch from API)
  const video = mockVideos.find((v) => v.id === videoId) || mockVideos[0];
  const relatedVideos = mockVideos.filter((v) => v.id !== videoId);

  const handleLike = () => {
    setLikeState(likeState === 'like' ? null : 'like');
  };

  const handleDislike = () => {
    setLikeState(likeState === 'dislike' ? null : 'dislike');
  };

  const handleSubmitComment = () => {
    if (commentText.trim()) {
      console.log('Submitting comment:', commentText);
      setCommentText('');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-[1800px] mx-auto">
        <div className="flex flex-col lg:flex-row gap-6 p-4 lg:p-6">
          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Video Player */}
            <VideoPlayer
              src="/sample-video.mp4"
              poster={video.thumbnail}
              title={video.title}
              className="rounded-xl overflow-hidden"
            />

            {/* Video Info */}
            <div className="mt-4">
              <h1 className="text-xl lg:text-2xl font-bold">{video.title}</h1>

              {/* Actions Row */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-4">
                {/* Channel Info */}
                <div className="flex items-center gap-4">
                  <Link href={`/channel/${video.channel.id}`}>
                    <div className="w-10 h-10 rounded-full bg-muted overflow-hidden">
                      {video.channel.avatar ? (
                        <img
                          src={video.channel.avatar}
                          alt={video.channel.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center font-medium">
                          {video.channel.name.charAt(0)}
                        </div>
                      )}
                    </div>
                  </Link>

                  <div className="min-w-0">
                    <Link
                      href={`/channel/${video.channel.id}`}
                      className="font-medium hover:text-primary flex items-center gap-1"
                    >
                      {video.channel.name}
                      {video.channel.isVerified && (
                        <CheckCircle className="h-4 w-4 text-primary" />
                      )}
                    </Link>
                    <p className="text-sm text-muted-foreground">
                      {formatCount(video.channel.subscriberCount)} subscribers
                    </p>
                  </div>

                  <Button
                    variant={isSubscribed ? 'secondary' : 'default'}
                    onClick={() => setIsSubscribed(!isSubscribed)}
                    className="gap-2"
                  >
                    {isSubscribed ? (
                      <>
                        <Bell className="h-4 w-4" />
                        Subscribed
                      </>
                    ) : (
                      'Subscribe'
                    )}
                  </Button>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2 flex-wrap">
                  {/* Like/Dislike */}
                  <div className="flex items-center rounded-full bg-muted">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleLike}
                      className={`rounded-l-full rounded-r-none gap-1 ${
                        likeState === 'like' ? 'text-primary' : ''
                      }`}
                    >
                      <ThumbsUp
                        className={`h-4 w-4 ${likeState === 'like' ? 'fill-current' : ''}`}
                      />
                      {formatCount(video.likes)}
                    </Button>
                    <Separator orientation="vertical" className="h-6" />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleDislike}
                      className={`rounded-r-full rounded-l-none ${
                        likeState === 'dislike' ? 'text-primary' : ''
                      }`}
                    >
                      <ThumbsDown
                        className={`h-4 w-4 ${likeState === 'dislike' ? 'fill-current' : ''}`}
                      />
                    </Button>
                  </div>

                  <Button variant="secondary" size="sm" className="gap-2 rounded-full">
                    <Share2 className="h-4 w-4" />
                    Share
                  </Button>

                  <Button variant="secondary" size="sm" className="gap-2 rounded-full">
                    <Download className="h-4 w-4" />
                    Download
                  </Button>

                  <Button variant="secondary" size="sm" className="gap-2 rounded-full">
                    <ListPlus className="h-4 w-4" />
                    Save
                  </Button>
                </div>
              </div>

              {/* Description */}
              <div className="mt-4 p-4 rounded-xl bg-muted/50">
                <div className="flex items-center gap-3 text-sm text-muted-foreground mb-2">
                  <span>{formatCount(video.views)} views</span>
                  <span>{formatDate(video.uploadedAt)}</span>
                  {video.isPremium && (
                    <Badge variant="default">PREMIUM</Badge>
                  )}
                </div>

                <div
                  className={`text-sm whitespace-pre-wrap ${
                    !isDescriptionExpanded ? 'line-clamp-3' : ''
                  }`}
                >
                  {video.description}
                </div>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
                  className="mt-2 p-0 h-auto font-semibold"
                >
                  {isDescriptionExpanded ? (
                    <>
                      Show less <ChevronUp className="h-4 w-4 ml-1" />
                    </>
                  ) : (
                    <>
                      Show more <ChevronDown className="h-4 w-4 ml-1" />
                    </>
                  )}
                </Button>
              </div>

              {/* Comments Section */}
              <div className="mt-8">
                <div className="flex items-center gap-2 mb-6">
                  <MessageSquare className="h-5 w-5" />
                  <h2 className="text-lg font-semibold">Comments</h2>
                  <span className="text-muted-foreground">1.2K</span>
                </div>

                {/* Add Comment */}
                <div className="flex gap-4 mb-8">
                  <UserAvatar
                    user={{ displayName: 'You', avatar: '' }}
                    size="sm"
                  />
                  <div className="flex-1">
                    <Textarea
                      placeholder="Add a comment..."
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      className="min-h-[80px]"
                    />
                    <div className="flex justify-end gap-2 mt-2">
                      <Button
                        variant="ghost"
                        onClick={() => setCommentText('')}
                        disabled={!commentText}
                      >
                        Cancel
                      </Button>
                      <Button
                        onClick={handleSubmitComment}
                        disabled={!commentText.trim()}
                      >
                        Comment
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Sample Comments */}
                <div className="space-y-6">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex gap-4">
                      <UserAvatar
                        user={{ displayName: `User ${i}`, avatar: '' }}
                        size="sm"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-sm">User Name</span>
                          <span className="text-xs text-muted-foreground">
                            2 days ago
                          </span>
                        </div>
                        <p className="text-sm mt-1">
                          This is an amazing video! Really enjoyed watching it.
                          The quality and content are top-notch.
                        </p>
                        <div className="flex items-center gap-4 mt-2">
                          <Button variant="ghost" size="sm" className="gap-1 h-8">
                            <ThumbsUp className="h-3 w-3" />
                            <span className="text-xs">42</span>
                          </Button>
                          <Button variant="ghost" size="sm" className="h-8">
                            <ThumbsDown className="h-3 w-3" />
                          </Button>
                          <Button variant="ghost" size="sm" className="h-8">
                            Reply
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar - Related Videos */}
          <aside className="lg:w-[400px] shrink-0">
            <h3 className="font-semibold mb-4">Related Videos</h3>
            <div className="space-y-4">
              {relatedVideos.slice(0, 10).map((v) => (
                <VideoCard
                  key={v.id}
                  video={v}
                  variant="horizontal"
                  showChannel
                />
              ))}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
