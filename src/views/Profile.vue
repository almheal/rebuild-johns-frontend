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
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProfileSidebar from '@components/profile/ProfileSidebar'
import { mapState } from 'vuex'

export default {
  name: 'Profile',
  components: {
    ProfileSidebar,
  },
  computed: {
    ...mapState({
      user: (state) => state.user.user,
    }),
  },

  methods: {
    changeUserHandler({ property, value }) {
      console.log(property, value)
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
}
</style>
