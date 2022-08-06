<template>
    <div>
        <Navbar />
        <div class="d-flex  align-items-center mainQR">
            <PromptPay :isCardId="true" :number="'1104300203536'" :price="0.50" />
            <br />
            <div class="detailBox">
                <div class="detail">ชื่อผู้รับเงิน : นาย ธนบรรณ นกยอด</div>
                <div class="detail">{{ course.name }}</div>
                <div class="detail">สอนโดย {{ course.mentorName }}</div>
                <div class="detail">จำนวนเงินที่ต้องชำระ</div>
                <div class="detail price">{{ course.price }}.-</div>
                <br/>
                <button class="pay-btn">แนบรูปภาพหลักฐานการโอนเงิน</button>
            </div>
        </div>
        <Foot />
    </div>
</template>

<script>
import "~/plugins/firebase.js";
import Navbar from "@/components/nav.vue";
import Foot from "@/components/foot.vue";
import PromptPay from "@/components/promptpay.vue";
export default {
    name: "AdminIndexPage",
    components: {
        Navbar,
        Foot,
        PromptPay
    },
    data() {
        return {
            isUser: false,
            course: {
                id: "01",
                name: "xxx",
                price: "xxxxx",
                mentorName: "xxx",
                description: "xx",
                image: "xxxx",
                category: "xxx",
                status: "xxxx",
                created_at: "xxxx",
                updated_at: "xxxxxx",
            }
        };
    },
    
}
</script>

<style>
.detail {
    font-size: 1.5rem;
    margin-left: 2rem;
}

.price {
    font-size: 2rem;
    color: #C73F3F;
}

.mainQR {
    flex-direction: column;
    margin-top: 5%;
    min-height: 72.1vh;
}

.detailBox {
    display: flex;
    flex-direction: column;
}

.pay-btn {
    width: 100%;
    border: 0;
    background-color: black;
    color: white;
    border-radius: 10px;
    height: 35px;
    font-size: 1.2rem;
}

@media (max-width: 905.98px) {
    .mainQR {
        margin-top: 5%;
        min-height: 75vh;
    }
}

@media (max-width: 486.98px) {
    .mainQR {
        margin-top: 5%;
        min-height: 77vh;
    }
}
</style>