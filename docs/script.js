fetch('data/resource.json')
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    console.log("✅ 成功載入 JSON：", data);
    const list = document.getElementById("resource-list");
    list.innerHTML = ''; // 清空
    data.forEach(item => {
      const div = document.createElement("div");
      div.innerHTML = `
        <p><strong>${item.title}</strong><br>
        🔗 <a href="${item.url}" target="_blank">${item.url}</a><br>
        📅 日期：${item.date}</p>
        <hr>`;
      list.appendChild(div);
    });
  })
  .catch(error => {
    console.error("❌ 無法載入資料：", error);
    document.getElementById("resource-list").innerText = "⚠️ 資料載入失敗，請稍後再試";
  });
