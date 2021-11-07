<template>
  <div class="profile">
    <div class="container">
      <div class="profile__inner">
        <div class="profile__body">
          <div class="profile__column">
            <ProfileSidebar
              :name="user.name"
              :phoneNumber="user.phoneNumber"
              :email="user.email"
              @userChanged="changeUserHandler"
            />
          </div>
          <div class="profile__content">
            <ProfileHistoryOrders />
            <ProfileDeliveryAddresses
              :isForm="isAddressForm"
              :loading="addressLoader"
              :deliveryAddresses="user.deliveryAddresses"
              @addAddress="isAddressForm = true"
              @cancel="isAddressForm = false"
              @saveAddress="
                addNewItem({
                  value: $event,
                  key: 'deliveryAddresses',
                  loaderKey: 'addressLoader',
                  formKey: 'isAddressForm',
                })
              "
              @deleteAddress="
                removeItem({ id: $event._id, key: 'deliveryAddresses' })
              "
            />
            <ProfilePayments
              :isForm="isPaymentCard"
              :loading="paymentCardLoader"
              :paymentCards="user.paymentCards"
              @toggleForm="isPaymentCard = !isPaymentCard"
              @cancel="isPaymentCard = false"
              @saveCard="
                addNewItem({
                  value: $event,
                  key: 'paymentCards',
                  loaderKey: 'paymentCardLoader',
                  formKey: 'isPaymentCard',
                })
              "
              @deleteCard="removeItem({ id: $event._id, key: 'paymentCards' })"
            />
            <ProfileNotifications
              :sms="user.notifications?.sms"
              :company="user.notifications?.company"
              @update:sms="updateNotification('sms')"
              @update:company="updateNotification('company')"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProfileSidebar from '@components/profile/ProfileSidebar'
import ProfileHistoryOrders from '@components/profile/ProfileHistoryOrders'
import ProfileDeliveryAddresses from '@components/profile/ProfileDeliveryAddresses'
import ProfilePayments from '@components/profile/ProfilePayments'
import ProfileNotifications from '@components/profile/ProfileNotifications'

import { mapActions, mapState } from 'vuex'

export default {
  name: 'Profile',
  components: {
    ProfileSidebar,
    ProfileHistoryOrders,
    ProfileDeliveryAddresses,
    ProfilePayments,
    ProfileNotifications,
  },

  data() {
    return {
      addressLoader: false,
      isAddressForm: false,
      paymentCardLoader: false,
      isPaymentCard: false,
    }
  },

  computed: {
    ...mapState({
      user: (state) => state.user.user,
    }),
  },

  methods: {
    ...mapActions({
      updateUser: 'user/updateUser',
    }),

    changeUserHandler({ property, value }) {
      console.log(property, value)
    },

    async addNewItem({ value, loaderKey, key, formKey }) {
      this[loaderKey] = true
      await this.updateUser({
        ...this.user,
        [key]: [...this.user[key], value],
      })
      this[loaderKey] = false
      this[formKey] = false
    },

    removeItem({ id, key }) {
      const isConfirm = confirm(this.$t('app.utils.confirmDelete'))
      if (!isConfirm) {
        return
      }

      const filteredArr = this.user[key].filter((item) => item._id !== id)

      this.updateUser({
        ...this.user,
        [key]: filteredArr,
      })
    },

    updateNotification(key) {
      this.updateUser({
        ...this.user,
        notifications: {
          ...this.user.notifications,
          [key]: !this.user.notifications[key],
        },
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.profile {
  &__inner {
    padding: 100px 0 50px;
  }

  &__body {
    @include flex;

    @media (max-width: 769px) {
      flex-direction: column;
    }
  }

  &__column {
    width: 280px;
    margin-right: 32px;

    @media (max-width: 993px) {
      width: 250px;
      margin-right: 26px;
    }

    @media (max-width: 769px) {
      width: 100%;
      margin: 0 0 8px 0;
    }
  }

  &__content {
    flex: 1 1 0;
  }
}
</style>
