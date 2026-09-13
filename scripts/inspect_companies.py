import sqlite3
import json
import os

DB_PATH = "F:/Notes/Businesses/SAAS_Businesses/DeadSaaS/prisma/dev.db"

def inspect():
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    c.execute("SELECT slug, name, batch, ycUrl FROM Company")
    rows = c.fetchall()
    print(f"Total companies in dev.db: {len(rows)}")
    for r in rows:
        print(f"  {r[0]:<18} | {r[1]:<16} | batch: {r[2]:<15} | url: {r[3]}")
    conn.close()

if __name__ == "__main__":
    inspect()
