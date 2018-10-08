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
                name="fileName"
                :placeholder="fileName"
                v-model="userFileName"
              >
              </el-input>
            </el-form-item>
            <el-form-item
              :label="$t('label.extension')"
            >
              <el-select
                name="imageType"
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
                name="download"
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

<script lang="ts">
  import { Vue, Component, Watch } from 'vue-property-decorator';
  import Image from '@/interfaces/Image';
  import Sidebar from '@/components/Sidebar.vue';
  import MainContainer from '@/components/MainContainer.vue';
  import FooterContainer from '@/components/FooterContainer.vue';
  import HeaderContainer from '@/components/HeaderContainer.vue';
  import canvg from 'canvg';
  import { saveAs } from 'file-saver/FileSaver';

  @Component({
    /**
     * Components
     */
    components: {
      MainContainer,
      Sidebar,
      FooterContainer,
      HeaderContainer
    },
  })
  export default class TheApp extends Vue {
    /**
     * File name.
     */
    fileName: string = '';

    /**
     * Custom file name.
     */
    userFileName: string = '';

    /**
     * SVG container.
     */
    svg: HTMLElement = document.createElement('svg');

    /**
     * Image text.
     */
    text: string = '';

    /**
     * Image type.
     */
    imageType: string = 'png';

    /**
     * Image settings.
     */
    image: Image = {
      height: 200,
      width: 200,
      backgroundColor: 'rgba(19, 206, 102, 0.8)',
      fontColor: 'rgba(19, 206, 102, 0.8)'
    };

    /**
     * Mounted hook.
     */
    mounted () {
      this.setFileName();
    }

    /**
     * Image types
     */
    get imageTypes (): any[] {
      return [
        {
          label: 'PNG',
          value: 'png'
        },
        {
          label: 'JPG',
          value: 'jpg'
        },
        {
          label: 'GIF',
          value: 'gif'
        },
        {
          label: 'SVG',
          value: 'svg'
        }
      ];
    }

    /**
     * Save image.
     */
    save (): void {
      saveAs(this.imageType === 'svg' ? this.saveSvg() : this.saveImage(),
        `${this.userFileName || this.fileName}_${Date.now()}.${this.imageType}`);
    }

    /**
     * Set file name.
     */
    setFileName () {
      this.fileName = `${this.image.width}x${this.image.height}`;
    }

    /**
     * Save image.
     * @return {Blob}
     */
    saveImage () {
      const canvas: HTMLCanvasElement = document.createElement('canvas');
      canvas.width = this.image.width || 0;
      canvas.height = this.image.height || 0;
      const svgParentNode: any = this.svg.parentNode;

      canvg(canvas, svgParentNode.innerHTML.trim());
      const data = atob(canvas.toDataURL(`image/${this.imageType}`)
        .substring(`data:image/${this.imageType};base64,`.length));
      const dataLength: number = data.length;
      const asArray = new Uint8Array(dataLength);
      let i: number = 0;

      for (i; i < dataLength; ++i) {
        asArray[i] = data.charCodeAt(i);
      }

      const buffer: any = asArray.buffer;

      return new Blob([buffer], {
        type: `image/${this.imageType}`
      });
    }

    /**
     * Save SVG.
     * @return {Blob}
     */
    saveSvg (): Blob {
      return new Blob(['<?xml version="1.0" standalone="no"?>\r\n', this.svg.outerHTML],
        {
          type: 'image/svg+xml;charset=utf-8'
        });
    }

    /**
     * image.height watcher.
     */
    @Watch('image.height')
    heightChanged () {
      this.setFileName();
    }

    /**
     * image.width watcher.
     */
    @Watch('image.width')
    widthChanged () {
      this.setFileName();
    }
  };
</script>