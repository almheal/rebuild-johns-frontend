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

  @media (max-width: 993px) {
    padding: 32px;
  }

  @media (max-width: 380px) {
    padding: 32px 20px;
  }

  &:last-child {
    margin-bottom: 0;
  }

  &__header {
    padding-bottom: 10px;
    border-bottom: 1px solid $wolf-grey-color;
    margin-bottom: 32px;

    @media (max-width: 576px) {
      margin-bottom: 26px;
    }
  }

  &__title {
    font-family: $gotham-font;
    font-weight: 700;
    font-size: 18px;
    color: $brown-color;
    margin-bottom: 6px;

    @media (max-width: 576px) {
      font-size: 16px;
    }
  }

  &__subtitle {
    font-size: 12px;
  }
}
</style>
