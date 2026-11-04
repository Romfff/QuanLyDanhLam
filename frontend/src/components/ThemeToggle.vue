<template>
  <button 
    class="theme-toggle-btn" 
    @click="toggleTheme" 
    :title="isDark ? 'Chuyển sang giao diện Sáng' : 'Chuyển sang giao diện Tối'"
    aria-label="Toggle Dark/Light Mode"
  >
    <span class="toggle-icon">{{ isDark ? '🌙' : '☀️' }}</span>
    <span class="toggle-text">{{ isDark ? 'Tối' : 'Sáng' }}</span>
  </button>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const isDark = ref(false)

onMounted(() => {
  const saved = localStorage.getItem('dt12_theme')
  if (saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    isDark.value = true
    document.documentElement.setAttribute('data-theme', 'dark')
  } else {
    isDark.value = false
    document.documentElement.setAttribute('data-theme', 'light')
  }
})

function toggleTheme() {
  isDark.value = !isDark.value
  const mode = isDark.value ? 'dark' : 'light'
  document.documentElement.setAttribute('data-theme', mode)
  localStorage.setItem('dt12_theme', mode)
}
</script>

<style scoped>
.theme-toggle-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border-radius: 9999px;
  border: 1px solid var(--duong-vien, #e2e8f0);
  background: var(--mau-nen-phu, #ffffff);
  color: var(--mau-chu, #0f172a);
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  box-shadow: var(--bong-nhe);
}

.theme-toggle-btn:hover {
  border-color: var(--mau-nhan, #0284c7);
  transform: translateY(-1px);
}

.toggle-icon {
  font-size: 14px;
}

.toggle-text {
  font-size: 12px;
}
</style>
