import urllib.request
import re

req = urllib.request.Request('https://bookface-static.ycombinator.com/vite/assets/inertia-ycdc-57zi-FVW.js', headers={'User-Agent': 'Mozilla/5.0'})
try:
    js = urllib.request.urlopen(req, timeout=10).read().decode('utf-8')
    print("JS length:", len(js))
    algolia = [m for m in re.findall(r'[\w\-]+algolia[\w\-]+', js, re.I)]
    print("Algolia matches:", set(algolia))
    app_ids = re.findall(r'appId[:\s"\']+([A-Z0-9]{8,12})', js)
    print("App IDs:", app_ids)
    api_keys = re.findall(r'apiKey[:\s"\']+([a-zA-Z0-9]{25,40})', js)
    print("Api Keys:", api_keys)
except Exception as e:
    print("Error:", e)
