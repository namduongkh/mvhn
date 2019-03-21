const FEATURED_STATUS = {
  0: "Không",
  1: "Có",
  // 2: "Nổi bật"
}

const POSITION = {
  1: "Đặc quyền nổi bật",
  2: "Phía bên trái"
}

export default {
  featured: (status) => {
    return FEATURED_STATUS[status]
  },
  options_for_select: () => {
    let options = '';
    for (let i in FEATURED_STATUS) {
      options += `<option value="${i}">${FEATURED_STATUS[i]}</option>`;
    }
    return options;
  },
  position_name: (val) => {
    return POSITION[val];
  },
  position_options: () => {
    let options = '';
    for (let i in POSITION) {
      options += `<option value="${i}">${POSITION[i]}</option>`;
    }
    return options;
  }
}