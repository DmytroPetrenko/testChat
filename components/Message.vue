<template>
  <v-row justify="center" no-gutters class="msg-row">
    <v-col class="msg-wrapper">
      <v-row no-gutters justify="space-between" class="msg">
        <v-col>
          <span class="font-weight-bold">{{ message.name }}</span>
          <p class="mb-0">
            {{ message.text }}
          </p>
        </v-col>
        <v-col cols="auto">
          <span class="msg__date ml-3">{{ message.time }}</span>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: ["message"]
  /* computed: {
    isSystemMessage() {
      return this.message.name === "admin";
    }
  } */
};
</script>

<style lang="scss" scoped>
.msg-wrapper {
  display: flex;
  flex-direction: column;
}

.msg {
  padding: 1rem;
  width: 60%;
  margin: 0 1rem;
  box-shadow: 0 1px 0 0 rgba(50, 50, 50, 0.3);
  border-radius: 4px;
  background: #1976d2;
  color: #fff;
  position: relative;
  word-break: break-all;
  margin-bottom: 1rem;

  &__date {
    text-decoration: underline;
  }
}

@media (max-width: 400px) {
  .msg {
    width: 90%;
  }
}
</style>
