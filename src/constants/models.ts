export interface Movie {
  name: string;
  slug: string;
  original_name: string;
  thumb_url: string;
  poster_url: string;
  created: string;
  modified: string;
  description: string;
  total_episodes: number;
  current_episode: string;
  time: string;
  quality: string;
  language: string;
  director: string;
  casts: string;
}

export interface MoviesInfo {
  server_name: string;
  items: Episodes[];
}

export interface Episodes {
  name: string;
  slug: string;
  embed: string;
  m3u8: string;
}

export interface Comments {
  user: string;
  userId?: string;
  userComments: string;
  timestamp: string;
  photoUrl: string;
}

export interface Reviews {
  id: string;
  name: string;
  comments: Comments[];
}

export interface MovieLikes {
  name: string;
  likes: string[];
}
