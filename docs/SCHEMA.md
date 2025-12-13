# HZZ-GC Object Schema

This document defines the structure of a `Garbage` object within the HZZ-GC system.

## Type Definition (TypeScript)

```typescript
type GarbageID = string; // UUID or unique slug
type UserID = string;    // WeChat ID or Nickname

enum GarbageStatus {
  NEW = 'NEW',             // Just allocated (Eden Space)
  SURVIVOR = 'SURVIVOR',   // Survived at least one Minor GC
  TENURED = 'TENURED',     // Long-term useful (Old Gen)
  UNREACHABLE = 'UNREACHABLE' // No recent interactions
}

interface Garbage {
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
  created_at: Date; // ISO 8601

  /**
   * Last access or modification timestamp.
   */
  updated_at: Date; // ISO 8601

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
```

## JSON Example

```json
{
  "id": "obj-0x123456",
  "title": "WeChat History Exporter",
  "author": "OldWang_CEO",
  "description": "A python script to dump chat history to Markdown. Written while drunk.",
  "links": {
    "repo": "https://github.com/hzz/garbage-dump"
  },
  "tags": ["python", "wechat", "cli"],
  "created_at": "2025-12-12T23:45:00Z",
  "updated_at": "2025-12-13T10:00:00Z",
  "reference_count": 5,
  "status": "NEW"
}
```
