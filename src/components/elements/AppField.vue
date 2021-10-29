<template>
  <div class="app-field" :class="{ 'is-error': error }">
    <label :for="dynamicId" class="app-field__label" v-if="label">{{
      label
    }}</label>
    <div class="wrapper-relative">
      <component
        class="app-field__input"
        :is="fieldType"
        :id="dynamicId"
        :type="typeInput"
      />
    </div>
    <div class="app-field__error" v-if="error">{{ error }}</div>
  </div>
</template>

<script>
export default {
  name: 'AppField',
  props: {
    fieldType: {
      type: String,
      default: 'input',
    },
    label: {
      type: String,
      default: '',
    },
    typeInput: {
      type: String,
      default: 'text',
    },
    error: {
      type: String,
      default: '',
    },
  },
  computed: {
    dynamicId() {
      return Math.floor(Math.random() * Date.now())
    },
  },
}
</script>

<style lang="scss" scoped>
.app-field {
  position: relative;
  padding-top: 20px;

  &.is-error {
    padding-bottom: 18px;
  }

  &__input {
    height: 49px;
    width: 100%;
    padding: 12px 16px;
    border-radius: 2px;
    background-color: $smoky-white;
    font-size: 16px;
  }

  &__label {
    @include absolute-default;
  }

  &__error {
    @include absolute-bottom-default;
    color: $dark-red-color;
  }
}
</style>
