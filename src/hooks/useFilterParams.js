import { useFiltersStore } from "@store/useFiltersStore"

export const useFilterParams = () => {
    const { areas, checkboxes, radios, technologies } = useFiltersStore()
    const ampersand = (areas.length > 0 && checkboxes.length > 0) ? '&' : ''

    const areasParams = areas.map(el => `area=${el}`).join('&')
    const checkboxesParams = checkboxes.join('&').replace('label=hidden', '')

    const radiosParams = radios.join('&')
        .replace('experience=experience-false', '')
        .replace('salary=salary-false', '')
        .replace('period=period-false', '')

    const technologiesParams = technologies.join('+')

    return `text=frontend+${technologiesParams}&` + areasParams + ampersand + checkboxesParams + '&' + radiosParams
}