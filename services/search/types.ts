export type SearchTag =
  | "story"
  | "comment"
  | "poll"
  | "pollopt"
  | "show_hn"
  | "ask_hn"
  | "front_page";

export interface SearchParams {
  keyword?: string;
  tags?: SearchTag[];
  numericFilters?: string;
  page: number;
}

export interface Map {
  [key: string]: any;
}

export interface SearchResultItem {
  created_at: string;
  title: string;
  url: string;
  author: string;
  points: number;
  story_text?: string | null;
  comment_text?: string | null;
  num_comments: number;
  story_id?: number;
  story_title?: string | null;
  story_url?: string | null;
  parent_id?: number | null;
  created_at_i: number;
  _tags: string[];
  objectID: string;
  _highlightResult: unknown;
}

export interface SearchResult {
  hits: SearchResultItem[];
  nbHits: number;
  page: number;
  nbPages: number;
  hitsPerPage: number;
  exhaustiveNbHits: boolean;
  query: string;
  params: string;
  processingTimeMS: number;
}

export interface UserProfile {
  id: number;
  username: string;
  about: string;
  karma: number;
  created_at: string;
  avg: unknown | null;
  delay: unknown | null;
  submitted: number;
  updated_at: string;
  submission_count: number;
  comment_count: number;
  created_at_i: number;
  objectID: string;
}
