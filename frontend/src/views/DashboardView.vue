<template>
  <div class="view-container">
    <h1 class="title">Trang Dashboard - Xu hướng Danh tiếng</h1>
    <div class="card-grid">
      <div class="card card-tich-cuc">
        <h3>Sắc thái Tích cực</h3>
        <p>75% phản hồi tốt</p>
      </div>
      <div class="card card-tieu-cuc">
        <h3>Sắc thái Tiêu cực</h3>
        <p>15% phàn nàn dịch vụ</p>
      </div>
      <div class="card card-trung-tinh">
        <h3>Sắc thái Trung tính</h3>
        <p>10% đánh giá chung</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.view-container {
  padding: var(--khoang-cach-lon);
}
.title {
  font-size: 24px;
  margin-bottom: var(--khoang-cach-vua);
  color: var(--mau-chu);
}
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--khoang-cach-vua);
}
.card {
  background-color: var(--mau-nen-phu);
  border: 1px solid var(--duong-vien);
  border-radius: var(--bo-tron);
  padding: var(--khoang-cach-vua);
}
.card-tich-cuc { border-left: 4px solid var(--mau-tich-cuc); }
.card-tieu-cuc { border-left: 4px solid var(--mau-tieu-cuc); }
.card-trung-tinh { border-left: 4px solid var(--mau-trung-tinh); }
</style>