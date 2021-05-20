// You can include shared interfaces/types in a separate file
// and then use them in any component by importing them. For
// example, to import the interface below do:
//
// import { User } from 'path/to/interfaces';

export type User = {
  id: number;
  name: string;
};

export type StoryListType = "top" | "best" | "new";

export interface StoryItem {
  by: string;
  deleted?: boolean;
  descendants: number;
  id: number;
  kids?: number[];
  score: number;
  time: number;
  title: string;
  type: "story";
  url?: string;
}

export interface CommentItem {
  by: string;
  deleted?: boolean;
  id: number;
  kids?: number[];
  parent: number;
  text: string;
  time: number;
  type: "comment";
}

export interface AskItem extends StoryItem {
  text: string;
}

export interface JobItem {
  by: string;
  id: number;
  score: number;
  text: string;
  time: number;
  title: string;
  type: "job";
  url?: string;
}

export interface PollItem {
  by: string;
  descendants: number;
  id: number;
  kids?: number[];
  parts: number[];
  score: number;
  text: string;
  time: number;
  title: string;
  type: "poll";
}

export interface PollOptItem {
  by: string;
  id: number;
  poll: number;
  score: number;
  text: string;
  time: number;
  type: "pollopt";
}

export type NewsItem =
  | StoryItem
  | CommentItem
  | AskItem
  | JobItem
  | PollItem
  | PollOptItem;

export interface UserItem {
  about: string;
  created: number;
  delay: number;
  id: string;
  karma: number;
  submitted: number[];
}
