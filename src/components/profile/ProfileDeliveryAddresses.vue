<template>
  <ProfileSection
    class="delivery-addresses"
    :title="$t('app.addressDelivery.title')"
  >
    <template v-if="!isForm">
      <div class="delivery-addresses__add" @click="$emit('addAddress')">
        <AppPlusButton
          class="delivery-addresses__plus"
          backgroundColor="grey"
        />
        {{ $t('app.addressDelivery.addAddress') }}
      </div>

      <ProfileList
        :items="addressesForTemplate"
        @clickCross="$emit('deleteAddress', $event)"
      />
    </template>

    <AddressDeliveryForm
      v-else
      :errors="errors"
      v-model:address="addressDelivery.address"
      v-model:apartment="addressDelivery.apartment"
      v-model:floor="addressDelivery.floor"
      v-model:intercom="addressDelivery.intercom"
      v-model:entrance="addressDelivery.entrance"
      @update:address="errors.address = ''"
    >
      <ProfileButtonsForm
        @save="saveHandler"
        @cancel="$emit('cancel')"
        :loading="loading"
      />
    </AddressDeliveryForm>
  </ProfileSection>
</template>

<script>
import ProfileSection from '@components/profile/ProfileSection'
import AppPlusButton from '@elements/AppPlusButton'
import AddressDeliveryForm from '@components/forms/AddressDeliveryForm'
import ProfileButtonsForm from '@components/profile/ProfileButtonsForm'
import ProfileList from '@components/profile/ProfileList'
import { addressValidation } from '@utils/validations'
import { resetObjProperties } from '@utils'

export default {
  name: 'ProfileDeliveryAddresses',
  components: {
    ProfileSection,
    AppPlusButton,
    AddressDeliveryForm,
    ProfileButtonsForm,
    ProfileList,
  },
  emits: ['saveAddress', 'cancel'],
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
    isForm: {
      type: Boolean,
      default: false,
    },
    deliveryAddresses: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      addressDelivery: {
        address: '',
        apartment: '',
        floor: '',
        intercom: '',
        entrance: '',
      },
      errors: {
        address: '',
      },
    }
  },

  computed: {
    addressesForTemplate() {
      return this.deliveryAddresses.map((item) => {
        const apartment = item.apartment
          ? `${this.$t('app.utils.apt')}. ${item.apartment}`
          : ''
        const floor = item.floor
          ? `${this.$t('app.utils.floor')}. ${item.floor}`
          : ''
        const intercom = item.intercom
          ? `${this.$t('app.utils.int')}. ${item.intercom}`
          : ''
        const entrance = item.entrance
          ? `${this.$t('app.utils.ent')}. ${item.entrance}`
          : ''
        const title = `${item.address} ${apartment} ${floor} ${intercom} ${entrance}`

        return {
          title,
          _id: item._id,
        }
      })
    },
  },

  watch: {
    isForm(value) {
      if (!value) {
        this.addressDelivery = resetObjProperties(this.addressDelivery)
        this.errors = resetObjProperties(this.errors)
      }
    },
  },

  methods: {
    saveHandler() {
      const isInvalid = this.validate()

      if (isInvalid) {
        return
      }

      this.$emit('saveAddress', this.addressDelivery)
    },

    validate() {
      this.errors.address = addressValidation(this.addressDelivery.address)

      return this.errors.address
    },
  },
}
</script>

<style lang="scss" scoped>
.delivery-addresses {
  &__add {
    @include flex-align-center;
    font-family: $gotham-font;
    color: $brown-color;
    margin-bottom: 24px;
    cursor: pointer;

    @include green-color-hover;

    &:hover {
      .delivery-addresses__plus {
        background-color: $green-color;
      }
    }
  }

  &__plus {
    margin-right: 10px;
  }
}
</style>
