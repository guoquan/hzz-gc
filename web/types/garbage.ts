export type GarbageID = string; // UUID or unique slug
export type UserID = string;    // WeChat ID or Nickname

export enum GarbageStatus {
  NEW = 'NEW',             // Just allocated (Eden Space)
  SURVIVOR = 'SURVIVOR',   // Survived at least one Minor GC
  TENURED = 'TENURED',     // Long-term useful (Old Gen)
  UNREACHABLE = 'UNREACHABLE' // No recent interactions
}

export interface Garbage {
  /**
   * Unique identifier for the garbage object.
   * Address in the heap.
   */
  id: GarbageID;

  /**
   * The name of the garbage tool/script.
   */
  title: string;

  /**
   * The creator of this garbage.
   */
  author: UserID;

  /**
   * A brief description of what this garbage does.
   * "What problem does this solve in 5 minutes?"
   */
  description: string;

  /**
   * Pointers to the actual code or deployment.
   */
  links: {
    repo?: string;   // GitHub/GitLab link
    demo?: string;   // Live demo URL
    download?: string; // Direct file link
    other?: string[];
  };

  /**
   * Metadata for categorization.
   */
  tags: string[];

  /**
   * Allocation timestamp.
   */
  created_at: string; // ISO 8601 string for serialization

  /**
   * Last access or modification timestamp.
   */
  updated_at: string; // ISO 8601 string

  /**
   * Number of strong references (likes/uses) held by others.
   */
  reference_count: number;

  /**
   * Current lifecycle state of the object.
   */
  status: GarbageStatus;

  /**
   * AI-generated vector embedding for Semantic GC (Phase 3).
   */
  embedding?: number[]; 
}
