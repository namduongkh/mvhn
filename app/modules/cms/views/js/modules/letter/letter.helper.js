const PUBLISH_STATUS = {
  // 0: "Lưu nháp",
  1: "Duyệt",
  2: "Chờ duyệt",
  3: "Chưa duyệt"
}

export default {
  publish_status: (status) => {
    return PUBLISH_STATUS[status]
  },
  options_for_select: () => {
    let options = '';
    for (let i in PUBLISH_STATUS) {
      options += `<option value="${i}">${PUBLISH_STATUS[i]}</option>`;
    }
    return options;
  },
}