import { create } from 'zustand';

const STORAGE_KEYS = {
    AREA_KEY: 'areaKey',
    CHECKBOX_KEY: 'checkboxesKey',
    RADIO_KEY: 'radioKey',
    TECHNOLOGY_KEY: 'technologiesKey'
}

export const useFiltersStore = create((set, get) => ({
    city: '',
    setCity: (value) => {
        set({ city: value })
    },
    areas: sessionStorage.getItem(STORAGE_KEYS.AREA_KEY) ? JSON.parse(sessionStorage.getItem(STORAGE_KEYS.AREA_KEY)) : [],
    addArea: (id) => {
        set({ areas: [...get().areas, id] })
        sessionStorage.setItem(STORAGE_KEYS.AREA_KEY, JSON.stringify(get().areas))
    },
    removeArea: (id) => {
        set({ areas: get().areas.filter(areaId => areaId !== id) })
        sessionStorage.setItem(STORAGE_KEYS.AREA_KEY, JSON.stringify(get().areas))
    },

    checkboxes: sessionStorage.getItem(STORAGE_KEYS.CHECKBOX_KEY) ? JSON.parse(sessionStorage.getItem(STORAGE_KEYS.CHECKBOX_KEY)) : [],
    addCheckbox: (value) => {
        set({ checkboxes: [...get().checkboxes, value] })
        sessionStorage.setItem(STORAGE_KEYS.CHECKBOX_KEY, JSON.stringify(get().checkboxes))
    },
    removeCheckbox: (value) => {
        set({ checkboxes: get().checkboxes.filter(checkbox => checkbox !== value) })
        sessionStorage.setItem(STORAGE_KEYS.CHECKBOX_KEY, JSON.stringify(get().checkboxes))
    },

    radios: sessionStorage.getItem(STORAGE_KEYS.RADIO_KEY) ? JSON.parse(sessionStorage.getItem(STORAGE_KEYS.RADIO_KEY)) : ['period=period-false','salary=salary-false','experience=experience-false'],
    addRadio: (value) => {
        const [name] = value.split('=')
        set({
            radios:
                [...get().radios
                    .filter(el => el.split('=')[0] !== name), value]
        })
        sessionStorage.setItem(STORAGE_KEYS.RADIO_KEY, JSON.stringify(get().radios))
    },

    technologies: sessionStorage.getItem(STORAGE_KEYS.TECHNOLOGY_KEY) ? JSON.parse(sessionStorage.getItem(STORAGE_KEYS.TECHNOLOGY_KEY)) : [],
    addTechnology: (tag) => {
        set({technologies: [...get().technologies, tag]})
        sessionStorage.setItem(STORAGE_KEYS.TECHNOLOGY_KEY, JSON.stringify(get().technologies))
    },
    removeTechnology: (targetTag) => {
        set({technologies: get().technologies.filter(tag => tag !== targetTag)})
        sessionStorage.setItem(STORAGE_KEYS.TECHNOLOGY_KEY, JSON.stringify(get().technologies))
    },

    isHiddenVacancyFilterChecked: false,
    setHiddenVacancyFilterCheckedTrue: ()=>set({isHiddenVacancyFilterChecked: true}),
    setHiddenVacancyFilterCheckedFalse: ()=>set({isHiddenVacancyFilterChecked: false}),

    clearFilters: () => {
        set({
            city: '',
            areas: [],
            checkboxes: [],
            radios: ['period=period-false','salary=salary-false','experience=experience-false'],
            technologies:[],
            isHiddenVacancyFilterChecked: false
        })
        sessionStorage.clear()
    }
}))