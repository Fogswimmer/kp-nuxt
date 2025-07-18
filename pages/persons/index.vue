<template>
    <div>
        <Head>
            <Title>{{ definePageTitle($t('pages.persons.title')) }}</Title>
            <Meta
                name="description"
                :content="$t('page_descriptions.persons_list')"
            />
        </Head>

        <ListPage
            v-if="personsPresent && persons"
            :items="personItems || []"
            :loading="loading"
            :total-pages="totalPages"
            :page="currentPage"
            :limit="computedLimitProp"
            :list-title="$t('nav.persons')"
            new-page-link="/persons/new"
            @update:page="updateQueryParams"
            @update:search="search = $event"
        >
            <template #filters>
                <Filters
                    :sort-options="sortOptions"
                    @update:limit="limit = $event.value"
                    @update:order="order = $event.value"
                    @update:search="search = $event.value"
                    @update:sort="sortBy = $event.value"
                />
            </template>
        </ListPage>
        <PageLoader v-else />
    </div>
</template>

<script lang="ts" setup>
import ListPage from '~/components/Templates/ListPage.vue'
import Filters from '~/components/Misc/Filters.vue'
import definePageTitle from '~/utils/definePageTitle'
import PageLoader from '~/components/Misc/PageLoader.vue'

import { usePersonStore } from '~/stores/personStore'

const { locale, t } = useI18n()

const { loading, totalPages, currentPage, personsPresent, persons } =
    storeToRefs(usePersonStore())
const {
    fetchFilteredPersons,
    fetchGenders,
    fetchSpecialties,
    checkPersonsPresence,
} = usePersonStore()

const limit = ref<number | string>(5)
const offset = ref<number>(0)
const search = ref<string>('')
const sortBy = ref<string>('firstname')
const order = ref<string>('asc')
const specialtySort = ref<string>('all')

const sortOptions = [
    { value: 'firstname', title: t('filters.sort.persons.firstname') },
    { value: 'age', title: t('filters.sort.persons.age') },
]

const fetchData = async (): Promise<void> => {
    await checkPersonsPresence()
    if (personsPresent.value) {
        await Promise.allSettled([
            fetchFilteredPersons(
                limit.value,
                offset.value,
                search.value,
                sortBy.value,
                order.value,
                specialtySort.value,
                locale.value
            ),
            fetchGenders(locale.value),
            fetchSpecialties(locale.value),
        ])
    } else {
        navigateTo('/persons/empty')
    }
}

const personItems = computed((): Detail[] => {
    const getName = useInternationalName()
    return (
        persons.value &&
        persons.value?.map((person): Detail => {
            const personFullName = person.firstname + ' ' + person.lastname
            return {
                title: getName(personFullName, person.internationalName || ''),
                value: person?.specialtyNames.join(', '),
                avatar: person?.avatar || '',
                to: '/persons/' + person?.slug || '',
                createdAt: person?.createdAt || '',
                updatedAt: person?.updatedAt || '',
                publisherData: person?.publisherData || '',
                rating: null,
            }
        })
    )
})

const computedLimitProp = computed((): number => {
    return typeof limit.value === 'number' ? limit.value : 15
})

const updateQueryParams = (page: number): void => {
    if (limit.value !== 'all') {
        offset.value = (page - 1) * Number(limit.value)
    }
}

watch(
    [limit, offset, sortBy, order, specialtySort, locale],
    async ([
        newLimit,
        newOffset,
        newSortBy,
        newOrder,
        newSpecialtySort,
        newLocale,
    ]): Promise<void> => {
        await fetchFilteredPersons(
            newLimit,
            newOffset,
            '',
            newSortBy,
            newOrder,
            newSpecialtySort,
            newLocale
        )
    },
    {
        immediate: true,
    }
)

watch(
    search,
    debounce(async (newVal: string): Promise<void> => {
        await fetchFilteredPersons(
            limit.value,
            0,
            newVal,
            sortBy.value,
            order.value,
            specialtySort.value,
            locale.value
        )
    }, 1000)
)

onMounted(async (): Promise<void> => {
    await fetchData()
})

definePageMeta({
    name: 'persons',
    path: '/persons',
    layout: 'list',
})
</script>

<style></style>
