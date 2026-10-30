<template>
  <button class="theme-toggle" @click="toggleTheme">
    {{ isDark ? '🌙 Chế độ Tối' : '☀️ Chế độ Sáng' }}
  </button>
</template>
<script>
export default {
  data() { return { isDark: false }; },
  methods: {
    toggleTheme() {
      this.isDark = !this.isDark;
      document.documentElement.setAttribute('data-theme', this.isDark ? 'dark' : 'light');
    }
  }
}
</script>
