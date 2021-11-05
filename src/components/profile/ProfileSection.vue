<template>
  <section class="profile-section">
    <div class="profile-section__header">
      <div class="profile-section__title" v-if="title">{{ title }}</div>
      <div class="profile-section__subtitle" v-if="subtitle">
        {{ subtitle }}
      </div>
    </div>
    <slot></slot>
  </section>
</template>

<script>
export default {
  name: 'ProfileSection',
  props: {
    title: {
      type: String,
      default: '',
    },
    subtitle: {
      type: String,
      default: '',
    },
  },
}
</script>

<style lang="scss" scoped>
.profile-section {
  padding: 32px 64px 30px;
  margin-bottom: 8px;
  border-radius: 10px;
  background-color: $white-color;

  &:last-child {
    margin-bottom: 0;
  }
}
</style>
