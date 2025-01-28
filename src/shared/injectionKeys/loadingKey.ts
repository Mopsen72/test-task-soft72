import type {InjectionKey, Ref} from "vue";

export const loadingKey = Symbol() as InjectionKey<{
    loading: Ref<boolean>,
    updateLoading: (newValue: boolean) => void
}>
