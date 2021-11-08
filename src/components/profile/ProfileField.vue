<template>
  <div
    class="profile-field"
    :class="{
      'text-center': textAlign === 'center',
      'is-label': label,
    }"
  >
    <label class="profile-field__label" :for="id" v-if="label">{{
      label
    }}</label>
    <div class="profile-field__placeholder" v-if="!isField">
      <span class="profile-field__value">
        {{ modelValue }}
        <AppCircleLoader
          v-if="loading"
          class="profile-field__loader"
          color="green"
          size="small"
        />
        <PenIcon
          v-else
          class="profile-field__icon"
          @click="$emit('clickEdit')"
        />
      </span>
    </div>
    <AppField
      class="profile-field__input"
      v-if="isField && fieldType === 'input'"
      :class="{ 'padding_top-0': !label }"
      :id="id"
      :textAlign="textAlign"
      :maxLength="maxLength"
      :prefix="prefix"
      :typeValue="typeValue"
      :modelValue="modelValue"
      @update:modelValue="$emit('update:modelValue', $event)"
    />
    <AppDropdown
      class="profile-field__dropdown"
      v-if="isField && fieldType === 'dropdown'"
      :modelValue="modelValue"
      :list="list"
      :toShow="toShow"
      @update:modelValue="$emit('update:modelValue', $event)"
    />
    <div class="profile-field__error" v-if="error">{{ error }}</div>
  </div>
</template>

<script>
import AppField from '@elements/AppField'
import AppDropdown from '@elements/AppDropdown'
import PenIcon from '@icons/PenIcon'
import AppCircleLoader from '@elements/AppCircleLoader'

export default {
  name: 'ProfileField',
  components: {
    AppField,
    AppDropdown,
    PenIcon,
    AppCircleLoader,
  },
  emits: ['clickEdit'],
  props: {
    id: {
      type: [String, Number],
      default: '',
    },
    label: {
      type: String,
      default: '',
    },
    isField: {
      type: Boolean,
      default: false,
    },
    modelValue: {
      type: String,
      default: '',
    },
    textAlign: {
      type: String,
      default: '',
    },
    fieldType: {
      type: String,
      default: 'input',
    },
    list: {
      type: [Array, Object],
      default: () => [],
    },
    toShow: {
      type: Function,
      default: (item) => item,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    maxLength: {
      type: [String, Number],
      default: '',
    },
    prefix: {
      type: String,
      default: '',
    },
    typeValue: {
      type: String,
      default: '',
    },
    error: {
      type: String,
      default: '',
    },
  },
}
</script>

<style lang="scss" scoped>
.profile-field {
  position: relative;
  font-size: 14px;

  &__input {
    font-weight: 500;
    padding-top: 0;
    font-size: 1em;
  }

  &.is-label {
    padding-top: 20px;
  }

  &.text-center {
    text-align: center;
  }

  &__label {
    @include absolute-default;
    z-index: 20;
    font-size: 12px;
  }

  &__placeholder {
    display: inline-flex;
    position: relative;
    height: 49px;
    max-width: 100%;
    user-select: none;
  }

  &__value {
    @include flex-align-center;
    font-family: $gotham-font;
    color: $brown-color;
    overflow: hidden;
    font-size: 1em;
  }

  &__icon {
    @include absolute-top-center-right(0);
    width: 16px;
    height: 16px;
    fill: $light-grey-color;
    transform: translate(calc(100% + 6px), -50%);
    cursor: pointer;
    transition: fill 0.3s;

    &:hover {
      fill: $primary-color;
    }
  }

  &__loader {
    @include absolute-top-center-right(0);
    transform: translate(calc(100% + 6px), -50%);
  }

  &__dropdown {
    font-weight: 500;
  }

  &__error {
    color: $dark-red-color;
    margin: 5px 0;
    font-size: 12px;
  }
}
</style>
