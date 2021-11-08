<template>
  <div class="profile-sidebar">
    <div class="profile-sidebar__body">
      <div class="profile-sidebar__header">
        <div
          class="profile-sidebar__avatar"
          :class="{ 'is-loading': imageLoader }"
          @click="openFile"
        >
          <AppUserAvatar :img="copyUser.img" size="large" />
          <input
            type="file"
            class="profile-sidebar__file"
            ref="file"
            @change="fileHandler"
          />
          <div class="profile-sidebar__icon">
            <img
              class="profile-sidebar__img"
              src="../../assets/img/camera.svg"
              alt="upload-camera"
            />
          </div>
          <AppCircleLoader
            class="image-loader"
            v-if="imageLoader"
            color="green"
            size="medium"
          />
        </div>
        <ProfileField
          class="profile-sidebar__name"
          v-if="!authLoader"
          textAlign="center"
          :loading="userLoader && lastActiveInputName === INPUT_NAMES.NAME"
          :modelValue="copyUser.name"
          :isField="activeInputName === INPUT_NAMES.NAME"
          @clickEdit="toggleField(INPUT_NAMES.NAME)"
          @update:modelValue="changeHandler($event, 'name')"
        />
        <AppCircleLoader v-if="authLoader" color="green" size="medium" />
      </div>
      <div class="profile-sidebar__list" v-if="!authLoader">
        <ProfileField
          class="profile-sidebar__field"
          prefix="+7"
          typeValue="integer"
          :label="$t('app.profile.phoneNumber')"
          :loading="
            userLoader && lastActiveInputName === INPUT_NAMES.PHONE_NUMBER
          "
          :modelValue="copyUser.phoneNumber"
          :maxLength="PHONE_LENGTH_WITH_PREFIX"
          :isField="activeInputName === INPUT_NAMES.PHONE_NUMBER"
          :error="
            errors.phoneNumber?.params
              ? $t(errors.phoneNumber.message, errors.phoneNumber.params)
              : $t(errors.phoneNumber) || ''
          "
          @clickEdit="toggleField(INPUT_NAMES.PHONE_NUMBER)"
          @update:modelValue="changeHandler($event, 'phoneNumber')"
        />
        <ProfileField
          class="profile-sidebar__field"
          :label="$t('app.profile.email')"
          :loading="userLoader && lastActiveInputName === INPUT_NAMES.EMAIL"
          :modelValue="copyUser.email"
          :isField="activeInputName === INPUT_NAMES.EMAIL"
          :error="
            errors.email?.params
              ? $t(errors.email.message, errors.email.params)
              : $t(errors.email) || ''
          "
          @clickEdit="toggleField(INPUT_NAMES.EMAIL)"
          @update:modelValue="changeHandler($event, 'email')"
        />
        <ProfileField
          class="profile-sidebar__field"
          fieldType="dropdown"
          :label="$t('app.profile.gender.title')"
          :loading="userLoader && lastActiveInputName === INPUT_NAMES.GENDER"
          :modelValue="$t(getGender.title)"
          :toShow="(item) => $t(item.title)"
          :list="GENDERS"
          :isField="activeInputName === INPUT_NAMES.GENDER"
          @clickEdit="toggleField(INPUT_NAMES.GENDER)"
          @update:modelValue="changeHandler($event.param, 'gender')"
        />
      </div>
    </div>
  </div>
</template>

<script>
import AppUserAvatar from '@elements/AppUserAvatar'
import ProfileField from '@components/profile/ProfileField'
import AppCircleLoader from '@elements/AppCircleLoader'
import { GENDERS, PHONE_LENGTH_WITH_PREFIX } from '@const'
import { eventClickDocument } from '@utils'
import { phoneValidation, emailValidation } from '@utils/validations'

export default {
  name: 'ProfileSidebar',
  components: {
    AppUserAvatar,
    ProfileField,
    AppCircleLoader,
  },
  emits: ['changeImage', 'updateUser'],
  props: {
    user: {
      type: Object,
      default: () => ({}),
    },
    img: {
      type: String,
      default: '',
    },
    imageLoader: {
      type: Boolean,
      default: false,
    },
    authLoader: {
      type: Boolean,
      default: false,
    },
    userLoader: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    copyUser: {
      phoneNumber: '',
      email: '',
      gender: '',
    },
    activeInputName: '',
    lastActiveInputName: '',
    INPUT_NAMES: {
      NAME: 'name',
      PHONE_NUMBER: 'phoneNumber',
      EMAIL: 'email',
      GENDER: 'gender',
    },
    errors: {
      phoneNumber: '',
      email: '',
    },
    GENDERS,
    PHONE_LENGTH_WITH_PREFIX,
  }),

  watch: {
    user() {
      this.changeCopyUser()
    },
  },

  computed: {
    getGender() {
      return this.copyUser.gender
        ? GENDERS[this.copyUser.gender.toUpperCase()]
        : { title: 'app.utils.notSelected' }
    },
  },

  methods: {
    changeHandler(value, key) {
      this.copyUser[key] = value
      this.errors[key] = ''
    },

    toggleField(inputName) {
      eventClickDocument(() => {
        if (this.activeInputName) {
          this.activeInputName = ''
          const isChanges = this.changeCheck(inputName)

          if (isChanges) {
            const invalid = this.validate(inputName)

            if (!invalid) {
              this.$emit('updateUser', {
                value: this.copyUser[inputName],
                key: inputName,
              })
            }
          }
          return
        }

        this.lastActiveInputName = inputName
        this.activeInputName = inputName
      })
    },

    changeCheck(inputName) {
      return this.copyUser[inputName] !== this.user[inputName]
    },

    validate(inputName) {
      if (inputName === this.INPUT_NAMES.PHONE_NUMBER) {
        this.errors.phoneNumber = phoneValidation(this.copyUser.phoneNumber)
        return this.errors.phoneNumber
      }

      if (inputName === this.INPUT_NAMES.EMAIL) {
        this.errors.email = emailValidation(this.copyUser.email)
        return this.errors.email
      }
    },

    changeCopyUser() {
      if (!Object.keys(this.user).length) {
        return
      }

      const { name, phoneNumber, email, gender } = this.user

      this.copyUser = {
        name,
        phoneNumber,
        email,
        gender,
      }
    },

    openFile() {
      this.$refs.file.click()
    },

    fileHandler(e) {
      const file = e.target.files[0]
      const formData = new FormData()
      formData.append('file', file)

      this.$emit('changeImage', formData)
    },
  },

  mounted() {
    this.changeCopyUser()
  },
}
</script>

<style lang="scss" scoped>
.profile-sidebar {
  background-color: $white-color;
  border-radius: 10px;
  padding: 28px;

  &__header {
    @include flex-align-center;
    flex-direction: column;
    margin-bottom: 32px;
  }

  &__avatar {
    @include flex-justify(center);
    position: relative;
    margin: -98px 0 28px;
    border-radius: 50%;

    &:not(.is-loading) {
      &:hover {
        .profile-sidebar__icon {
          opacity: 1;
        }
      }
    }
  }

  &__file {
    display: none;
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

.image-loader {
  @include absolute-center;
  z-index: 50;
}
</style>
