<template>
  <label class="checkbox label" :for="dynamicId">
    <input
      class="input"
      :id="dynamicId"
      :value="modelValue"
      :checked="modelValue"
      type="checkbox"
      @change="$emit('update:modelValue', $event.target.checked)"
    />
    <span class="checkbox__customize">
      <CheckMarkIcon class="checkbox__mark" />
    </span>
    <label class="label" :for="dynamicId" v-if="label">{{ label }}</label>
  </label>
</template>

<script>
import CheckMarkIcon from '@icons/CheckMarkIcon'

export default {
  name: 'AppCheckBox',
  components: {
    CheckMarkIcon,
  },
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      default: '',
    },
  },
  computed: {
    dynamicId() {
      return Math.floor(Date.now() * Math.random())
    },
  },
}
</script>

<style lang="scss" scoped>
.label {
  cursor: pointer;
  user-select: none;
  font-size: 14px;
  font-weight: 400;
  transition: 0.3s;

  &:hover {
    color: $green-color;
  }
}

.checkbox {
  @include flex-align-center;

  &__customize {
    position: relative;
    width: 18px;
    height: 18px;
    border: 2px solid $light-grey-color;
    border-radius: 4px;
    margin-right: 10px;
    transition: 0.3s;
  }

  &__mark {
    @include absolute-center;
    color: $white-color;
    opacity: 0;
  }
}

.input {
  position: absolute;
  z-index: -1;
  opacity: 0;

  &:checked + .checkbox__customize {
    background-color: $green-color;
    border-color: $green-color;

    .checkbox__mark {
      opacity: 1;
    }
  }
}
</style>
