exports.orderStatusText = (status) => {
  return {
    'ordering': '<span class="label label-default">Đang chọn hàng</span>',
    'ordered': '<span class="label label-primary">Đã đặt hàng</span>',
    'active': '<span class="label label-success">Đang xử lý</span>',
    'ready': '<span class="label label-info">Đã sẵn sàng</span>',
    'delivering': '<span class="label label-success">Đang vận chuyển</span>',
    'delivered': '<span class="label label-secondary">Đã vận chuyển</span>',
    'done': '<span class="label label-default">Hoàn thành</span>',
    'cancel': '<span class="label label-danger">Đã hủy bỏ</span>'
  }[status]
}
