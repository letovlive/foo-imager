<template>
    <div
      id="app"
      class="app"
    >
        <el-row class="full-height">
            <el-col :xl="24">
                <header-container></header-container>
            </el-col>
            <el-col
              :xs="24"
              :sm="24"
              :md="8"
              :lg="6"
              class="container"
            >
                <sidebar v-model="image">
                    <div slot="bottom">
                        <el-form-item label="Text">
                            <el-input
                              :placeholder="fileName"
                              v-model="text"
                            >
                            </el-input>
                        </el-form-item>
                        <el-form-item
                          :label="$t('label.filename')"
                        >
                            <el-input
                              :placeholder="fileName"
                              v-model="userFileName"
                            >
                            </el-input>
                        </el-form-item>
                        <el-form-item
                          :label="$t('label.extension')"
                        >
                            <el-select
                              v-model="imageType"
                              :placeholder="$t('placeholder.select_extension')"
                            >
                                <el-option
                                  v-for="(type, key) in imageTypes"
                                  :key="key"
                                  :label="type.label"
                                  :value="type.value"
                                >
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <div class="el-form-submit-wrapper">
                            <el-button
                              @click.prevent="save"
                              slot="buttons"
                              type="primary"
                            >
                                {{ $t('button.download') }}
                            </el-button>
                        </div>
                    </div>
                </sidebar>
            </el-col>
            <el-col
              class="container"
              :xs="24"
              :sm="24"
              :md="16"
              :lg="18"
            >
                <main-container
                  :image="image"
                  :text="text"
                  v-bind:svg.sync="svg"
                >
                </main-container>
            </el-col>
            <el-col
              :xs="24"
              :sm="24"
              :md="24"
              :lg="24"
            >
                <footer-container></footer-container>
            </el-col>
        </el-row>

    </div>
</template>

<script>
  import Sidebar from './components/Sidebar.vue';
  import MainContainer from './components/MainContainer.vue';
  import FooterContainer from './components/FooterContainer.vue';
  import HeaderContainer from './components/HeaderContainer.vue';
  import canvg from 'canvg';
  import { saveAs } from 'file-saver/FileSaver';
  import Vue from 'vue';

  export default Vue.extend({

    /**
     * Name.
     */
    name: 'App',

    /**
     * Reactive properties.
     */
    data () {
      return {
        fileName: '',
        userFileName: '',
        svg: {},
        text: '',
        imageType: 'png',
        image: {
          height: 200,
          width: 200,
          backgroundColor: 'rgba(19, 206, 102, 0.8)',
          fontColor: 'rgba(19, 206, 102, 0.8)'
        }
      };
    },

    /**
     * Components
     */
    components: {
      MainContainer,
      Sidebar,
      FooterContainer,
      HeaderContainer
    },

    /**
     * Mounted hook.
     */
    mounted () {
      this.setFileName();
    },

    /**
     * Computed properties.
     */
    computed: {

      /**
       * Image types
       */
      imageTypes () {
        return [
          { label: 'PNG', value: 'png' },
          { label: 'JPG', value: 'jpg' },
          { label: 'GIF', value: 'gif' },
          { label: 'SVG', value: 'svg' }
        ];
      },
    },

    /**
     * Methods.
     */
    methods: {
      /**
       * Save image.
       */
      save () {
        saveAs(this.imageType === 'svg' ? this.saveSvg() : this.saveImage(),
          `${this.userFileName || this.fileName}_${Date.now()}.${this.imageType}`);
      },

      /**
       * Set file name.
       */
      setFileName () {
        this.fileName = `${this.image.width}x${this.image.height}`;
      },

      saveImage () {
        const canvas = document.createElement('canvas');
        canvas.width = this.image.width;
        canvas.height = this.image.height;

        canvg(canvas, this.svg.parentNode.innerHTML.trim());
        const data = atob(canvas.toDataURL(`image/${this.imageType}`)
          .substring(`data:image/${this.imageType};base64,`.length));
        const asArray = new Uint8Array(data.length);

        for (let i = 0, len = data.length; i < len; ++i) {
          asArray[i] = data.charCodeAt(i);
        }

        return new Blob([asArray.buffer], { type: `image/${this.imageType}` });
      },

      saveSvg () {
        return new Blob(['<?xml version="1.0" standalone="no"?>\r\n', this.svg.outerHTML],
          { type: 'image/svg+xml;charset=utf-8' });
      },

    },

    /**
     * Watchers.
     */
    watch: {
      /**
       * Image height watcher.
       */
      'image.height' () {
        this.setFileName();
      },

      /**
       * Image width watcher.
       */
      'image.width' () {
        this.setFileName();
      },
    }
  });
</script>