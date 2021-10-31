<template>
  <div class="language">
    <div
      class="language__list"
      data-test="languages"
      :class="{ 'is-active': isActive }"
    >
      <div
        class="language__item"
        data-test="language"
        v-for="language in languages"
        :class="{
          'is-active': language.title === selectedLanguageTitle,
          'is-show': isActive,
        }"
        :key="language.title"
        @click="languageHandler(language)"
      >
        {{ language.title }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppLanguage',
  emits: ['selectLanguage'],
  props: {
    languages: {
      type: Array,
      default: () => [],
    },
    selectedLanguageTitle: {
      type: String,
      default: '',
    },
  },
  data: () => ({
    isActive: false,
  }),
  methods: {
    languageHandler(language) {
      if (language.title !== this.selectedLanguageTitle) {
        this.$emit('selectLanguage', language)
        this.isActive = false
        return
      } else {
        this.isActive = !this.isActive
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.language {
  position: relative;
  width: 50px;
  height: 50px;
  font-family: $gotham-font;

  @media (max-width: 769px) {
    width: auto;
    height: auto;
  }

  &__list {
    @include absolute-default;
    @include flex;
    flex-direction: column;
    border-radius: 5px;

    &.is-active {
      background-color: $white-color;
      box-shadow: 0 2px 12px 0 rgba(41, 44, 51, 0.2);

      @media (max-width: 769px) {
        background-color: transparent;
        box-shadow: initial;
      }
    }

    @media (max-width: 769px) {
      flex-direction: row;
      position: relative;
    }
  }

  &__item {
    display: none;
    width: 50px;
    height: 50px;
    text-transform: capitalize;
    user-select: none;
    cursor: pointer;

    &.is-active,
    &.is-show {
      @include flex-center;
    }

    &.is-show {
      @include green-color-hover;
    }

    &.is-active {
      order: -1;
    }

    @media (max-width: 769px) {
      @include flex-center;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      margin: 0 8px;
      transition: 0.3s;

      &.is-active {
        background-color: $smoky-white;
        color: $brown-color;
        order: initial;
      }
    }
  }
}
</style>
