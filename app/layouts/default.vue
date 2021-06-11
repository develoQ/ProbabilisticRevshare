<template>
  <v-app>
    <v-app-bar fixed app flat color="white">
      <v-img :src="require('@/assets/OpenPaymentsLogo.svg')" max-width="36" max-height="36" />
      <v-toolbar-title class="ml-2"> Probabilistic Revshare </v-toolbar-title>
    </v-app-bar>
    <v-main style="background: #ffffff">
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <v-footer app absolute class="py-10 text-caption">
      <v-row class="flex-column" align-content="center">
        <v-col cols="4" class="text-center py-1">
          <span>by <a href="http://twitter.com/_tequ_"> @_TeQu_</a></span>
        </v-col>
        <v-col cols="4" class="text-center py-1">
          <a href="https://webmonetization.org/prob-revshare"> WebMonetization - Probabilistic Revshare Generator </a>
        </v-col>
      </v-row>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/',
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: '/inspire',
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js',
    }
  },
}
</script>
