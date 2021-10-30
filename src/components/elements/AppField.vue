<template>
  <div class="app-field" :class="{ 'is-error': error }">
    <label
      class="app-field__label"
      data-test="label"
      v-if="label"
      :for="dynamicId"
      >{{ label }}</label
    >
    <div class="wrapper-relative">
      <img
        class="app-field__flag"
        data-test="flag"
        v-if="countryFlag"
        :src="
          require(`../../assets/img/${
            COUNTRY_FLAG_IMAGES[countryFlag.toUpperCase()]
          }`)
        "
        alt="country-flag"
      />
      <div
        class="app-field__icon"
        @click="passwordIsHidden = !passwordIsHidden"
      >
        <eye-icon class="icon" v-if="icon === 'eye'" />
      </div>
      <component
        class="app-field__input"
        :class="{ 'is-flag': countryFlag }"
        data-test="input"
        :value="modelValue"
        :is="fieldType"
        :id="dynamicId"
        :type="
          !passwordIsHidden && typeInput === 'password' ? 'text' : typeInput
        "
        @input="inputHandler"
      />
    </div>
    <div class="app-field__error" v-if="error" data-test="error">
      {{ error }}
    </div>
  </div>
</template>

<script>
import { COUNTRY_FLAG_IMAGES } from '@const'
import EyeIcon from '@icons/EyeIcon'

export default {
  name: 'AppField',
  components: {
    EyeIcon,
  },
  emits: ['update:modelValue'],
  props: {
    modelValue: {
      type: String,
      default: '',
    },
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
    countryFlag: {
      type: String,
      default: '',
    },
    icon: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      passwordIsHidden: true,
      COUNTRY_FLAG_IMAGES,
    }
  },
  watch: {
    modelValue(value) {
      if (this.prefix && value.slice(0, this.prefix.length) !== this.prefix) {
        this.$emit(
          'update:modelValue',
          this.validatorPrefix(this.modelValue, this.prefix)
        )
      }
    },
  },
  computed: {
    dynamicId() {
      return Math.floor(Math.random() * Date.now())
    },
  },
  methods: {
    inputHandler(e) {
      if (this.prefix) {
        e.target.value = this.validatorPrefix(e.target.value, this.prefix)
      }

      if (this.maxLength) {
        e.target.value = this.validatorMaxLength(e.target.value, this.maxLength)
      }

      if (this.typeValue) {
        e.target.value = this.validatorTypeValue(e.target.value, this.prefix)
      }

      this.$emit('update:modelValue', e.target.value)
    },

    validatorMaxLength(value, maxLength) {
      return value.length > maxLength ? value.slice(0, maxLength) : value
    },

    validatorPrefix(value, prefix) {
      const isValid = value.slice(0, prefix.length) === prefix

      if (value.length < prefix.length) {
        return `${prefix}${value}`
      }

      if (!isValid) {
        return `${prefix}${value}`
      }

      return value
    },

    validatorTypeValue(value, prefix) {
      if (this.typeValue === 'integer') {
        return this.validatorInteger(value, prefix)
      }
    },

    validatorInteger(value, prefix) {
      const splitValue = value.split('')

      const integerValue = splitValue.reduce((acc, item, index) => {
        // if isInteger || index < prefix length then isValid
        if (
          Number.isInteger(Number(item)) ||
          (prefix && index < prefix.length)
        ) {
          acc += item
        }

        return acc
      }, '')

      return integerValue
    },
  },
  mounted() {
    let initialValue = ''
    if (this.prefix) {
      initialValue = this.validatorPrefix(
        initialValue || this.modelValue,
        this.prefix
      )
    }

    if (this.maxLength) {
      initialValue = this.validatorMaxLength(
        initialValue || this.modelValue,
        this.maxLength
      )
    }

    if (initialValue) {
      this.$emit('update:modelValue', initialValue)
    }
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
    color: $brown-color;

    &.is-flag {
      padding-left: 46px;
    }
  }

  &__label {
    @include absolute-default;
  }

  &__flag {
    @include absolute-top-center(15px);
    width: 16px;
    height: 16px;
  }

  &__error {
    @include absolute-bottom-default;
    color: $dark-red-color;
  }

  &__icon {
    @include absolute-top-center-right(8px);
    cursor: pointer;
    user-select: none;

    &:hover {
      .icon {
        fill: $primary-color;
      }
    }
  }

  .icon {
    width: 24px;
    height: 24px;
    fill: $light-grey-color;
    transition: fill 0.3s;
  }
}
</style>
