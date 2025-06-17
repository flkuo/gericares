import requests
from bs4 import BeautifulSoup
import json
from datetime import datetime

def fetch_cmu_video_resources():
    url = "https://www2.bh.cmu.edu.tw/NewsInfo?type=2"
    headers = {"User-Agent": "Mozilla/5.0"}
    res = requests.get(url, headers=headers)
    res.encoding = "utf-8"

    if res.status_code != 200:
        raise Exception("Failed to retrieve the page.")

    soup = BeautifulSoup(res.text, "html.parser")
    items = soup.select(".media-body")

    data = []
    for item in items:
        title_tag = item.select_one("a")
        date_tag = item.select_one("small")
        if title_tag and date_tag:
            title = title_tag.get_text(strip=True)
            link = "https://www2.bh.cmu.edu.tw" + title_tag.get("href")
            date = date_tag.get_text(strip=True)
            data.append({
                "title": title,
                "url": link,
                "date": date
            })

    return data

if __name__ == "__main__":
    try:
        result = fetch_cmu_video_resources()
        output = {
            "last_updated": datetime.now().isoformat(),
            "resources": result
        }
        with open("docs/data/resource.json", "w", encoding="utf-8") as f:
            json.dump(output, f, ensure_ascii=False, indent=2)
        print("✅ 資料已成功寫入 data/resource.json")
    except Exception as e:
        print("❌ 發生錯誤：", e)
