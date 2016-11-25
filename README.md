# viral-vid-highlight

This is a Chrome extension that highlights "virality" of Youtube videos, based on views per minute.
More red highlight color = more views per minute, more blue highlight color = fewer views per minute, no highlight color = around average view per minute.

This only does analysis on youtube.com/user/ or youtube.com/channel pages, since views per minute analysis doesn't mean a whole lot when comparing across different users/channels, since they'd have different subscriber counts and regular viewerships.

This extension doesn't currently hit the Youtube API but instead approximates minutes since upload based on time shown in HTML, but it would be much better to hit the Youtube API to get upload time.
