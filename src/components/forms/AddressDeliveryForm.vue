<template>
  <form class="address-delivery" @submit.prevent="$emit('submit')">
    <div class="address-delivery__row">
      <AppField
        class="address-delivery__input address-delivery__input_width-100"
        :label="$t('app.addressDelivery.address')"
        :required="true"
        :modelValue="address"
        :error="$t(errors.address)"
        @update:modelValue="$emit('update:address', $event)"
      />
      <AppField
        class="address-delivery__input"
        :label="$t('app.addressDelivery.apartment')"
        :modelValue="apartment"
        :error="errors.apartment"
        @update:modelValue="$emit('update:apartment', $event)"
      />
      <AppField
        class="address-delivery__input"
        :label="$t('app.addressDelivery.floor')"
        :modelValue="floor"
        :error="errors.floor"
        @update:modelValue="$emit('update:floor', $event)"
      />
    </div>
    <div
      class="address-delivery__additional"
      :class="{ 'is-open': intercomAndEntrance }"
      @click="intercomAndEntrance = !intercomAndEntrance"
    >
      {{ $t('app.addressDelivery.intercomAndEntrance') }}
      <ArrowDownIcon class="address-delivery__arrow" />
    </div>
    <div class="address-delivery__row" v-if="intercomAndEntrance">
      <AppField
        class="address-delivery__input"
        :label="$t('app.addressDelivery.intercom')"
        :modelValue="intercom"
        :error="errors.intercom"
        @update:modelValue="$emit('update:intercom', $event)"
      />
      <AppField
        class="address-delivery__input"
        :label="$t('app.addressDelivery.entrance')"
        :modelValue="entrance"
        :error="errors.entrance"
        @update:modelValue="$emit('update:entrance', $event)"
      />
    </div>
    <slot></slot>
  </form>
</template>

<script>
import AppField from '@elements/AppField'
import ArrowDownIcon from '@icons/ArrowDownIcon'

export default {
  name: 'AddressDeliveryForm',
  components: {
    AppField,
    ArrowDownIcon,
  },
  emits: [
    'update:address',
    'update:apartment',
    'update:floor',
    'update:intercom',
    'update:entrance',
  ],
  props: {
    address: {
      type: String,
      default: '',
    },
    apartment: {
      type: String,
      default: '',
    },
    floor: {
      type: String,
      default: '',
    },
    intercom: {
      type: String,
      default: '',
    },
    entrance: {
      type: String,
      default: '',
    },
    errors: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      intercomAndEntrance: false,
    }
  },
}
</script>

<style lang="scss" scoped>
.address-delivery {
  &__address {
    width: 100%;
  }

  &__input {
    width: calc(50% - 20px);
    margin: 0 40px 24px 0;
    font-size: 14px;

    &:last-child {
      margin-right: 0;
    }

    &_width-100 {
      width: 100%;
      margin: 0 0 24px 0;
    }

    @media (max-width: 576px) {
      width: 100%;
      margin: 0 0 15px 0;
    }
  }

  &__row {
    @include flex;
    flex-wrap: wrap;

    &:last-child {
      margin-bottom: 0;
    }
  }

  &__additional {
    @include flex-align-center;
    margin-bottom: 24px;
    color: $green-color;
    cursor: pointer;
    transition: 0.3s color;

    &:hover {
      color: $dark-green-color;
    }

    &.is-open {
      .address-delivery__arrow {
        transform: rotate(-180deg);
      }
    }
  }

  &__arrow {
    fill: $green-color;
    margin-left: 8px;
    transition: transform 0.3s;
  }
}
</style>
