<script setup lang="ts">

import TrashIcon from '@/assets/icons/trashbin.svg'
import {Button} from "~/components/ui/button";

const props = defineProps({
  lang: String,
  code: Number,
})

const cocomo = useMyCocomoStore()

const onDelete = () => {
  cocomo.languages = cocomo.languages.filter(item => item.lang != props.lang)
}

</script>

<template>
  <div class="flex flex-row justify-between items-center">
    <div class="flex flex-row justify-between">
      <span class="mr-5 underline w-[100px]">{{ lang }}</span>
      <span>{{ code }}%</span>
    </div>
    <div>
      <Button class="ml-8" @click="onDelete">
        Удалить
      </Button>
    </div>
  </div>
</template>
