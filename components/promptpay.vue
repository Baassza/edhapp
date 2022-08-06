<template>
    <canvas ref="canvas"></canvas>
</template>

<script>
import promptpay from 'promptpay-js'
import qrcode from 'qrcode'
export default {
    name: "PromptPay",
    mounted() {
        qrcode.toCanvas(this.$refs.canvas, this.promptPayValue,{ width: 300 }, function (error) { if (error) console.error(error) })
    },
    props: {
        isCardId: {
            type: Boolean,
            default: true,
        },
        number: {
            type: String,
            default: "",
        },
        price: {
            type: Number,
            default: 0,
        },
    },
    methods: {
        getPromptPayValue() {
            const body = {
                method: 'QR_STATIC',
                application: 'PROMPTPAY_CREDIT_TRANSFER',
                currencyCode: '764',
                countryCode: 'TH',
                amount: `${this.price}`,
            }
            if (this.isCardId) {
                body.nationalID = this.number
            } else {
                body.mobileNumber = `0066${this.number.substring(1)}`
            }
            return promptpay.generate(body)
        }
    },
    computed: {
        promptPayValue() {
            return this.getPromptPayValue();
        },
    },
}
</script>

<style>
</style>