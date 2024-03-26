<template>
    <div class="flex min-h-screen flex-col justify-center pb-24 sm:px-6 lg:px-8 bg-gray-100">
      <div class="sm:mx-auto sm:w-full sm:max-w-md">
        <img src="assets/logoRU.png" class="mx-auto w-auto h-24" alt="Logo" />
      </div>
      <!-- Auth Form -->
      <AuthForm />
    </div>
  </template>
  
<script setup>
    definePageMeta({
        layout: false,
    });

    // const { login } = useStrapiAuth()

    // const onSubmit = async () => {

    //     try {
    //       await login({ identifier: 'test121332213133113', password: '1qaz2wsX#'})

    //     } catch (e) {}
    // }

    // onSubmit()

    // const testHeader = { 
    //   authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNzA1OTE0MjE4LCJleHAiOjE3MDg1MDYyMTh9.C0WhI7I7EVhDFGCuA5SNeMPvBY7Pp5ezwlo2upF7VQs"
    // }

    // async function test(){

    //   const test = await fetch ('http://localhost:1337/api/users', {
    //     testHeader
    //   })
    // }

    // test()
</script>