<template>
  <div>
    {{post}}
    <fieldset class="form-group">
      <label class="form-label semibold" for="leak.url">Url</label>
      <input
        v-model="leak.url"
        data-vv-name="Url"
        type="text"
        class="form-control"
        id="leak.url"
        placeholder="Url"
      >
    </fieldset>
    <div id="content-selector"></div>
    <div class="row">
      <div class="col-sm-10">
        <fieldset class="form-group">
          <input
            v-model="leak.selector"
            data-vv-name="Selector"
            type="text"
            class="form-control"
            id="leak.selector"
            placeholder="Selector"
          >
        </fieldset>
      </div>
      <div class="col-sm-2">
        <button class="btn btn-primary" @click="leakUrl()">Leak</button>
      </div>
    </div>
    <label class="form-label semibold">Heading</label>
    <div id="heading"></div>
    <label class="form-label semibold">Image</label>
    <div id="image"></div>
    <label class="form-label semibold">Content</label>
    <div id="content"></div>
    <button class="btn btn-primary" @click="getContent()">Get content</button>
  </div>
</template>

<script>
import Axios from "axios";

export default {
  name: "LeakPost",
  props: {
    value: {
      type: Object
    },
    object: {
      type: Object
    }
  },
  data() {
    return {
      leak: {},
      post: this.value
    };
  },
  watch: {
    object: {
      // deep: true,
      handler(val) {
        console.log("object", val);
        this.post = val;
      }
    },
    // post: {
    //   deep: true,
    //   handler(val) {
    //     console.log("post", val);
    //     this.post = val;
    //   }
    // }
    "post.title"(val) {
      this.$emit("input", this.post);
    },
    "post.content"(val) {
      this.$emit("input", this.post);
    },
    "post.thumb"(val) {
      this.$emit("input", this.post);
    }
  },
  methods: {
    leakUrl() {
      let that = this;
      Axios.post(`${CMS_URL}/fetchUrl`, {
        url: that.leak.url
      }).then(resp => {
        let content = resp.data
          .replace(/\n/gim, "")
          .replace(/>\s+</gim, "><")
          .replace(/<head(((?!<\/head>).)|\n)+<\/head>/gim, "")
          .replace(/<script(((?!<\/script>).)|\n)+<\/script>/gim, "")
          .replace(/href="[^"]+"/gim, 'href="#"');

        var div = document.createElement("div");
        div.innerHTML = content;
        if (!that.leak.selector) {
          let selector = "";
          $(div)
            .find('[id*="content"], [class*="content"]')
            .each(function() {
              let text = "";
              if ($(this).attr("id")) text += "#" + $(this).attr("id");
              if ($(this).attr("class")) text += "." + $(this).attr("class");
              selector +=
                '<a href="javascript:void(0)" class="selector-text">' +
                text +
                "</a> ";
            });
          $("#content-selector").html(selector);
          $("#content-selector .selector-text").on("click", function() {
            that.leak.selector = $(this).text();
            that.$forceUpdate();
            that.leakUrl();
          });
          return;
        }

        // Bind the content
        $("#content").html(
          $(div)
            .find(that.leak.selector)
            .html()
        );
        // Remove redundancy element
        $("#content div:has(>div)").each(function() {
          $(this).replaceWith($(this).html());
        });
        $("#content div, #content p").each(function() {
          let html = $(this).html();
          if (!html || html == "&nbsp;") {
            $(this).remove();
          }
        });
        $("#content div, #content p")
          .off("click")
          .on("click", function() {
            if ($(this).find("div, p").length == 0) {
              $(this).remove();
            }
          });

        // Bind heading to use to title
        let heading = "";
        $(div)
          .find("h1, h2")
          .each(function(i) {
            if (i == 0) {
              that.post.title = $(this).text();
              that.$forceUpdate();
            }
            heading += this.outerHTML;
          });
        $("#heading").html(heading);
        $("#heading h1, #heading h2").on("click", function() {
          that.post.title = $(this).text();
          $("#heading .hidden")
            .not($(this))
            .removeClass("hidden");
          $(this).addClass("hidden");
          that.$forceUpdate();
        });

        // Bind image to use to thumb
        let image = "";
        $("#content img").each(function(i) {
          if (i == 0) {
            that.post.thumb = $(this).attr("src");
            that.$forceUpdate();
          }
          image += this.outerHTML;
        });
        $("#image").html(image);
        $("#image img").on("click", function() {
          that.post.thumb = $(this).attr("src");
          $("#image img.hidden")
            .not($(this))
            .removeClass("hidden");
          $(this).addClass("hidden");
          that.$forceUpdate();
        });
      });
    },
    getContent() {
      this.post.content = $("#content").html();
      this.$forceUpdate();
    }
  }
};
</script>

<style lang="scss">
#heading h1,
#heading h2 {
  border: 1px solid #eee;
  padding: 0.25em;
  font-size: 1em;
}
#image img {
  width: 25%;
  height: auto;
}
#content {
  height: 500px;
  overflow: hidden;
  overflow-y: scroll;
}
#content div,
#content p {
  border: 1px solid #eee;
  padding: 0.5em;
}

#content img {
  max-width: 100%;
  height: auto;
}
</style>
