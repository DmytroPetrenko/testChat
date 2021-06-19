<template>
  <v-card>
    <v-card-text>
      <MyImage :user="user" :size="`75`" />
      <div class="text-block">
        <v-card-title>{{ user.name }}</v-card-title>
        <v-card-subtitle>
          {{
            "Listen to your favorite artists and albums whenever and wherever, online and offline."
              | truncate(50, "...")
          }}
        </v-card-subtitle>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import MyImage from "@/components/MyImage.vue";
export default {
  components: { MyImage },
  props: ["user"],
  filters: {
    truncate: function(text, length, suffix) {
      if (text.length > length) {
        return text.substring(0, length) + suffix;
      } else {
        return text;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.v-card__text {
  display: flex;
  flex-wrap: nowrap;
  border: 0;
  padding: 0;
  cursor: pointer;
  .text-block {
    .v-card__title {
      font-size: 16px;
      color: #333333;
      font-weight: 400;
      padding-top: 5px;
    }
    .v-card__subtitle {
      font-size: 14px;
      color: #999999;
      line-height: 1;
    }
  }
}
</style>
