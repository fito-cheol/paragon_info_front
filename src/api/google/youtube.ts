import customAxios from 'api/googleAxios';

// Ref: https://developers.google.com/youtube/v3/docs/videos/rate?hl=ko

interface Thumbnail {
  url: string;
  width: number;
  height: number;
}

interface Snippet {
  publishedAt: string;
  channelId: string;
  title: string;
  description: string;
  thumbnails: {
    default: Thumbnail;
    medium: Thumbnail;
    high: Thumbnail;
    standard: Thumbnail;
    maxres: Thumbnail;
  };
  channelTitle: string;
}

interface VideoResource {
  kind: string;
  etag: string;
  id: string;
  snippet: Snippet;
}

interface VideosListReturn {
  kind: string;
  etag: string;
  items: VideoResource[];
  nextPageToken: string;
  prevPageToken: string;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
}

interface GetVideoFormat {
  part: string; // snippet
  id: string; // hfcpJx8J4Bk
  locale: string; // 대한민국
  key: string; // 'AIzaSyBGQ9PIYkwxk6iCSstQ5o-Pvt9CPeevzno'
}

export async function getVideo(data: GetVideoFormat) {
  const response = await customAxios.get<VideosListReturn>('/youtube/v3/videos', {
    params: data,
  });
  return response.data;
}
