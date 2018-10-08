<template>
  <el-aside class="el-aside" width="auto">
    <h2>{{ $t('text.settings') }}</h2>
    <el-form
      label-width="90px"
      label-position="left"
    >
      <el-form-item
        label="Width"
        size="80"
      >
        <el-input-number
          name="width"
          v-model="image.width"
          :min="1"
          :max="10000"
        >
        </el-input-number>
      </el-form-item>
      <el-form-item label="Height">
        <el-input-number
          name="height"
          v-model="image.height"
          :min="1"
          :max="10000"
        >
        </el-input-number>
      </el-form-item>
      <div>
        <el-form-item
          class="color-picker"
          label="Background"
        >
          <el-color-picker
            name="background"
            v-model="image.backgroundColor"
            show-alpha
          >
          </el-color-picker>
        </el-form-item>
        <el-form-item
          class="color-picker color-picker__font"
          label="Font color"
        >
          <el-color-picker
            name="fontColor"
            v-model="image.fontColor"
          >
          </el-color-picker>
        </el-form-item>
      </div>
      <slot name="bottom"></slot>
    </el-form>
  </el-aside>
</template>

<script lang="ts">
  import { Vue, Component, Watch, Emit } from 'vue-property-decorator';
  import Image from './../interfaces/Image';

  @Component
  export default class Sidebar extends Vue {
    /**
     * Reactive image.
     */
    image: Image = {
      height: 200,
      width: 200,
      backgroundColor: 'rgba(19, 206, 102, 0.8)',
      fontColor: 'rgba(19, 100, 102, 0.8)'
    };

    /**
     * Mounted hook.
     */
    mounted () {
      this.$emit('input', this.image);
    }

    /**
     * Emit input when image is changed.
     */
    @Emit('input')
    imageChanged (): Image {
      return this.image;
    }

    /**
     * Image watcher.
     */
    @Watch('image', { deep: true })
    emitImage () { this.imageChanged(); };
  }
</script>