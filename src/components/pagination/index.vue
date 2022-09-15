<template>
  <div class="pdd_pagination">
    <el-pagination
      layout="total, sizes, prev, pager, next"
      :page-sizes="[10, 20, 50]"
      :total="pageOption.total"
      :page-size="pageOption.recordsPerPage"
      @size-change="handlePageSizechange"
      @current-change="handlePageCurrentchange"
      @prev-click="handlePageUpchange"
      @next-click="handlePageDownchange"
    />
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'

type TOption = {
  server: (param: TAnyObject) => TAny
  params?: TAnyObject
}

interface IPropList {
  options: TOption
  isLoading: boolean
  orderType: number
}

export default defineComponent({
  name: 'paginationComponent',
  props: {
    options: {
      default: () => ({
        server: () => false,
        params: {} as TAnyObject
      })
    },
    isLoading: { default: false },
    orderType: { default: 0 }
  },
  emits: ['update:loading', 'getData'],
  setup(props: IPropList, { emit }) {
    const data = reactive({
      pageOption: { pageNo: 1, recordsPerPage: 20, total: 0 }
    })
    // 获取数据
    const getList = async () => {
      emit('update:loading', true)
      try {
        const param = {
          ...props.options.params,
          pageNo: data.pageOption.pageNo,
          recordsPerPage: data.pageOption.recordsPerPage
        } as TAnyObject
        if (props.orderType !== 0) param.orderType = props.orderType
        const res = await props.options.server(param)
        data.pageOption.total = res.data.total || 0
        emit('getData', res.data || {})
        emit('update:loading', false)
      } catch (error) {
        console.log(error)
        emit('update:loading', false)
      }
    }
    // 页量修改
    const handlePageSizechange = (e: number) => {
      console.log(e)
      data.pageOption.recordsPerPage = e
      data.pageOption.pageNo = 1
      getList()
    }
    // 页数修改
    const handlePageCurrentchange = (e: number) => {
      console.log(e)
      data.pageOption.pageNo = e
      getList()
    }
    // 上一页
    const handlePageUpchange = (e: number) => {
      console.log(e)
      data.pageOption.pageNo = e
      getList()
    }
    // 下一页
    const handlePageDownchange = (e: number) => {
      console.log(e)
      data.pageOption.pageNo = e
      getList()
    }
    // 更新
    const update = () => {
      getList()
    }
    return {
      ...toRefs(data),
      handlePageSizechange,
      handlePageCurrentchange,
      handlePageUpchange,
      handlePageDownchange,
      update
    }
  }
})
</script>
<style lang="scss" scoped>
.pdd_pagination {
  padding-top: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  &:deep(.el-input) {
    width: 100px !important;
  }
}
</style>
