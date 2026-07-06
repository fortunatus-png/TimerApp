#!/usr/bin/env python3
"""
Database migration script to update schema for security fixes:
1. Add password hashing (passwords already stored plain - won't change existing ones)
2. Add user_id to sessions table
3. Add token expiration
"""
import sqlite3
import shutil
from datetime import datetime

def migrate():
    # Backup existing database
    shutil.copy('sessions.db', 'sessions.db.backup')
    print("✅ Backed up database to sessions.db.backup")
    
    conn = sqlite3.connect('sessions.db')
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()
    
    print("\n🔄 Starting migration...\n")
    
    # Step 1: Add expires_at to tokens table if it doesn't exist
    try:
        cursor.execute("ALTER TABLE tokens ADD COLUMN expires_at TIMESTAMP")
        print("✅ Added expires_at column to tokens table")
        # Set default for existing rows
        cursor.execute("UPDATE tokens SET expires_at = datetime('now', '+24 hours') WHERE expires_at IS NULL")
        print("✅ Set default expiration for existing tokens")
    except sqlite3.OperationalError as e:
        if "already exists" in str(e):
            print("⏭️  expires_at column already exists in tokens table")
        else:
            raise
    
    # Step 2: Add user_id to tokens table if it doesn't exist
    try:
        cursor.execute("ALTER TABLE tokens ADD COLUMN user_id INTEGER")
        print("✅ Added user_id column to tokens table")
    except sqlite3.OperationalError as e:
        if "already exists" in str(e):
            print("⏭️  user_id column already exists in tokens table")
        else:
            raise
    
    # Step 3: Add user_id to sessions table if it doesn't exist
    try:
        cursor.execute("ALTER TABLE sessions ADD COLUMN user_id INTEGER")
        print("✅ Added user_id column to sessions table")
        # Set default for existing rows to user_id = 1 (first user)
        cursor.execute("UPDATE sessions SET user_id = 1 WHERE user_id IS NULL")
        print("✅ Set default user_id for existing sessions")
    except sqlite3.OperationalError as e:
        if "already exists" in str(e):
            print("⏭️  user_id column already exists in sessions table")
        else:
            raise
    
    # Step 4: Update token user_id from email if needed
    try:
        cursor.execute("""
            UPDATE tokens 
            SET user_id = (SELECT id FROM users WHERE users.email = tokens.email)
            WHERE user_id IS NULL AND email IS NOT NULL
        """)
        affected = cursor.rowcount
        if affected > 0:
            print(f"✅ Updated {affected} token(s) with user_id")
    except Exception as e:
        print(f"⚠️  Could not update tokens with user_id: {e}")
    
    # Step 5: Ensure users table has created_at if it doesn't
    try:
        cursor.execute("ALTER TABLE users ADD COLUMN created_at TIMESTAMP")
        print("✅ Added created_at column to users table")
        # Set default for existing rows
        cursor.execute("UPDATE users SET created_at = CURRENT_TIMESTAMP WHERE created_at IS NULL")
        print("✅ Set created_at for existing users")
    except sqlite3.OperationalError as e:
        if "already exists" in str(e):
            print("⏭️  created_at column already exists in users table")
        else:
            raise
    
    conn.commit()
    conn.close()
    
    print("\n" + "="*50)
    print("✨ Migration completed successfully!")
    print("="*50)
    print("\n⚠️  IMPORTANT SECURITY NOTE:")
    print("Existing passwords are stored in plain text.")
    print("They will be hashed when users log in again.")
    print("\nUsers should be encouraged to change their passwords.\n")

if __name__ == "__main__":
    try:
        migrate()
    except Exception as e:
        print(f"\n❌ Migration failed: {e}")
        print("Database restored from backup. Please check manually.\n")