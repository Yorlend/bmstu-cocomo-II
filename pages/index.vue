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
            <div class="flex flex-col lg:flex-row items-center justify-between mb-5">
              <span>Количество объектных точек</span>
              <Input class="w-[200px] ml-5" v-model="cocomo.baseObj"></Input>
            </div>

            <div class="flex flex-col lg:flex-row items-center justify-between mb-5">
              <span class="ml-10 md:ml-0">Процент повторного использования</span>
              <Input class="w-[200px] ml-5" v-model="cocomo.reuse"></Input>
            </div>

            <div class="flex flex-col lg:flex-row items-center justify-between mb-5">
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
            <div class="flex flex-col lg:flex-row items-center justify-between mb-5">
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
    <TabsContent value="cocomo">
      <div class="flex flex-col lg:flex-row container">
        <div class="flex flex-col">
          <Card>
            <CardHeader>
              <CardTitle>Параметры для метода функциональных точек</CardTitle>
            </CardHeader>
            <CardContent>
              <div class="flex flex-col lg:flex-row items-center justify-between">
                <span>Внешние вводы (EI)</span>
                <div class="flex flex-row ml-5">
                  <div class="flex flex-col items-center ml-2">
                    <span>легкий</span>
                    <Input class="w-[60px]" v-model="cocomo.ei.easy"></Input>
                  </div>
                  <div class="flex flex-col items-center ml-2">
                    <span>средний</span>
                    <Input class="w-[60px]" v-model="cocomo.ei.mid"></Input>
                  </div>
                  <div class="flex flex-col items-center ml-2">
                    <span>сложный</span>
                    <Input class="w-[60px]" v-model="cocomo.ei.high"></Input>
                  </div>
                </div>
              </div>
              <div class="flex flex-col lg:flex-row items-center justify-between">
                <span>Внешние выводы (EO)</span>
                <div class="flex flex-row ml-5 mt-2">
                  <Input class="w-[60px] ml-2" v-model="cocomo.eo.easy"></Input>
                  <Input class="w-[60px] ml-2" v-model="cocomo.eo.mid"></Input>
                  <Input class="w-[60px] ml-2" v-model="cocomo.eo.high"></Input>
                </div>
              </div>
              <div class="flex flex-col lg:flex-row items-center justify-between">
                <span>Внешние запросы (EQ)</span>
                <div class="flex flex-row ml-5 mt-2">
                  <Input class="w-[60px] ml-2" v-model="cocomo.eq.easy"></Input>
                  <Input class="w-[60px] ml-2" v-model="cocomo.eq.mid"></Input>
                  <Input class="w-[60px] ml-2" v-model="cocomo.eq.high"></Input>
                </div>
              </div>
              <div class="flex flex-col lg:flex-row items-center justify-between">
                <span>Внутр. логич. файлы (ILF)</span>
                <div class="flex flex-row ml-5 mt-2">
                  <Input class="w-[60px] ml-2" v-model="cocomo.ilf.easy"></Input>
                  <Input class="w-[60px] ml-2" v-model="cocomo.ilf.mid"></Input>
                  <Input class="w-[60px] ml-2" v-model="cocomo.ilf.high"></Input>
                </div>
              </div>
              <div class="flex flex-col lg:flex-row items-center justify-between">
                <span>Внешн. интерф. файлы (EIF)</span>
                <div class="flex flex-row ml-5 mt-2">
                  <Input class="w-[60px] ml-2" v-model="cocomo.eif.easy"></Input>
                  <Input class="w-[60px] ml-2" v-model="cocomo.eif.mid"></Input>
                  <Input class="w-[60px] ml-2" v-model="cocomo.eif.high"></Input>
                </div>
              </div>
              <div class="flex flex-col lg:flex-row items-center justify-between">
                <span class="w-[200px]">Надежность и уровень сложности системы (RCPX)</span>
                <Select v-model="cocomo.rcpx">
                  <SelectTrigger class="w-[196px] ml-5 mt-2">
                    <SelectValue placeholder="выберите значение" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="0.49">сверхнизкий</SelectItem>
                      <SelectItem value="0.60">очень низкий</SelectItem>
                      <SelectItem value="0.83">низкий</SelectItem>
                      <SelectItem value="1.0">номинальный</SelectItem>
                      <SelectItem value="1.33">высокий</SelectItem>
                      <SelectItem value="1.91">очень высокий</SelectItem>
                      <SelectItem value="2.72">сверхвысокий</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div class="flex flex-col lg:flex-row items-center justify-between">
                <span class="w-[200px]">Повторное использование компонентов (RUSE)</span>
                <Select v-model="cocomo.ruse">
                  <SelectTrigger class="w-[196px] ml-5 mt-2">
                    <SelectValue placeholder="выберите значение" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="0.95">низкий</SelectItem>
                      <SelectItem value="1.0">номинальный</SelectItem>
                      <SelectItem value="1.07">высокий</SelectItem>
                      <SelectItem value="1.15">очень высокий</SelectItem>
                      <SelectItem value="1.24">сверхвысокий</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div class="flex flex-col lg:flex-row items-center justify-between">
                <span class="w-[200px]">Возможности персонала (PERS)</span>
                <Select v-model="cocomo.pers">
                  <SelectTrigger class="w-[196px] ml-5 mt-2">
                    <SelectValue placeholder="выберите значение" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="2.12">сверхнизкий</SelectItem>
                      <SelectItem value="1.62">очень низкий</SelectItem>
                      <SelectItem value="1.26">низкий</SelectItem>
                      <SelectItem value="1.0">номинальный</SelectItem>
                      <SelectItem value="0.83">высокий</SelectItem>
                      <SelectItem value="0.63">очень высокий</SelectItem>
                      <SelectItem value="0.5">сверхвысокий</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div class="flex flex-col lg:flex-row items-center justify-between">
                <span class="w-[200px]">Сложность платформы (PDIF)</span>
                <Select v-model="cocomo.pdif">
                  <SelectTrigger class="w-[196px] ml-5 mt-2">
                    <SelectValue placeholder="выберите значение" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="0.95">низкий</SelectItem>
                      <SelectItem value="1.0">номинальный</SelectItem>
                      <SelectItem value="1.29">высокий</SelectItem>
                      <SelectItem value="1.81">очень высокий</SelectItem>
                      <SelectItem value="2.61">сверхвысокий</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div class="flex flex-col lg:flex-row items-center justify-between">
                <span class="w-[200px]">Опыт работы в разработке систем подобного типа (PREX)</span>
                <Select v-model="cocomo.prex">
                  <SelectTrigger class="w-[196px] ml-5 mt-2">
                    <SelectValue placeholder="выберите значение" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="1.59">сверхнизкий</SelectItem>
                      <SelectItem value="1.33">очень низкий</SelectItem>
                      <SelectItem value="1.22">низкий</SelectItem>
                      <SelectItem value="1.0">номинальный</SelectItem>
                      <SelectItem value="0.87">высокий</SelectItem>
                      <SelectItem value="0.73">очень высокий</SelectItem>
                      <SelectItem value="0.62">сверхвысокий</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div class="flex flex-col lg:flex-row items-center justify-between">
                <span class="w-[200px]">Использование инструментальных средств поддержки (FCIL)</span>
                <Select v-model="cocomo.fcil">
                  <SelectTrigger class="w-[196px] ml-5 mt-2">
                    <SelectValue placeholder="выберите значение" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="1.43">сверхнизкий</SelectItem>
                      <SelectItem value="1.30">очень низкий</SelectItem>
                      <SelectItem value="1.10">низкий</SelectItem>
                      <SelectItem value="1.0">номинальный</SelectItem>
                      <SelectItem value="0.87">высокий</SelectItem>
                      <SelectItem value="0.73">очень высокий</SelectItem>
                      <SelectItem value="0.62">сверхвысокий</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div class="flex flex-col lg:flex-row items-center justify-between">
                <span class="w-[200px]">Требуемые сроки разработки (SCED)</span>
                <Select v-model="cocomo.sced">
                  <SelectTrigger class="w-[196px] ml-5 mt-2">
                    <SelectValue placeholder="выберите значение" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="1.43">очень низкий</SelectItem>
                      <SelectItem value="1.14">низкий</SelectItem>
                      <SelectItem value="1.0">номинальный</SelectItem>
                      <!--                      <SelectItem value="1.0">высокий</SelectItem>-->
                      <!--                      <SelectItem value="1.0">очень высокий</SelectItem>-->
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </div>
        <div class="flex flex-col">
          <Card class="lg:ml-5 mt-2 lg:mt-0">
            <CardHeader>
              <CardTitle>Параметры продукта</CardTitle>
            </CardHeader>
            <CardContent>
              <div class="flex flex-row items-center justify-between">
                <span class="w-[200px]">Передача данных</span>
                <Input class="ml-5 mt-2 w-[60px]" v-model="cocomo.dataTrans" />
              </div>
              <div class="flex flex-row items-center justify-between">
                <span class="w-[200px]">Распределенная разработка</span>
                <Input class="ml-5 mt-2 w-[60px]" v-model="cocomo.distribDev" />
              </div>
              <div class="flex flex-row items-center justify-between">
                <span class="w-[200px]">Производительность</span>
                <Input class="ml-5 mt-2 w-[60px]" v-model="cocomo.performance" />
              </div>
              <div class="flex flex-row items-center justify-between">
                <span class="w-[200px]">Эксплуатационные ограничения</span>
                <Input class="ml-5 mt-2 w-[60px]" v-model="cocomo.opReq" />
              </div>
              <div class="flex flex-row items-center justify-between">
                <span class="w-[200px]">Оперативный ввод данных</span>
                <Input class="ml-5 mt-2 w-[60px]" v-model="cocomo.opIO" />
              </div>
              <div class="flex flex-row items-center justify-between">
                <span class="w-[200px]">Частота транзакций</span>
                <Input class="ml-5 mt-2 w-[60px]" v-model="cocomo.transFreq" />
              </div>
              <div class="flex flex-row items-center justify-between">
                <span class="w-[200px]">Эффективность работы конечных пользователей</span>
                <Input class="ml-5 mt-2 w-[60px]" v-model="cocomo.endUserEfficiency" />
              </div>
              <div class="flex flex-row items-center justify-between">
                <span class="w-[200px]">Оперативное обновление</span>
                <Input class="ml-5 mt-2 w-[60px]" v-model="cocomo.opUpdate" />
              </div>
              <div class="flex flex-row items-center justify-between">
                <span class="w-[200px]">Сложность обработки</span>
                <Input class="ml-5 mt-2 w-[60px]" v-model="cocomo.procDif" />
              </div>
              <div class="flex flex-row items-center justify-between">
                <span class="w-[200px]">Повторная используемость</span>
                <Input class="ml-5 mt-2 w-[60px]" v-model="cocomo.reusability" />
              </div>
              <div class="flex flex-row items-center justify-between">
                <span class="w-[200px]">Легкость инсталяции</span>
                <Input class="ml-5 mt-2 w-[60px]" v-model="cocomo.instEase" />
              </div>
              <div class="flex flex-row items-center justify-between">
                <span class="w-[200px]">Легкость эксплуатации</span>
                <Input class="ml-5 mt-2 w-[60px]" v-model="cocomo.useEase" />
              </div>
              <div class="flex flex-row items-center justify-between">
                <span class="w-[200px]">Количество возможных установок на различных платформах</span>
                <Input class="ml-5 mt-2 w-[60px]" v-model="cocomo.crossPlat" />
              </div>
              <div class="flex flex-row items-center justify-between">
                <span class="w-[200px]">Простота изменений (гибкость)</span>
                <Input class="ml-5 mt-2 w-[60px]" v-model="cocomo.easeEdit" />
              </div>
            </CardContent>
          </Card>
        </div>
        <div class="flex flex-col">
          <Card class="lg:ml-5 mt-2 lg:mt-0">
            <CardHeader>
              <CardTitle>Языки программирования</CardTitle>
            </CardHeader>
            <CardContent>
              <div class="flex flex-col items-center">
                <div class="flex flex-col justify-between">
                  <Language v-for="item in cocomo.languages" :code="item.code" :lang="item.lang" :key="item.lang"
                    class="mb-2" />
                </div>
                <Dialog>
                  <DialogTrigger as-child class="mt-2">
                    <Button variant="outline">
                      Добавить язык
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Добавление языка</DialogTitle>
                      <DialogDescription>Введите название языка и процент использования</DialogDescription>
                    </DialogHeader>
                    <div class="grid gap-4 py-4">
                      <div class="grid grid-cols-4 items-center gap-4">
                        <Label for="lang" class="text-right">Язык</Label>
                        <Input id="lang" class="col-span-3" v-model="lang" />
                      </div>
                      <div class="grid grid-cols-4 items-center gap-4">
                        <Label for="code" class="text-right">Процент</Label>
                        <Input id="code" class="col-span-3" v-model="code" />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="submit" @click="onAddLanguage">
                        Добавить
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>
          <Card class="lg:ml-5 mt-2">
            <CardHeader>
              <CardTitle>Факторы масштаба</CardTitle>
            </CardHeader>
            <CardContent>
              <div class="flex flex-col lg:flex-row items-center justify-between">
                <span class="w-[150px] mr-10">Прецедентность (PREC)</span>
                <Select v-model="cocomo.prec">
                  <SelectTrigger class="w-[200px]">
                    <SelectValue placeholder="выбор значения" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="6.2">очень низкий</SelectItem>
                      <SelectItem value="4.96">низкий</SelectItem>
                      <SelectItem value="3.72">номинальный</SelectItem>
                      <SelectItem value="2.48">высокий</SelectItem>
                      <SelectItem value="1.24">очень высокий</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div class="flex flex-col lg:flex-row items-center justify-between">
                <span class="w-[150px] mr-10">Гибкость (FLEX)</span>
                <Select v-model="cocomo.flex">
                  <SelectTrigger class="w-[200px]">
                    <SelectValue placeholder="выбор значения" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="5.07">очень низкий</SelectItem>
                      <SelectItem value="4.05">низкий</SelectItem>
                      <SelectItem value="3.04">номинальный</SelectItem>
                      <SelectItem value="2.03">высокий</SelectItem>
                      <SelectItem value="1.01">очень высокий</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div class="flex flex-col lg:flex-row items-center justify-between">
                <span class="w-[150px] mr-10">Архитектура и разрешение рисков (RESL)</span>
                <Select v-model="cocomo.resl">
                  <SelectTrigger class="w-[200px]">
                    <SelectValue placeholder="выбор значения" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="7.07">очень низкий</SelectItem>
                      <SelectItem value="5.65">низкий</SelectItem>
                      <SelectItem value="4.24">номинальный</SelectItem>
                      <SelectItem value="2.83">высокий</SelectItem>
                      <SelectItem value="1.41">очень высокий</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div class="flex flex-col lg:flex-row items-center justify-between">
                <span class="w-[150px] mr-10">Сработанность команды (TEAM)</span>
                <Select v-model="cocomo.team">
                  <SelectTrigger class="w-[200px]">
                    <SelectValue placeholder="выбор значения" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="5.48">очень низкий</SelectItem>
                      <SelectItem value="4.38">низкий</SelectItem>
                      <SelectItem value="3.29">номинальный</SelectItem>
                      <SelectItem value="2.19">высокий</SelectItem>
                      <SelectItem value="1.10">очень высокий</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div class="flex flex-col lg:flex-row items-center justify-between">
                <span class="w-[150px] mr-10">Зрелость процессов (PMAT)</span>
                <Select v-model="cocomo.pmat">
                  <SelectTrigger class="w-[200px]">
                    <SelectValue placeholder="выбор значения" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="7.80">очень низкий</SelectItem>
                      <SelectItem value="6.24">низкий</SelectItem>
                      <SelectItem value="4.68">номинальный</SelectItem>
                      <SelectItem value="3.12">высокий</SelectItem>
                      <SelectItem value="1.56">очень высокий</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div class="flex flex-col lg:flex-row items-center justify-between">
                <span class="w-[150px] mr-10">Зарплата разработчика, р.</span>
                <Input v-model="cocomo.wage" class="w-[200px]" />
              </div>
            </CardContent>
          </Card>
          <Card class="lg:ml-5 mt-2">
            <CardHeader>
              <CardTitle>Результаты</CardTitle>
            </CardHeader>
            <CardContent>
              <div class="flex flex-col items-center justify-between">
                <span>Количество функциональных точек: {{ funcPoints() }}</span>
                <span class="mt-2">Показатель степени p: {{ calcP() }}</span>
                <span class="mt-2">Размер кода: {{ KLoC() }} KLoC</span>
                <span class="mt-2">Трудозатраты: {{ Math.round(labor() * 100) / 100 }} человеко-месяцев</span>
                <span class="mt-2">Время: {{ Math.round(time() * 100) / 100 }} мес.</span>
                <span class="mt-2">Команда: {{ earlyTeam() }} чел.</span>
                <span class="mt-2">Бюджет: {{ Math.round(earlyBudget() * 100) / 100 }} тыс. р.</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </TabsContent>
  </Tabs>
</template>

<script lang="ts" setup>

import { Button } from "~/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "~/components/ui/dialog";
import { Label } from "~/components/ui/label";

const lang = ref<string>("")
const code = ref<string>("")

const cocomo = useMyCocomoStore()

const team = () => Math.ceil(cocomo.labor / cocomo.time)
const budget = () => team() * +cocomo.wage * cocomo.time / 1000

const onAddLanguage = () => {
  if (lang.value.trim().length > 0 && !isNaN(+code.value) && +code.value != 0 && lang.value in cocomo.fpToKLoC) {
    cocomo.languages.push({
      lang: lang.value,
      code: +code.value,
    })

    lang.value = ""
    code.value = ""
  }
}

const funcPoints = () => {
  const sumIO = (+cocomo.ei.easy * 3 + +cocomo.eo.easy * 4 + +cocomo.eq.easy * 3 + +cocomo.ilf.easy * 7 + +cocomo.eif.easy * 5)
    + (+cocomo.ei.mid * 4 + +cocomo.eo.mid * 5 + +cocomo.eq.mid * 4 + +cocomo.ilf.mid * 10 + +cocomo.eif.mid * 7)
    + (+cocomo.ei.high * 6 + +cocomo.eo.high * 7 + +cocomo.eq.high * 6 + +cocomo.ilf.high * 15 + +cocomo.eif.high * 10)

  return sumIO * (0.65 + 0.01 * cocomo.params)
}

const KLoC = () => {
  let res = 0
  cocomo.languages.forEach(lang => {
    res += funcPoints() * lang.code / 100 * cocomo.fpToKLoC[lang.lang]
  })
  return Math.round(res / 10) / 100
}

const calcP = () => {
  return (+cocomo.prec + +cocomo.flex + +cocomo.resl + +cocomo.team + +cocomo.pmat) / 100 + 1.01
}

const labor = () => {
  return 2.45 * cocomo.earch * Math.pow(KLoC(), calcP())
}

const time = () => {
  return 3.0 * Math.pow(labor(), 0.33 + 0.2 * (calcP() - 1.01))
}

const earlyTeam = () => {
  return Math.ceil(labor() / time())
}

const earlyBudget = () => {
  return earlyTeam() * +cocomo.wage * time() / 1000
}

</script>
