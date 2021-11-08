<template>
  <div
    class="app-field"
    :class="{
      'is-message': error || message,
      'is-promo-code': componentName === 'promoCode',
      large: size === 'large',
    }"
  >
    <label
      class="app-field__label"
      data-test="label"
      v-if="label"
      :for="id || dynamicId"
      >{{ label }}<span v-if="required">*</span></label
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
        data-test="eye"
        v-if="icon === 'eye'"
        @click="passwordIsHidden = !passwordIsHidden"
      >
        <EyeIcon class="icon" />
      </div>
      <component
        class="app-field__input"
        data-test="input"
        :class="{
          'is-flag': countryFlag,
          'text-center': textAlign === 'center',
        }"
        :placeholder="placeholder"
        :value="modelValue"
        :disabled="disabled"
        :is="fieldType"
        :id="id || dynamicId"
        :type="
          !passwordIsHidden && typeInput === 'password' ? 'text' : typeInput
        "
        @input="inputHandler"
        @click.stop
      />

      <slot></slot>
    </div>
    <div
      class="app-field__message"
      :class="{ 'is-error': error, 'is-success': message }"
      v-if="error || message"
      data-test="message"
    >
      {{ error || message }}
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
    id: {
      type: [String, Number],
      default: '',
    },
    label: {
      type: String,
      default: '',
    },
    typeInput: {
      type: String,
      default: 'text',
    },
    placeholder: {
      type: String,
      default: '',
    },
    error: {
      type: String,
      default: '',
    },
    message: {
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
    componentName: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    textAlign: {
      type: String,
      default: '',
    },
    required: {
      type: Boolean,
      default: false,
    },
    size: {
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

    if (initialValue && initialValue !== this.modelValue) {
      this.$emit('update:modelValue', initialValue)
    }
  },
}
</script>

<style lang="scss" scoped>
.app-field {
  position: relative;
  padding-top: 26px;
  font-size: 16px;

  &.is-promo-code {
    padding-top: 0;

    .app-field__input {
      border: 1px solid $smoky-white;
      border-radius: 20px;
      height: 46px;
      padding: 8px 50px 8px 20px;
      transition: 0.3s;

      &:focus {
        background-color: $white-color;
        border-color: $green-color;
      }
    }
  }

  &.large {
    .app-field__input {
      height: 62px;
      border-radius: 12px;
    }
  }

  &__label {
    @include absolute-default;
  }

  &__input {
    height: 49px;
    width: 100%;
    padding: 12px 16px;
    border-radius: 2px;
    background-color: $smoky-white;
    font-size: 1em;
    font-weight: inherit;
    color: $brown-color;
    transition: background-color 0.3s;

    &::placeholder {
      color: $light-grey-color;
      font-size: 14px;
    }

    &:focus {
      background-color: $light-smoky-white;
    }

    &.is-flag {
      padding-left: 46px;
    }

    &.text-center {
      text-align: center;
    }
  }

  &__flag {
    @include absolute-top-center(15px);
    width: 16px;
    height: 16px;
  }

  &__message {
    font-size: 0.875em;
    margin: 5px 0;

    &.is-error {
      color: $dark-red-color;
    }

    &.is-success {
      color: $green-color;
    }
  }

  &__icon {
    @include absolute-top-center-right(8px);
    cursor: pointer;
    user-select: none;
    width: 24px;
    height: 24px;

    &:hover {
      .icon {
        fill: $primary-color;
      }
    }
  }

  .icon {
    width: 100%;
    height: 100%;
    fill: $light-grey-color;
    transition: fill 0.3s;
  }
}
</style>
