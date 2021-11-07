<template>
  <ProfileSection
    class="profile-notifications"
    :title="$t('app.profile.notification.title')"
  >
    <div class="profile-notifications__row">
      <div class="profile-notifications__item">
        <AppCheckbox
          class="profile-notifications__checkbox"
          :label="$t('app.profile.notification.sms')"
          :modelValue="sms"
          @update:modelValue="$emit('update:sms', $event)"
        />
      </div>
      <div class="profile-notifications__item">
        <AppCheckbox
          class="profile-notifications__checkbox"
          :label="$t('app.profile.notification.about')"
          :modelValue="company"
          @update:modelValue="$emit('update:company', $event)"
        />
        <div class="profile-notifications__text">
          {{ $t('app.profile.notification.emailNewsletter') }}
        </div>
      </div>
    </div>
  </ProfileSection>
</template>

<script>
import ProfileSection from '@components/profile/ProfileSection'
import AppCheckbox from '@elements/AppCheckbox'

export default {
  name: 'ProfileDeliveryAddresses',
  components: {
    ProfileSection,
    AppCheckbox,
  },
  props: {
    sms: {
      type: Boolean,
      default: false,
    },
    company: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style lang="scss" scoped>
.profile-notifications {
  &__row {
    @include flex;

    @media (max-width: 993px) {
      flex-direction: column;
    }
  }

  &__item {
    width: 50%;
    margin-right: 15px;

    &:nth-child(2n) {
      margin-right: 0;
    }

    @media (max-width: 993px) {
      margin: 0 0 15px 0;
      width: 100%;

      &:last-child {
        margin-bottom: 0;
      }
    }
  }

  &__text {
    font-size: 12px;
    margin-top: 5px;
  }

  &__checkbox {
    font-family: $gotham-font;
    color: $brown-color;
  }
}
</style>
