<template>
  <div class="profile">
    <div class="container">
      <div class="profile__inner">
        <div class="profile__body">
          <div class="profile__column">
            <ProfileSidebar
              :user="user"
              :imageLoader="imageLoader"
              :authLoader="authLoader"
              :userLoader="userLoader"
              @updateUser="changeUserHandler"
              @changeImage="changeUserAvatar"
            />
          </div>
          <div class="profile__content">
            <ProfileHistoryOrders />
            <ProfileDeliveryAddresses
              :isForm="isAddressForm"
              :loading="addressLoader"
              :user="user"
              @addAddress="isAddressForm = true"
              @cancel="isAddressForm = false"
              @updateUser="
                updateUserHandler({
                  user: $event,
                  loaderKey: 'addressLoader',
                  formKey: 'isAddressForm',
                })
              "
            />
            <ProfilePayments
              :isForm="isPaymentCardForm"
              :loading="paymentCardLoader"
              :user="user"
              @toggleForm="isPaymentCardForm = !isPaymentCardForm"
              @cancel="isPaymentCardForm = false"
              @updateUser="
                updateUserHandler({
                  user: $event,
                  loaderKey: 'paymentCardLoader',
                  formKey: 'isPaymentCardForm',
                })
              "
            />
            <ProfileNotifications
              :user="user"
              @updateUser="
                updateUserHandler({
                  user: $event,
                })
              "
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
import * as imageService from '@/services/image.service'
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
      isPaymentCardForm: false,
      imageLoader: false,
      userLoader: false,
    }
  },

  computed: {
    ...mapState({
      user: (state) => state.user.user,
      authLoader: (state) => state.user.authLoader,
    }),
  },

  methods: {
    ...mapActions({
      updateUser: 'user/updateUser',
    }),

    changeUserHandler({ key, value }) {
      this.updateUserHandler({
        user: { ...this.user, [key]: value },
        loaderKey: 'userLoader',
      })
    },

    async changeUserAvatar(formData) {
      this.imageLoader = true
      const imgUrl = await imageService.create(formData)
      await this.updateUser({
        ...this.user,
        img: imgUrl,
      })
      this.imageLoader = false
    },

    async updateUserHandler({ user, loaderKey, formKey }) {
      if (loaderKey) {
        this[loaderKey] = true
      }

      await this.updateUser(user)

      if (loaderKey) {
        this[loaderKey] = false
      }

      if (formKey) {
        this[formKey] = false
      }
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
