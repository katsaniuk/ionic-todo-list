<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Home</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="home-page" :fullscreen="true">
      <ion-header>
        <ion-toolbar>
          <ion-buttons class="ion-justify-content-center ion-text-uppercase">
            <ion-button :routerLink="{ path: '/todo' }"> Todo </ion-button>
            <ion-button :routerLink="{ path: '/calendar' }">
              Calendar
            </ion-button>
            <ion-button :routerLink="{ path: '/map' }"> Map </ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>
      <p class="content">Welcome to your App</p>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonButton
} from '@ionic/vue';
</script>

<style scoped>
.home-page {
  --background: url('../img/homePageBackground.jpg') center center / cover
    no-repeat;
  white-space: nowrap;
}

.content {
  color: #fff;
  text-align: center;
  font-size: 40px;
}
</style>
