import requests
from bs4 import BeautifulSoup
import json
from datetime import datetime

BASE_URL = "https://www2.bh.cmu.edu.tw/NewsInfo?type=2"
OUTPUT_FILE = "docs/data/resource.json"

def fetch_resources():
    response = requests.get(BASE_URL)
    response.encoding = 'utf-8'
    if response.status_code != 200:
        raise Exception("無法讀取網站內容")

    soup = BeautifulSoup(response.text, 'html.parser')
    cards = soup.select('.card')  # 假設你網站內的影片卡片 class 叫做 .card

    data = []
    for card in cards:
        title = card.select_one('.card-title').text.strip()
        url = card.select_one('a')['href'].strip()
        full_url = f"https://www2.bh.cmu.edu.tw/{url}"
        date = datetime.today().strftime("%Y-%m-%d")

        data.append({
            "title": title,
            "url": full_url,
            "date": date
        })

    with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

    print("✅ 資料已更新")

if __name__ == "__main__":
    fetch_resources()
