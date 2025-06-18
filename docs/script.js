fetch('./data/resource.json')
  .then(response => response.json())
  .then(data => {
    const list = document.getElementById("resource-list");
    list.innerHTML = '';

    data.forEach(item => {
      const div = document.createElement("div");
      div.innerHTML = `
        <p><strong>${item.title}</strong><br>
        🔗 <a href="${item.url}" target="_blank">${item.url}</a><br>
        📅 更新日期：${item.date}</p><hr>`;
      list.appendChild(div);
    });
  })
  .catch(error => {
    document.getElementById("resource-list").innerText = "⚠️ 無法載入資料";
    console.error("Error loading data:", error);
  });
