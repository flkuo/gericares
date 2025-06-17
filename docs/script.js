fetch('./data/resource.json')
  .then(response => response.json())
  .then(data => renderList(data))
  .catch(err => {
    console.error("資料讀取失敗：", err);
    document.getElementById("list").innerHTML = "⚠ 無法載入資料";
  });
