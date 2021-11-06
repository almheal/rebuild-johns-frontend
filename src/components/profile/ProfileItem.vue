<template>
  <div class="profile-item">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'ProfileItem',
}
</script>

<style lang="scss" scoped>
.profile-item {
  position: relative;
  background-color: $light-orange-color;
  border-radius: 6px;
  padding: 12px 16px;
  margin-bottom: 10px;
  color: $brown-color;

  &:last-child {
    margin-bottom: 0;
  }
}
</style>
