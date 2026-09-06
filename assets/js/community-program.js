function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, ch => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[ch]));
}


let people = JSON.parse(localStorage.getItem("fallprev_people")) || [];
updateTable(); updateGroupSummary();

function addPerson() {
  const name = document.getElementById("name").value;
  const age = document.getElementById("age").value;
  const tugSec = parseFloat(document.getElementById("tugSec").value);
  const fall = document.getElementById("fall").checked ? 1 : 0;
  const aids = Array.from(document.querySelectorAll("input[name='aid']:checked")).map(cb => cb.value);
  const aid = aids.length > 0 ? aids.join("、") : "無";
  const pain = document.getElementById("pain").value;

  if (!name || !age || isNaN(tugSec)) {
    alert("請完整填寫姓名、年齡與 TUG 測試秒數");
    return;
  }

  let score = 0;
  if (tugSec >= 20) score += 2; else if (tugSec >= 14) score += 1;
  if (fall) score += 1;
  if (aid !== "無") score += 1;
  if (pain === "中度" || pain === "重度") score += 1;

  let group = "體能較佳組";
  if (score >= 4) group = "體能差且疼痛問題組";
  else if (score >= 2) group = "體能較差組";

  const answers = Array.from(document.querySelectorAll("#personForm input[type='radio']:checked")).map(el => el.value);
  const hasAnyYes = answers.includes("是");
  const assessmentResult = hasAnyYes ? "⚠️ 需諮詢醫師後再進行激烈運動" : "✅ 可安全參與運動計畫";

  people.push({ name, age, tug: tugSec, fall: fall ? "是" : "否", aid, pain, score, group, assessmentResult });
  localStorage.setItem("fallprev_people", JSON.stringify(people));
  updateTable();
  updateGroupSummary();
  document.getElementById("personForm").reset();
}

function updateTable() {
  const tbody = document.querySelector("#personTable tbody");
  tbody.innerHTML = "";
  people.forEach((p, index) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `<td>${escapeHtml(p.name)}</td><td>${escapeHtml(p.age)}</td><td>${escapeHtml(p.tug)}</td><td>${escapeHtml(p.fall)}</td><td>${escapeHtml(p.aid)}</td><td>${escapeHtml(p.pain)}</td><td>${escapeHtml(p.score)}</td><td>${escapeHtml(p.group)}</td><td>${escapeHtml(p.assessmentResult)}</td><td><button class="btn-remove" onclick="removePerson(${index})">❌</button></td>`;
    tbody.appendChild(tr);
  });
}

function removePerson(index) {
  people.splice(index, 1);
  localStorage.setItem("fallprev_people", JSON.stringify(people));
  updateTable();
  updateGroupSummary();
}

function updateGroupSummary() {
  const summary = {};
  people.forEach(p => { if (!summary[p.group]) summary[p.group] = []; summary[p.group].push(p.name); });
  let result = "👥 分群結果：\n";
  for (const g in summary) { result += `【${g}】\n- ${summary[g].join("，")}\n`; }
  result += "\n📌 客製化運動建議：\n體能較佳組：走路訓練、階梯訓練、動態平衡訓練\n體能較差組：椅上運動、簡化徒手運動、靜態平衡\n體能差且疼痛問題組：物理治療介入與輔具運用";
  document.getElementById("groupSummary").innerText = result;
}

function exportExcel() {
  let csv = "姓名,年齡,TUG(秒),跌倒史,助行器,疼痛,分數,分群,安全評估建議\n";
  people.forEach(p => { csv += `${p.name},${p.age},${p.tug},${p.fall},${p.aid},${p.pain},${p.score},${p.group},${p.assessmentResult}\n`; });
  downloadCSV(csv, '群體評估資料.csv');
}

function shareToLINE() {
  if (people.length === 0) { alert("目前沒有個案資料可供傳送"); return; }
  const p = people[people.length - 1];
  const msg = encodeURIComponent(`📋 ${p.name} 分群：${p.group}\n建議：${p.assessmentResult}`);
  window.open(`https://line.me/R/msg/text/?${msg}`, "_blank");
}

function addAttendanceRow() {
  const tbody = document.querySelector("#attendanceTable tbody");
  const row = document.createElement("tr");
  row.innerHTML = `
    <td><input type="text" placeholder="週次"></td>
    <td><input type="number" placeholder="人數"></td>
    <td><input type="text" placeholder="訓練內容"></td>
    <td><input type="text" placeholder="指導員"></td>
    <td><input type="text" placeholder="備註"></td>
    <td><button class="btn-remove" onclick="removeAttendanceRow(this)">❌</button></td>
  `;
  tbody.appendChild(row);
  saveAttendanceData();
}

function removeAttendanceRow(button) {
  const row = button.closest("tr");
  row.remove();
  saveAttendanceData();
}

function saveAttendanceData() {
  const rows = document.querySelectorAll("#attendanceTable tbody tr");
  const data = [];
  rows.forEach(row => {
    const inputs = row.querySelectorAll("input");
    const rowData = Array.from(inputs).map(input => input.value);
    data.push(rowData);
  });
  localStorage.setItem("fallprev_attendanceData", JSON.stringify(data));
}

function loadAttendanceData() {
  const stored = localStorage.getItem("fallprev_attendanceData");
  if (stored) {
    const data = JSON.parse(stored);
    if (data.length === 0) return;
    const tbody = document.querySelector("#attendanceTable tbody");
    tbody.innerHTML = "";
    data.forEach(rowData => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td><input type="text" placeholder="週次或日期" value="${escapeHtml(rowData[0] || '')}"></td>
        <td><input type="number" placeholder="人數" value="${escapeHtml(rowData[1] || '')}"></td>
        <td><input type="text" placeholder="訓練內容" value="${escapeHtml(rowData[2] || '')}"></td>
        <td><input type="text" placeholder="指導員" value="${escapeHtml(rowData[3] || '')}"></td>
        <td><input type="text" placeholder="備註" value="${escapeHtml(rowData[4] || '')}"></td>
        <td><button class="btn-remove" onclick="removeAttendanceRow(this)">❌</button></td>
      `;
      tbody.appendChild(row);
    });
  }
}

document.addEventListener("input", function (e) {
  if (e.target.closest("#attendanceTable")) {
    saveAttendanceData();
  }
});

window.addEventListener("load", loadAttendanceData);

function exportAttendance() {
  const rows = document.querySelectorAll("#attendanceTable tbody tr");
  let csv = "週次,出席人數,訓練內容,指導員,備註\n";
  rows.forEach(row => {
    const data = Array.from(row.querySelectorAll("input")).map(input => input.value);
    csv += data.join(",") + "\n";
  });
  downloadCSV(csv, 'attendance_record.csv');
}

function downloadCSV(csv, filename) {
  const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
}
