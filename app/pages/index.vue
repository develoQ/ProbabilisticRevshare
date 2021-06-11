<template>
  <v-row justify="center" align="center" class="mt-12">
    <v-col cols="12" sm="10" md="8">
      <v-container fluid>
        <v-row>
          <h2>Revshare</h2>
        </v-row>
        <v-row>
          <v-simple-table class="my-5">
            <template v-slot:default>
              <thead>
                <th class="text-center" width="25%">Name</th>
                <th class="text-center" width="50%">Pointer</th>
                <th class="text-center" width="10%">Weight</th>
                <th class="text-center" width="10%">Percent</th>
                <th class="text-center" width="5%"></th>
              </thead>
              <tbody>
                <tr v-for="(pointer, index) in pointers" :key="index">
                  <td>
                    <v-text-field v-model="pointer.name" />
                  </td>
                  <td>
                    <v-text-field v-model="pointer.pointer" :rules="pointerRules(pointer.pointer)" />
                  </td>
                  <td>
                    <v-text-field v-model="pointer.weight" />
                  </td>
                  <td>
                    <v-text-field suffix="%" :value="getPercentage(index)" />
                  </td>
                  <td>
                    <v-icon @click="deleteShare(index)"> mdi-trash-can-outline </v-icon>
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-row>
        <v-row class="my-2">
          <v-btn color="dark" outlined class="mx-1" @click="addShare()"> Add Share </v-btn>
          <!-- <v-btn color="dark" outlined class="mx-1">Import</v-btn> -->
        </v-row>
        <v-row class="my-2 mt-12">
          <h2>Payment Pointer</h2>
        </v-row>
        <v-row>
          <v-text-field :value="getPaymentPointer" solo hide-details="" readonly class="mb-2">
            <template v-slot:append>
              <v-icon @click="copy(getPaymentPointer)"> mdi-content-copy</v-icon>
            </template>
          </v-text-field>
        </v-row>
        <v-row>
          <v-radio-group v-model="selectedBasePointerIdx" class="mt-0">
            <v-radio
              v-for="(basePointer, index) in baseRevSharePointerList"
              :key="index"
              :label="basePointer.name"
              :value="index"
            />
          </v-radio-group>
        </v-row>
      </v-container>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { Pointer } from '@/types'
import { sharesToPaymentPointer, validatePointer } from '@/lib'

@Component({})
export default class extends Vue {
  defaultPointer: Pointer = {
    name: '',
    pointer: '',
    weight: 1,
  }

  pointers: Pointer[] = [this.defaultPointer]
  get pointerRules() {
    return (pointer: string) => {
      return [validatePointer(pointer) || 'Invalid payment pointer.']
    }
  }

  selectedBasePointerIdx = 0
  baseRevSharePointerList = [
    {
      name: 'webmonetization.org',
      base: '$webmonetization.org/api/revshare/pay/',
    },
    {
      name: this.$config.domain,
      base: `$${this.$config.domain}/pay/`,
    },
  ]

  addShare() {
    this.pointers.push(this.defaultPointer)
  }

  deleteShare(index: number) {
    this.pointers.splice(index, 1)
  }

  getPercentage(index: number) {
    const sumWeight = this.pointers.reduce((sum, i) => sum + i.weight, 0)
    return Math.floor((this.pointers[index].weight / sumWeight) * 100)
  }

  get getPaymentPointer() {
    for (const pointer of this.pointers) {
      if (!validatePointer(pointer.pointer)) {
        return ''
      }
    }
    return sharesToPaymentPointer(this.pointers, this.baseRevSharePointerList[this.selectedBasePointerIdx].base)
  }

  async copy(paymentPointer: string) {
    try {
      await (this as any).$copyText(paymentPointer)
    } catch (error) {
      console.error(error)
    }
  }
}
</script>
