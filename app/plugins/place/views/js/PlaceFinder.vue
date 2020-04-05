<template>
  <div>
    <input
      type="text"
      name="address"
      :placeholder="placeholder"
      class="form-control"
      v-model="address"
      v-on:keyup="search()"
      v-on:focus="focus()"
    />
    <div v-if="suggestion.show" @click="select()" class="suggestion">
      <span v-text="suggestion.name"></span>
      <br />
      <i class="fa fa-map-marker-alt"></i>
      <small v-text="suggestion.address"></small>
    </div>
  </div>
</template>

<script>
import ResourcesService from "@CmsCore/vue/general/resources_service";
import axios from "axios";

export default {
  name: "PlaceFinder",
  props: {
    value: {
      type: String
    },
    placeholder: {
      type: String,
      default: "Địa chỉ"
    },
    getPlaceId: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      service: new ResourcesService(`${settings.services.webUrl}/places`),
      address: null,
      suggestion: {},
      searchTimeout: null,
      searchRequest: null
    };
  },
  methods: {
    focus() {
      if (
        this.address &&
        this.suggestion.name &&
        this.address.includes(this.suggestion.name)
      ) {
        this.address = "";
        this.suggestion = {};
        this.emitValue();
      }
    },
    search() {
      if (!this.address || this.address.length < 5) return;

      clearTimeout(this.searchTimeout);

      this.searchTimeout = setTimeout(() => {
        if (this.searchRequest) this.searchRequest.cancel();
        this.searchRequest = axios.CancelToken.source();

        this.service
          .member(
            "search",
            "GET",
            { cancelToken: this.searchRequest.token },
            {
              params: {
                input: this.address.trim()
              }
            }
          )
          .then(({ data }) => {
            if (data) {
              this.suggestion = {
                name: data.name,
                address: data.address,
                placeId: data.placeId,
                id: data._id,
                fullAddress: [
                  data.address.includes(data.name) ? null : data.name,
                  data.address
                ]
                  .filter(i => i)
                  .join(", "),
                show: true
              };
            } else {
              this.suggestion = {};
            }
          });
      }, 300);
    },
    select() {
      this.service
        .member(
          "detail",
          "GET",
          {},
          {
            params: {
              placeId: this.suggestion.placeId
            }
          }
        )
        .then(({ data }) => {
          this.address = this.suggestion.fullAddress;
          this.suggestion.show = false;
          this.suggestion.id = data._id;
          this.emitValue();
        });
    },
    emitValue() {
      if (this.getPlaceId) {
        this.$emit("input", this.suggestion.id);
      } else {
        this.$emit("input", this.address);
      }
    }
  },
  watch: {
    value(val) {
      if (this.getPlaceId) return;

      if (val != this.address) {
        this.address = val;
      }
    }
  }
};
</script>

<style>
.suggestion {
  font-size: 0.9em;
  padding: 0.5em;
  box-shadow: 0 0 5px 0 #ccc;
  cursor: pointer;
}
</style>
