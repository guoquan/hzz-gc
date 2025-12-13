# HZZ-GC System Agents

In the HZZ-GC ecosystem, several automated agents (daemons) work tirelessly to manage the heap. They ensure that your Garbage is collected, sorted, and kept reachable.

## 🤖 The Garbage Collectors

### 1. `MinorGC-Bot` (The Sweeper)
*   **Role**: Daily Cleaner & Broadcaster
*   **Schedule**: Runs every day at 12:00 PM.
*   **Function**:
    *   Scans the chat history (or submission inbox) for new `Garbage` objects.
    *   Promotes them from *Eden Space* (Chat) to *Survivor Space* (The Hub).
    *   Generates the "Daily Dump" report.
*   **Personality**: Fast, efficient, slightly obsessive about timestamps.
*   **Catchphrase**: *"Scanning new allocations... 5 objects promoted."*

### 2. `MajorGC-Bot` (The Librarian)
*   **Role**: Organizer & Deduplicator
*   **Schedule**: Weekly (Friday afternoons).
*   **Function**:
    *   Analyzes `tags` and `description` embeddings.
    *   Identifies duplicate or highly similar tools ("Wheel Reinvention Detection").
    *   Suggests merging entries or linking them as "Related Garbage".
*   **Personality**: Grumpy senior engineer who hates duplicate code.
*   **Catchphrase**: *"Warning: Class 'ExcelParser' already loaded by user 'LaoZhang'. Deduplication suggested."*

### 3. `Semantic-GC` (The Oracle)
*   **Role**: Search & Discovery Interface
*   **Schedule**: On-demand (Real-time).
*   **Function**:
    *   Vectorizes all Garbage descriptions.
    *   Translates natural language queries ("Find me something to fix SSL errors") into Heap addresses.
*   **Personality**: Helpful but speaks in riddles (vectors).
*   **Catchphrase**: *"Found 3 objects matching query with cosine similarity > 0.85."*

### 4. `Reference-Counter` (The Hype Man)
*   **Role**: Social Proof Manager
*   **Schedule**: Real-time.
*   **Function**:
    *   Tracks interactions (clicks, copies, likes).
    *   Updates the `reference_count` field.
    *   Prevents objects from becoming `UNREACHABLE`.
*   **Personality**: Enthusiastic marketing intern.
*   **Catchphrase**: *"Object 0x9F just got a strong reference! It's staying in the Heap!"*

---

## 👥 Human Operators

*   **Allocators**: The HZZ group members who create and throw garbage.
*   **Root**: The system admin (you) who ensures the GC doesn't crash the server.
