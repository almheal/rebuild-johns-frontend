<template>
  <div class="profile-sidebar">
    <div class="profile-sidebar__body">
      <div class="profile-sidebar__header">
        <div class="profile-sidebar__avatar">
          <AppUserAvatar size="large" />
          <div class="profile-sidebar__icon">
            <img
              class="profile-sidebar__img"
              src="../../assets/img/camera.svg"
              alt="upload-camera"
            />
          </div>
        </div>
        <ProfileField
          class="profile-sidebar__name"
          textAlign="center"
          :modelValue="user.name || name"
          :isField="activeInputName === INPUT_NAMES.NAME"
          @clickEdit="toggleField(INPUT_NAMES.NAME)"
          @update:modelValue="changeHandler($event, 'name')"
        />
      </div>
      <div class="profile-sidebar__list">
        <ProfileField
          class="profile-sidebar__field"
          :label="$t('app.profile.phoneNumber')"
          :modelValue="user.phoneNumber || phoneNumber"
          :isField="activeInputName === INPUT_NAMES.PHONE_NUMBER"
          @clickEdit="toggleField(INPUT_NAMES.PHONE_NUMBER)"
          @update:modelValue="changeHandler($event, 'phoneNumber')"
        />
        <ProfileField
          class="profile-sidebar__field"
          :label="$t('app.profile.email')"
          :modelValue="email"
          :isField="activeInputName === INPUT_NAMES.EMAIL"
          @clickEdit="toggleField(INPUT_NAMES.EMAIL)"
          @update:modelValue="changeHandler($event, 'email')"
        />
        <ProfileField
          class="profile-sidebar__field"
          fieldType="dropdown"
          :label="$t('app.profile.gender.title')"
          :modelValue="$t(getGender)"
          :toShow="(item) => $t(item)"
          :list="GENDERS"
          :isField="activeInputName === INPUT_NAMES.GENDER"
          @clickEdit="toggleField(INPUT_NAMES.GENDER)"
          @update:modelValue="changeHandler($event, 'gender')"
        />
      </div>
    </div>
  </div>
</template>

<script>
import AppUserAvatar from '@elements/AppUserAvatar'
import ProfileField from '@components/profile/ProfileField'
import { GENDERS } from '@const'

export default {
  name: 'ProfileSidebar',
  components: {
    AppUserAvatar,
    ProfileField,
  },
  props: {
    name: {
      type: String,
      default: '',
    },
    phoneNumber: {
      type: String,
      default: '',
    },
    email: {
      type: String,
      default: '',
    },
    gender: {
      type: String,
      default: '',
    },
    dateOfBirth: {
      type: String,
      default: '',
    },
    password: {
      type: String,
      default: '',
    },
  },
  data: () => ({
    user: {
      phoneNumber: '',
      email: '',
      gender: '',
    },
    activeInputName: '',
    INPUT_NAMES: {
      NAME: 'name',
      PHONE_NUMBER: 'phoneNumber',
      EMAIL: 'email',
      GENDER: 'gender',
    },
    GENDERS,
  }),

  computed: {
    getGender() {
      return this.user.gender || this.gender || 'app.utils.notSelected'
    },
  },

  methods: {
    changeHandler(value, key) {
      this.user[key] = value
    },

    toggleField(inputName) {
      this.activeInputName = inputName
    },

    changeCheck(inputName) {
      return this.user[inputName]
        ? this[inputName] !== this.user[inputName]
        : false
    },
  },
}
</script>

<style lang="scss" scoped>
.profile-sidebar {
  background-color: $white-color;
  border-radius: 10px;
  padding: 28px;

  &__header {
    margin-bottom: 32px;
  }

  &__avatar {
    @include flex-justify(center);
    position: relative;
    margin: -98px 0 28px;
    border-radius: 50%;

    &:hover {
      .profile-sidebar__icon {
        opacity: 1;
      }
    }
  }

  &__icon {
    @include absolute-center;
    @include flex-center;
    z-index: 5;
    width: 46px;
    height: 46px;
    border-radius: 50%;
    background-color: rgba($brown-color, 0.5);
    cursor: pointer;
    opacity: 0;
    transition: opacity 0.3s;
  }

  &__img {
    width: 32px;
    height: 32px;
  }

  &__name {
    font-size: 18px;
  }

  &__list {
    @media (max-width: 769px) {
      @include flex;
      flex-wrap: wrap;
    }
  }

  &__field {
    margin-bottom: 20px;

    @media (max-width: 769px) {
      width: calc(50% - 7px);
      margin-bottom: 14px;

      &:nth-child(2n) {
        margin-left: 14px;
      }
    }

    @media (max-width: 576px) {
      width: 100%;

      &:nth-child(2n) {
        margin-left: 0;
      }
    }
  }
}
</style>
