import {ref, Ref} from "vue";
import {useFetch} from "./fetch.ts";

type UsableForm = Promise<{response: Ref<any | undefined>}>
export async function setForm(body: any): UsableForm {
    const loading: Ref<boolean> = ref<boolean>(false)
    const url = ''
    const {response: response, request} = useFetch<any>(url, {
        body: JSON.stringify(body)
    })

    if (!loading.value) {
        await request()
        loading.value = true
    }

    return {response}
}