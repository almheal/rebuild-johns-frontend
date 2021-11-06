<template>
  <ProfileSection
    class="profile-payments"
    :title="$t('app.cardAndPayment.title')"
    :subtitle="$t('app.cardAndPayment.subtitle')"
  >
    <PaymentCardForm
      :isForm="isForm"
      :errors="errors"
      :cardNumber="paymentCard.cardNumber"
      :MY="paymentCard.MY"
      :holderName="paymentCard.holderName"
      :cvv="paymentCard.cvv"
      @update:cardNumber="inputHandler($event, 'cardNumber')"
      @update:MY="inputHandler($event, 'MY')"
      @update:holderName="inputHandler($event, 'holderName')"
      @update:cvv="inputHandler($event, 'cvv')"
      @toggleForm="$emit('toggleForm')"
    >
      <template v-if="isForm">
        <div class="profile-payments__description">
          {{ $t('app.cardAndPayment.description') }}
        </div>
        <ProfileButtonsForm
          :loading="loading"
          @cancel="$emit('cancel')"
          @save="saveCardHandler"
        />
      </template>
    </PaymentCardForm>
    <ProfileList
      class="profile-payments__list"
      v-if="!isForm"
      :items="cardsForTemplate"
      @clickCross="$emit('deleteCard', $event)"
    />
  </ProfileSection>
</template>

<script>
import ProfileSection from '@components/profile/ProfileSection'
import PaymentCardForm from '@components/forms/PaymentCardForm'
import ProfileButtonsForm from '@components/profile/ProfileButtonsForm'
import ProfileList from '@components/profile/ProfileList'
import {
  cardNumberValidation,
  cardMYValidation,
  holderNameValidation,
  CVVValidation,
} from '@utils/validations'
import { resetObjProperties } from '@utils'

export default {
  name: 'ProfileDeliveryAddresses',
  components: {
    ProfileSection,
    PaymentCardForm,
    ProfileButtonsForm,
    ProfileList,
  },
  emits: ['toggleForm'],
  props: {
    isForm: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    paymentCards: {
      type: Array,
      default: () => [],
    },
  },

  watch: {
    isForm(value) {
      if (!value) {
        this.paymentCard = resetObjProperties(this.paymentCard)
      }
    },
  },

  data() {
    return {
      paymentCard: {
        cardNumber: '',
        MY: '',
        holderName: '',
        cvv: '',
      },
      errors: {
        cardNumber: '',
        MY: '',
        holderName: '',
        cvv: '',
      },
    }
  },

  computed: {
    cardsForTemplate() {
      return this.paymentCards.map((card) => {
        const title = `${card.cardNumber} ${card.holderName} ${card.MY}`
        return {
          title,
          _id: card._id,
        }
      })
    },
  },

  methods: {
    saveCardHandler() {
      const isInvalid = this.validate()

      if (isInvalid) {
        return
      }

      this.$emit('saveCard', this.paymentCard)
    },

    inputHandler(value, key) {
      this.paymentCard[key] = value
      this.errors[key] = ''
    },

    validate() {
      this.errors.cardNumber = cardNumberValidation(this.paymentCard.cardNumber)
      this.errors.MY = cardMYValidation(this.paymentCard.MY)
      this.errors.cvv = CVVValidation(this.paymentCard.cvv)
      this.errors.holderName = holderNameValidation(this.paymentCard.holderName)

      const { cardNumber, MY, cvv, holderName } = this.errors

      return cardNumber || MY || cvv || holderName
    },
  },
}
</script>

<style lang="scss" scoped>
.profile-payments {
  &__description {
    margin: 20px 0;
  }

  &__list {
    margin-top: 20px;
  }
}
</style>
