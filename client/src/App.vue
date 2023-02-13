<template>
    <header>
        <RouterLink :to="{ name: 'home' }">Home</RouterLink>
        <RouterLink :to="{ name: 'other' }">Other</RouterLink>
    </header>
    <main>
        <router-view />
    </main>
</template>

<script setup></script>

<style scoped></style>
