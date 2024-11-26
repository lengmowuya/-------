import { reactive , computed,ref } from 'vue'
import { defineStore } from 'pinia'
import axios from '@/net/net'; // 导入 Axios 实例


export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value++
  }
  // let playerList  = ref([]);

    // 获取公告列表
  let noticeList = ref([])
  async function  getData(){
    const response = await axios.get('/api/notices');
    noticeList.value= response.data.data;
    noticeList.value.forEach((item,i)=>{
      let newItem = item.attributes
      noticeList.value[i] = newItem;
    })

    // 正确使用 reactive 更新数组
    // noticeList.splice(0, noticeList.length, ...response.data.data.map(item => item.attributes));
    // console.log(noticeList);
    // console.log(noticeList.value);
  }
  getData();
  var notice = ref({});

  // 定义一个响应式变量来控制子组件的显示状态
  const showComponent = ref(false);

  // 定义一个函数来切换子组件的显示状态
  function toggleComponent(newNotice) {
    notice.value = newNotice;
    showComponent.value = !showComponent.value;
  }
  return { count, doubleCount, increment,noticeList,showComponent,toggleComponent,notice}
})
