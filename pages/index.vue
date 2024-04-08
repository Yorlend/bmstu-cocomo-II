<template>
  <Tabs default-value="comp" class="flex flex-col justify-center">
    <TabsList>
      <TabsTrigger value="comp">Модель композиции</TabsTrigger>
      <TabsTrigger value="cocomo">Модель ранней архитектуры</TabsTrigger>
    </TabsList>
    <TabsContent value="comp">
      <div class="flex flex-col container">
        <Card>
          <CardHeader>
            <CardTitle>Модель композиции приложения</CardTitle>
          </CardHeader>
          <CardContent>
            <div class="flex flex-row items-center justify-between mb-5">
              <span>Количество объектных точек</span>
              <Input class="w-[200px] ml-5" v-model="cocomo.baseObj"></Input>
            </div>

            <div class="flex flex-row items-center justify-between mb-5">
              <span>Процент повторного использования</span>
              <Input class="w-[200px] ml-5" v-model="cocomo.reuse"></Input>
            </div>

            <div class="flex flex-row items-center justify-between mb-5">
              <span>Оценка скорости разработки</span>
              <Select v-model="cocomo.prod">
                <SelectTrigger class="w-[200px] ml-5">
                  <SelectValue placeholder="Выберите значение"></SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="4">очень низкая</SelectItem>
                    <SelectItem value="7">низкая</SelectItem>
                    <SelectItem value="13">номинальная</SelectItem>
                    <SelectItem value="25">высокая</SelectItem>
                    <SelectItem value="50">очень высокая</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div class="flex flex-row items-center justify-between mb-5">
              <span>Зарплата разработчика, р.</span>
              <Input class="w-[200px] ml-5" v-model="cocomo.wage"></Input>
            </div>

            <div class="flex flex-col items-center">
              Число новых объектных точек: {{ cocomo.nop }}
              <br>
              Оценка трудозатрат: {{ Math.round(cocomo.labor * 100) / 100 }} человеко-месяцев
              <br>
              Оценка времени: {{ Math.round(cocomo.time * 100) / 100 }} мес.
              <br>
              Команда: {{ team() }} человек
              <br>
              Бюджет проекта: {{ Math.round(budget() * 100) / 100 }} тыс. р.
            </div>
          </CardContent>
        </Card>
      </div>
    </TabsContent>
  </Tabs>
</template>

<script lang="ts" setup>

const cocomo = useMyCocomoStore()

const team = () => Math.ceil(cocomo.labor / cocomo.time)
const budget = () => team() * +cocomo.wage * cocomo.time / 1000

</script>
