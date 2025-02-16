// User related types
export interface User {
  id: string;
  email: string;
  avatar?: string;
}

// Card related types
export interface CardMember {
  id: string;
  email: string;
}

export interface Label {
  id: string;
  text: string;
  color: string;
}

export interface ChecklistItem {
  id: string;
  text: string;
  completed: boolean;
}

export interface Checklist {
  id: string;
  title: string;
  items: ChecklistItem[];
}

export interface Comment {
  id: string;
  text: string;
  userId: string;
  userEmail: string;
  createdAt: string;
}

export interface Attachment {
  id: string;
  type: 'image' | 'file' | 'link';
  url: string;
  name: string;
  createdAt: string;
  size?: number;
}

export interface Card {
  id: string;
  number: number;
  title: string;
  description?: string;
  columnId: string;
  members: CardMember[];
  labels: Label[];
  checklists: Checklist[];
  comments: Comment[];
  attachments?: Attachment[];
  createdAt?: string;
  updatedAt?: string;
  dueDate?: string;
  order?: number;
}

// Column related types
export interface Column {
  id: string;
  title: string;
  order: number;
  cards: Card[];
  createdAt?: string;
  updatedAt?: string;
}

// Dashboard related types
export interface Dashboard {
  id: string;
  title: string;
  createdAt: string;
  updatedAt?: string;
  ownerIds: string[]; // Changed from ownerId to ownerIds
  members: User[];
  columns: Column[];
  background?: string;
  description?: string;
  isPublic?: boolean;
  settings?: DashboardSettings;
}

export interface DashboardSettings {
  allowComments: boolean;
  allowInvites: boolean;
  allowCardCreation: boolean;
  allowColumnCreation: boolean;
  defaultDueDate?: number; // Days from card creation
  cardNumberPrefix?: string;
  cardNumberSuffix?: string;
}

// Activity related types
export interface Activity {
  id: string;
  type: ActivityType;
  userId: string;
  userEmail: string;
  entityId: string;
  entityType: 'card' | 'column' | 'dashboard';
  data: any;
  createdAt: string;
}

export type ActivityType =
  | 'card_create'
  | 'card_update'
  | 'card_move'
  | 'card_delete'
  | 'column_create'
  | 'column_update'
  | 'column_move'
  | 'column_delete'
  | 'member_add'
  | 'member_remove'
  | 'comment_add'
  | 'comment_update'
  | 'comment_delete'
  | 'attachment_add'
  | 'attachment_remove'
  | 'checklist_create'
  | 'checklist_update'
  | 'checklist_delete'
  | 'label_add'
  | 'label_remove';

// Notification related types
export interface Notification {
  id: string;
  type: NotificationType;
  userId: string;
  title: string;
  message: string;
  read: boolean;
  data?: any;
  createdAt: string;
}

export type NotificationType =
  | 'mention'
  | 'due_date'
  | 'card_assignment'
  | 'comment'
  | 'board_invitation';

// API Response types
export interface ApiResponse<T> {
  data?: T;
  error?: {
    message: string;
    code: string;
  };
}

// Pagination types
export interface PaginationParams {
  page: number;
  limit: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  search?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// WebSocket types
export interface WebSocketMessage {
  type: string;
  event: string;
  payload: any;
}

export interface PresenceState {
  userId: string;
  email: string;
  lastSeen: string;
  status: 'online' | 'away' | 'offline';
}