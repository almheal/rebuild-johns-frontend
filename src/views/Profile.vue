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
              @saveAddress="changeAddress"
              @addAddress="isAddressForm = true"
              @cancel="isAddressForm = false"
              @deleteAddress="deleteAddressHandler"
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
import ProfileNotifications from '@components/profile/ProfileNotifications'

import { mapActions, mapState } from 'vuex'

export default {
  name: 'Profile',
  components: {
    ProfileSidebar,
    ProfileHistoryOrders,
    ProfileDeliveryAddresses,
    ProfileNotifications,
  },

  data() {
    return {
      addressLoader: false,
      isAddressForm: false,
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

    async changeAddress(address) {
      this.addressLoader = true
      await this.updateUser({
        ...this.user,
        deliveryAddresses: [...this.user.deliveryAddresses, address],
      })
      this.addressLoader = false
      this.isAddressForm = false
    },

    deleteAddressHandler({ _id }) {
      const isConfirm = confirm(this.$t('app.utils.confirmDelete'))
      if (!isConfirm) {
        return
      }

      const deliveryAddresses = this.user.deliveryAddresses.filter(
        (address) => address._id !== _id
      )

      this.updateUser({
        ...this.user,
        deliveryAddresses,
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
  }

  &__column {
    width: 280px;
    margin-right: 32px;
  }

  &__content {
    flex: 1 1 0;
  }
}
</style>
